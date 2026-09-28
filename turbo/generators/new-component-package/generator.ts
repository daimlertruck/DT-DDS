import { readFileSync } from 'node:fs';
import path from 'node:path';

import { PlopTypes } from '@turbo/gen';

import {
  addComponentActions,
  formatPackageAction,
  installDependenciesAction,
  modifyDTUIReacAddNewPackageAction,
  modifyStorybookComponentsPathAction,
} from './actions';

const readWorkspaceVersion = (root: string, packageDir: string): string => {
  const { version }: { version?: unknown } = JSON.parse(
    readFileSync(path.join(root, packageDir, 'package.json'), 'utf8')
  );
  if (typeof version !== 'string') {
    throw new Error(`${packageDir}/package.json has no version`);
  }
  return version;
};

export const newComponentPackageGenerator = (plop: PlopTypes.NodePlopAPI) =>
  plop.setGenerator('new-component-package', {
    description: 'Creates a boilerplate for new DT-UI component package.',
    prompts: [
      {
        type: 'input',
        name: 'packageName',
        message:
          'What is the name of the package without suffix "@dt-dds/react-" e.g, box, accordion, empty-state.',
        validate: (input: string) => {
          if (input.includes(' ')) {
            return 'package name cannot include spaces';
          }
          if (!input) {
            return 'package name is required';
          }
          return true;
        },
      },
    ],
    actions: function (data) {
      data!.packageName = plop.renderString('{{kebabCase packageName}}', data);
      data!.componentName = plop.renderString(
        '{{pascalCase packageName}}',
        data
      );

      data!.packageVersion = '1.0.0-beta.0';

      const root = plop.renderString('{{ turbo.paths.root }}', data);
      data!.reactCoreVersion = readWorkspaceVersion(
        root,
        'packages/react-packages/core'
      );
      data!.themesVersion = readWorkspaceVersion(root, 'packages/themes');

      return [
        {
          type: 'addMany',
          destination:
            '{{ turbo.paths.root }}/packages/react-packages/{{packageName}}',
          base: 'new-component-package/templates/',
          templateFiles: 'new-component-package/templates/**/*.hbs',
          globOptions: { ignore: ['**/*Component*', '**/LICENSE.hbs'] },
        },
        {
          type: 'add',
          path: '{{ turbo.paths.root }}/packages/react-packages/{{packageName}}/LICENSE',
          templateFile: 'new-component-package/templates/LICENSE.hbs',
        },
        ...addComponentActions,
        ...modifyDTUIReacAddNewPackageAction,
        modifyStorybookComponentsPathAction(root, data!.packageName),
        formatPackageAction(root, data!.packageName),
        installDependenciesAction(root),
      ];
    },
  });
