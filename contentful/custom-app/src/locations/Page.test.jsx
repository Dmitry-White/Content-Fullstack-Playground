import { render } from '@testing-library/react';
import React from 'react';

import { mockCma, mockSdk } from '../../test/mocks';

import Page from './Page';

jest.mock('@contentful/react-apps-toolkit', () => ({
  useSDK: () => mockSdk,
  useCMA: () => mockCma,
}));

describe('Page component', () => {
  it('Component text exists', () => {
    const { getByText } = render(<Page />);

    expect(
      getByText('Hello Page Component (AppId: test-app)'),
    ).toBeInTheDocument();
  });
});
