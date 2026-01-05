import { PlopTypes } from '@turbo/gen';

import {
  addComponentActions,
  modifyDTUIReacAddNewPackageAction,
  modifyStorybookComponentsPathAction,
} from './actions';

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

      data!.packageVersion = '0.1.0-beta.0';

      return [
        {
          type: 'addMany',
          destination:
            '{{ turbo.paths.root }}/packages/react-packages/{{packageName}}',
          base: 'new-component-package/templates/',
          templateFiles:
            'new-component-package/templates/**/!(*Component*|LICENSE.hbs)',
        },
        {
          type: 'add',
          path: '{{ turbo.paths.root }}/packages/react-packages/{{packageName}}/LICENSE',
          templateFile: 'new-component-package/templates/LICENSE.hbs',
        },
        ...addComponentActions,
        ...modifyDTUIReacAddNewPackageAction,
        modifyStorybookComponentsPathAction,
      ];
    },
  });
