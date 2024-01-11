// import { registerRootComponent } from 'expo';

// import App from './App';

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App);
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './App.js'
import { registerRootComponent } from 'expo';

const App = () => {
  return (
    <NavigationContainer>
      {/* Rest of your app code */}
      <StackNavigator></StackNavigator>
    </NavigationContainer>
  );
};

registerRootComponent(App);
