import customConfig from 'eslint-config-custom';
import storybook from 'eslint-plugin-storybook';

export default [...customConfig, ...storybook.configs['flat/recommended']];
