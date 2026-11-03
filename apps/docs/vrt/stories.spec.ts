import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

import { expect, test, type Page } from '@playwright/test';

interface IndexEntry {
  readonly id: string;
  readonly title: string;
  readonly name: string;
  readonly importPath: string;
  readonly type: string;
}

interface StoryIndex {
  readonly entries: Readonly<Record<string, IndexEntry>>;
}

const BRANDS = ['Default'] as const;

type Brand = (typeof BRANDS)[number];

const STATIC_DIR = path.resolve(__dirname, '..', 'storybook-static');
const INDEX_FILE = path.join(STATIC_DIR, 'index.json');
const ORIGIN = 'http://storybook.vrt';

// Story id → reason. Filled only from the human's stability runs.
const EXCLUDED: Readonly<Record<string, string>> = {};

const isBrand = (value: string): value is Brand =>
  (BRANDS as readonly string[]).includes(value);

const readBrand = (): Brand => {
  // eslint-disable-next-line turbo/no-undeclared-env-vars -- vrt is not a turbo task
  const value = process.env.VRT_BRAND ?? 'Default';
  if (!isBrand(value)) {
    throw new Error(
      `VRT_BRAND must be one of ${BRANDS.join(', ')}; got "${value}".`
    );
  }
  return value;
};

const readStories = (): readonly IndexEntry[] => {
  if (!existsSync(INDEX_FILE)) {
    throw new Error('Build Storybook first: yarn workspace @dt-dds/docs build');
  }
  const index = JSON.parse(readFileSync(INDEX_FILE, 'utf8')) as StoryIndex;
  return Object.values(index.entries).filter((entry) => entry.type === 'story');
};

const toStaticFile = (url: string): string => {
  const { pathname } = new URL(url);
  const file = path.join(STATIC_DIR, decodeURIComponent(pathname));
  return file.startsWith(STATIC_DIR + path.sep) ? file : '';
};

const isFile = (file: string): boolean =>
  file !== '' && existsSync(file) && statSync(file).isFile();

const FAILURE_EVENTS = [
  'storyErrored',
  'storyThrewException',
  'playFunctionThrewException',
  'storyMissing',
] as const;

interface StoryChannel {
  on(event: string, listener: () => void): void;
}

interface OutcomeWindow {
  __vrtOutcome?: Promise<string>;
}

// Storybook emits storyRendered once play has finished; the first
// event that ends the story settles __vrtOutcome.
const watchStoryOutcome = (page: Page): Promise<void> =>
  page.addInitScript((failureEvents: readonly string[]) => {
    const target = window as Window & OutcomeWindow;
    let channel: StoryChannel | undefined;
    target.__vrtOutcome = new Promise<string>((resolve) => {
      Object.defineProperty(window, '__STORYBOOK_ADDONS_CHANNEL__', {
        configurable: true,
        get: () => channel,
        set: (value: StoryChannel) => {
          channel = value;
          value.on('storyRendered', () => resolve('storyRendered'));
          failureEvents.forEach((event) => {
            value.on(event, () => resolve(event));
          });
        },
      });
    });
  }, FAILURE_EVENTS);

const brand = readBrand();

test.beforeEach(async ({ page }) => {
  await page.route(`${ORIGIN}/**`, async (route) => {
    const file = toStaticFile(route.request().url());
    if (isFile(file)) {
      await route.fulfill({ path: file });
      return;
    }
    await route.fulfill({ status: 404 });
  });
  await watchStoryOutcome(page);
});

for (const { id, importPath } of readStories()) {
  test(`${id} (${importPath})`, async ({ page }) => {
    test.skip(id in EXCLUDED, EXCLUDED[id]);

    await page.goto(
      `${ORIGIN}/iframe.html?id=${id}&viewMode=story&globals=theme:${brand}`
    );
    const outcome = await page.evaluate(
      () => (window as Window & OutcomeWindow).__vrtOutcome
    );
    expect(outcome, 'Storybook event that ended the story').toBe(
      'storyRendered'
    );
    const body = page.locator('body');
    await page.waitForSelector('body.sb-show-main, body.sb-show-errordisplay');
    await expect(body).not.toHaveClass(/sb-show-errordisplay/);
    await page.evaluate(() => document.fonts.ready);

    await expect(page).toHaveScreenshot([brand, `${id}.png`], {
      fullPage: true,
    });
  });
}
