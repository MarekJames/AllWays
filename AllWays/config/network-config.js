/*

network-config.js 
  
  -> Handles the network context
  -> Handles isConnected value ( has/hasn't internet)

*/




/******************** Imports Section ********************/

import NetInfo from '@react-native-community/netinfo';
import React, { createContext, useState, useEffect } from 'react';




/******************** Global Variables *******************/

const NetworkContext = createContext();

const NetworkProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NetworkContext.Provider value={isConnected}>
      {children}
    </NetworkContext.Provider>
  );
};

const showNetworkError = (navigation, error) => {
      
  console.error('Oops: ', error);
  
  // Remove nav bar
  if(navigation.getParent() != undefined) navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});

  // Check Error Message
  if(error=='Network'){
    navigation.navigate('Network');
  }
  else{
    navigation.navigate('Internal');
  }
}

export { NetworkContext, NetworkProvider, showNetworkError };