import { locations } from '@contentful/app-sdk'; // https://www.contentful.com/developers/docs/extensibility/app-framework/sdk/
import { useSDK } from '@contentful/react-apps-toolkit';
import React, { useMemo } from 'react';

import ConfigScreen from './locations/ConfigScreen';
import Field from './locations/Field';

const ComponentLocationSettings = {
  [locations.LOCATION_APP_CONFIG]: ConfigScreen,
  [locations.LOCATION_ENTRY_FIELD]: Field,
};

const App = () => {
  const sdk = useSDK();

  // eslint-disable-next-line
  const Component = useMemo(() => {
    const components = Object.entries(ComponentLocationSettings);
    // eslint-disable-next-line
    for (const [location, component] of components) {
      if (sdk.location.is(location)) {
        return component;
      }
    }
  }, [sdk.location]);

  return Component ? <Component /> : null;
};

export default App;
