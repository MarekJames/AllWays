// import { registerRootComponent } from 'expo';

// import App from './App';

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App);
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {BottomTabNavigator, StackNavigator} from './App.js'
import { registerRootComponent } from 'expo';
import { getAuth } from 'firebase/auth';

const App = () => {

  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
 
  React.useEffect( () =>{

   
    const unsubscribe = getAuth().onAuthStateChanged(userp => {
      setUser(userp);
      setLoading(false);
    })

    return unsubscribe;
    
  }, []);


  return (
    <NavigationContainer>

          {/* Rest of your app code */}
          { !loading && (user  ? <BottomTabNavigator /> : <StackNavigator />)}

    </NavigationContainer>
  );
};

registerRootComponent(App);
