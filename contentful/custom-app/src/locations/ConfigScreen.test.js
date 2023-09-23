import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { mockCma, mockSdk } from '../../test/mocks';

import ConfigScreen from './ConfigScreen';

jest.mock('@contentful/react-apps-toolkit', () => ({
  useSDK: () => mockSdk,
  useCMA: () => mockCma,
}));

describe('Config Screen component', () => {
  it('Component text exists', async () => {
    const { getByText } = render(<ConfigScreen />);

    // simulate the user clicking the install button
    await act(async () => {
      await mockSdk.app.onConfigure.mock.calls[0][0]();
    });

    expect(getByText('Here you can add app configuration')).toBeInTheDocument();
  });
});
