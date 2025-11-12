import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

import { matchers } from '@emotion/jest';

import './jest-mock-globals';

expect.extend(matchers);

configure({ defaultHidden: true });
