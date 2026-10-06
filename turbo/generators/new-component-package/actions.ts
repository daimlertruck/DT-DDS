import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path, { join } from 'node:path';

import { PlopTypes } from '@turbo/gen';

type ComponentPackageData = {
  packageName: string;
  turbo: { paths: { root: string } };
};

const componentFileName =
  '{{ turbo.paths.root }}/packages/react-packages/{{packageName}}/src/{{componentName}}';

const packagesPath = '{{ turbo.paths.root }}/packages';

const addComponentAction = (ext: string): PlopTypes.AddActionConfig => ({
  type: 'add',
  path: `${componentFileName}.${ext}`,
  templateFile: `new-component-package/templates/src/Component.${ext}.hbs`,
});

export const addComponentActions: PlopTypes.AddActionConfig[] = [
  addComponentAction('test.tsx'),
  addComponentAction('styled.ts'),
  addComponentAction('stories.tsx'),
  addComponentAction('tsx'),
];

export const modifyStorybookComponentsPathAction = (
  root: string,
  packageName: string
): PlopTypes.ModifyActionConfig => ({
  type: 'modify',
  path: '{{ turbo.paths.root }}/apps/docs/.storybook/main.ts',
  pattern: 'const components = [',
  template: "const components = [\n        '{{packageName}}',",
  templateFile: '',
  skip: () =>
    /const components = \[([\s\S]*?)\]/
      .exec(
        readFileSync(path.join(root, 'apps/docs/.storybook/main.ts'), 'utf8')
      )?.[1]
      .includes(`'${packageName}',`)
      ? `'${packageName}' is already a Storybook alias`
      : undefined,
});

export const modifyDTUIReacAddNewPackageAction: PlopTypes.ModifyActionConfig[] =
  [
    {
      type: 'modify',
      path: `${packagesPath}/dt-dds-react/index.ts`,
      templateFile: '',
      pattern:
        /(\/\/independent component packages\s*\n)(export[\s\S]*?)\n\s*\n/,
      template: "$1$2\nexport * from '@dt-dds/react-{{ packageName }}';\n\n",
      skip: (data: ComponentPackageData) => {
        const content = readFileSync(
          join(data.turbo.paths.root, 'packages/dt-dds-react/index.ts'),
          'utf8'
        );

        return content.includes(
          `export * from '@dt-dds/react-${data.packageName}';`
        )
          ? `'${data.packageName}' is already an export`
          : false;
      },
    },
    {
      type: 'modify',
      path: `${packagesPath}/dt-dds-react/package.json`,
      templateFile: '',
      pattern: /("dependencies":\s*{)([\s\S]*?)(\n\s*}\n)/,
      template:
        '$1\n    "@dt-dds/react-{{ packageName }}": "{{ packageVersion }}",$2$3',
      skip: (data: ComponentPackageData) => {
        const packageJson = JSON.parse(
          readFileSync(
            join(data.turbo.paths.root, 'packages/dt-dds-react/package.json'),
            'utf8'
          )
        );

        return Object.prototype.hasOwnProperty.call(
          packageJson.dependencies,
          `@dt-dds/react-${data.packageName}`
        )
          ? `'${data.packageName}' is already an dependency`
          : false;
      },
    },
  ];

export const formatPackageAction =
  (root: string, packageName: string): PlopTypes.CustomActionFunction =>
  () => {
    execSync(
      `yarn --silent prettier --loglevel warn --write "packages/react-packages/${packageName}/**/*.{js,ts,tsx}"`,
      { cwd: root, stdio: 'inherit' }
    );
    return `formatted packages/react-packages/${packageName}`;
  };

export const installDependenciesAction =
  (root: string): PlopTypes.CustomActionFunction =>
  () => {
    execSync('yarn install', { cwd: root, stdio: 'inherit' });
    return 'yarn install';
  };
