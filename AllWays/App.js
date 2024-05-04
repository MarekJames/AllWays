
import { useFonts } from 'expo-font';
import { getAuth } from 'firebase/auth';
import * as SplashScreen from 'expo-splash-screen';
import React, { useRef, useCallback } from 'react';
import  Ionicons  from '@expo/vector-icons/Ionicons';
import { NetworkProvider } from './config/network-config.js';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Animated } from 'react-native';

// Import Views
import { DaysScreen } from './Views/Search/Days.js';
import { SearchScreen } from './Views/Search/Search.js';
import { ProfileScreen } from './Views/Settings/Profile.js';
import { ActivitiesScreen } from './Views/Search/Activities.js';
import { ChangeNameScreen } from './Views/Settings/ChangeName.js';
import { HelpCenterScreen } from './Views/Settings/HelpCenter.js';
import { SavedRoutesScreen } from './Views/Search/SavedRoutes.js';
import { ChangeEmailScreen } from './Views/Settings/ChangeEmail.js';
import { ForgotPasswordScreen } from './Views/Login/ForgotPassword.js';
import { InternalProblemScreen } from './Views/Error/InternalProblem.js';
import { ChangePasswordScreen } from './Views/Settings/ChangePassword.js';
import { AccountSettingsScreen } from './Views/Settings/AccountSettings.js';
import { LoginUserScreen, RegisterUserScreen } from './Views/Login/User.js';
import { NetworkConnectionScreen } from './Views/Error/NetworkConnection.js';
import { TermsConditionsScreen } from './Views/Settings/Terms&Conditions.js';

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {

  return (
    <Tab.Navigator   
      screenOptions={{
        headerShown: false, // Hide the header for tab navigator
        tabBarActiveTintColor:'#000000',
        tabBarStyle:{borderTopWidth: 2, borderTopColor:'#fff', position:'absolute', elevation:0, height:45},
        tabBarIconStyle:{marginTop:5},
      }} 
    >
      <Tab.Screen 
        name = "StackRoutePlanNavigator" 
        component = {StackRoutePlanNavigator}
        options = {{
          title : '',
          tabBarIcon : ({size,focused,color}) => {return(<Ionicons name={'search-outline'} size={size} color={color}/>)},
        }}
      /> 

      <Tab.Screen 
        name = "StackSavedNavigator" 
        component = {StackSavedNavigator}
        options = {{
          title : '',
          tabBarIcon : ({size,focused,color}) => {return(<Ionicons name={'heart-outline'} size={size} color={color}/>)},
        }}
      />

      <Tab.Screen 
        name = "StackProfileNavigator" 
        component = {StackProfileNavigator} 
        options = {{
          title : '',
          tabBarIcon : ({size,focused,color}) => {return(<Ionicons name={'person-circle-outline'} size={size} color={color}/>)}
        }} 
      />
    </Tab.Navigator>
  )
};

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName = "Home" screenOptions = {{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name = "Home" component = {HomeScreen}/>
      <Stack.Screen name = "Login" component = {LoginUserScreen}/>
      <Stack.Screen name = "Tabs" component = {BottomTabNavigator}/>
      <Stack.Screen name = "Register" component = {RegisterUserScreen}/>
      <Stack.Screen name = "ForgotPassword" component = {ForgotPasswordScreen}/>
      <Stack.Screen name = "TermsConditions" component = {TermsConditionsScreen}/>
      <Stack.Screen options = {{ gestureEnabled: false }} name = "Internal" component = {InternalProblemScreen}/>
      <Stack.Screen options = {{ gestureEnabled: false }} name = "Network" component = {NetworkConnectionScreen}/>
    
    </Stack.Navigator>
  );
}; 

const StackRoutePlanNavigator = () => {
  return (
    <Stack.Navigator initialRouteName = 'Plans' screenOptions = {{ headerShown: false }}>
      <Stack.Screen options = {{ gestureEnabled: false }} name = "Days" component = {DaysScreen}/>
      <Stack.Screen options = {{ gestureEnabled: false }} name = "Plans" component = {SearchScreen}/>
      <Stack.Screen options = {{ gestureEnabled: true }} name = "Activities" component = {ActivitiesScreen}/>
      <Stack.Screen options = {{ gestureEnabled: false }} name = "Internal" component = {InternalProblemScreen}/>
      <Stack.Screen options = {{ gestureEnabled: false }} name = "Network" component = {NetworkConnectionScreen}/>
    </Stack.Navigator>
  );
};

