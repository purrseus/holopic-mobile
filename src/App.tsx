import React from 'react';
import { StatusBar, UIManager } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '@store/store';
import RootStack from '@navigators';
import { ThemeProvider } from 'styled-components';
import theme from '@theme';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
