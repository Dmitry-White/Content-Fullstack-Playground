import { render } from '@testing-library/react';
import React from 'react';

import { mockCma, mockSdk } from '../../test/mocks';

import Home from './Home';

jest.mock('@contentful/react-apps-toolkit', () => ({
  useSDK: () => mockSdk,
  useCMA: () => mockCma,
}));

describe('Home component', () => {
  it('Component text exists', () => {
    const { getByText } = render(<Home />);

    expect(
      getByText('Hello Home Component (AppId: test-app)'),
    ).toBeInTheDocument();
  });
});
