import { render } from '@testing-library/react';
import React from 'react';

import { mockCma, mockSdk } from '../../test/mocks';

import Field from './Field';

jest.mock('@contentful/react-apps-toolkit', () => ({
  useSDK: () => mockSdk,
  useCMA: () => mockCma,
}));

describe('Field component', () => {
  it('Component text exists', () => {
    const { getByTestId } = render(<Field />);

    expect(getByTestId('cf-ui-text-input')).toBeInTheDocument();
  });
});
