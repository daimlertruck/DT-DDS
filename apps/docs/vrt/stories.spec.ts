import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

import { expect, test } from '@playwright/test';

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
});

for (const { id, importPath } of readStories()) {
  test(`${id} (${importPath})`, async ({ page }) => {
    test.skip(id in EXCLUDED, EXCLUDED[id]);

    await page.goto(
      `${ORIGIN}/iframe.html?id=${id}&viewMode=story&globals=theme:${brand}`
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