const StackSavedNavigator = () => {
  return (
    <Stack.Navigator initialRouteName = 'SavedRoutes' screenOptions = {{ headerShown: false }}>
      <Stack.Screen options = {{ gestureEnabled: false }} name = "Days" component = {DaysScreen}/>
      <Stack.Screen options = {{ gestureEnabled: true }} name = "Activities" component = {ActivitiesScreen}/>
      <Stack.Screen options = {{ gestureEnabled: false }} name = "SavedRoutes" component = {SavedRoutesScreen}/>
      <Stack.Screen options = {{ gestureEnabled: false }} name = "Internal" component = {InternalProblemScreen}/>
      <Stack.Screen options = {{ gestureEnabled: false }} name = "Network" component = {NetworkConnectionScreen}/>
    </Stack.Navigator>
  );
}; 

const StackProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name = "Profile" component = {ProfileScreen}/>
      <Stack.Screen name = "Login" component = {LoginUserScreen}/>
      <Stack.Screen name = "HelpCenter" component = {HelpCenterScreen}/>
      <Stack.Screen name = "ChangeName" component = {ChangeNameScreen}/>
      <Stack.Screen name = "ChangeEmail" component = {ChangeEmailScreen}/>
      <Stack.Screen name = "ChangePassword" component = {ChangePasswordScreen}/>
      <Stack.Screen name = "AccountSettings" component = {AccountSettingsScreen}/>
      <Stack.Screen name = "TermsConditions" component = {TermsConditionsScreen}/>
      <Stack.Screen options = {{ gestureEnabled: false }} name = "Internal" component = {InternalProblemScreen}/>
      <Stack.Screen options = {{ gestureEnabled: false }} name = "Network" component = {NetworkConnectionScreen}/>
    </Stack.Navigator>
  );
}; 

class HomeScreen extends React.Component {

  HomeScreen = () => {

    const fade = useRef(new Animated.Value(0)).current;
    const [fontsLoaded, fontError] = useFonts({
      'Poppins-Light': require('./Fonts/Poppins-Light.ttf'),
      'Poppins-SemiBold': require('./Fonts/Poppins-SemiBold.ttf'),
      'Poppins-Bold': require('./Fonts/Poppins-Bold.ttf'),
      'Poppins-Medium': require('./Fonts/Poppins-Medium.ttf'),
    });
  
    const onLayoutRootView = useCallback(async () => {
      
      fadeIn(); 
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    }, [fontsLoaded, fontError]);
  
    if (!fontsLoaded && !fontError) {
      return null;
    }

    const fadeIn = () => {
      Animated.timing(fade, {
        toValue: 1,
        duration: 2000,
        useNativeDriver:true
      }).start();
    };

    return ( 
      <View style = {{height:'100%', width:'100%'}} onLayout={onLayoutRootView}> 
      
      {/* Background Image */}
      <ImageBackground
        source={require('./Images/BackgroundHome.jpg')} // Replace with your image path
        style={stylesHomeScreen.imageBackground}
        resizeMode="cover" // You can adjust the resizeMode property as needed
      >
        {/* Logo */}
        <View style ={stylesHomeScreen.containerLogo}>
          
          <Animated.Image
          source = {require('./Images/Logo.png')}
          style = {{width:'70%', height:'20%', top:'40%', opacity:fade}}
          resizeMode='contain'
          />
        </View>

        <Animated.View style = {{justifyContent:'flex-end', marginBottom:50, opacity:fade}}>
          {/* Login Button */}
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={stylesHomeScreen.loginButton}>
              <Text style={stylesHomeScreen.startText}>Login</Text>
          </TouchableOpacity>

          {/* Create Button */}
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={stylesHomeScreen.createButton}>
              <Text style={stylesHomeScreen.startText}>Create Account</Text>
          </TouchableOpacity>
        </Animated.View>

      </ImageBackground>
    </View>
    );      
  }

  // Screen components
  render() { 
    return (<this.HomeScreen/>)
  }  
}

export default function App() {

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
    <NetworkProvider>
      <NavigationContainer>
    
        {/* Rest of your app code */}
        { !loading && (user  ? <BottomTabNavigator /> : <StackNavigator />)}
            
      </NavigationContainer>
    </NetworkProvider>
  );   
}

const stylesHomeScreen = StyleSheet.create({
  startText: {
    fontSize: 20,
    color: '#000000',
    textAlign:'center',
    fontFamily:'Poppins-SemiBold',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  containerLogo:{
    flex:1,
    resizeMode:'cover',
    alignItems:'center',
  },
  createButton: {
    margin:10,
    height: 60,
    width:'80%',
    borderRadius:30,
    alignItems:'center',
    alignSelf: 'center',
    justifyContent:'center',
    backgroundColor:'#23C2DF',
  },
  loginButton: {
    margin:10,
    height: 60,
    width:'80%',
    borderRadius:30,
    alignItems:'center',
    alignSelf: 'center',
    justifyContent:'center',
    backgroundColor:'#FFFFFF',
  },
});
