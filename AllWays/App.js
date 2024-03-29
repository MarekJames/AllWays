
import { StyleSheet, Text,  TouchableOpacity, View, ImageBackground, Animated} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { getAuth } from 'firebase/auth';
import  Ionicons  from '@expo/vector-icons/Ionicons';

import {SearchScreen} from './Views/Search.js'
import { ActivitiesScreen } from './Views/Activities.js';
import { DaysScreen } from './Views/Days.js';
import {SavedRoutesScreen} from './Views/SavedRoutes.js'
import { LoginUserScreen, RegisterUserScreen } from './Views/User.js';
import {ProfileScreen} from './Views/Profile.js'
import {SettingsScreen} from './Views/Settings.js'
import { TermsConditionsScreen } from './Views/Terms&Conditions.js';
import { ForgotPasswordScreen } from './Views/ForgotPassword.js';

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {

  return (
    <Tab.Navigator   
      screenOptions={{
        headerShown: false, // Hide the header for tab navigator
        tabBarActiveTintColor:'#000000',
        tabBarLabelStyle: {
          fontSize: 14, // Adjust label font size
          fontWeight: 'bold', // Make label text bold
          marginBottom:5
        },
        tabBarStyle: { borderTopWidth: 2, borderTopColor:'#fff',position:'absolute', elevation:0, height:55},
        tabBarIconStyle: {marginTop:5},
     
      }} 
  
    >
      <Tab.Screen 
        name="StackRoutePlanNavigator" 
        component={StackRoutePlanNavigator}
        options={{
          title: 'Search',
          tabBarIcon: ({size,focused,color}) => { return ( <Ionicons name={'search-outline'} size={size} color={color} />)},
        }}
    
      /> 
      <Tab.Screen 
        name="StackSavedNavigator" 
        component={StackSavedNavigator}
        options={{
          title: 'Saved',
          tabBarIcon: ({size,focused,color}) => { return (<Ionicons name={'heart-outline'} size={size} color={color} />)},
        }}
      />
      <Tab.Screen 
        name="StackProfileNavigator" 
        component={StackProfileNavigator} 
        options= {{
          title: 'Profile',
          tabBarIcon: ({size,focused,color}) => { return ( <Ionicons name={'person-circle-outline'} size={size} color={color} />)}
        }} 
      />
    </Tab.Navigator>
  )
};

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName = "Home"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Tabs" component={BottomTabNavigator} />
      <Stack.Screen name="Login" component={LoginUserScreen} />
      <Stack.Screen name="Register" component={RegisterUserScreen} />
      <Stack.Screen name="TermsConditions" component={TermsConditionsScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

    </Stack.Navigator>
  );
}; 

const StackRoutePlanNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
       options={{
        gestureEnabled: false,
        }} 
        name="Plans" component={SearchScreen} />

        <Stack.Screen
        options={{
          gestureEnabled: false,
        }} 
        name="Days" component={DaysScreen} />

      <Stack.Screen 
        options={{
          gestureEnabled: true,
        }}
        name="Activities" component={ActivitiesScreen} />

    </Stack.Navigator>
  );
}; 

const StackSavedNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
  
      <Stack.Screen 
        options={{
          gestureEnabled: false,
        }}
        name="SavedRoutes" component={SavedRoutesScreen}/>

      <Stack.Screen
        options={{
          gestureEnabled: false,
        }} 
        name="Days" component={DaysScreen} />

      <Stack.Screen 
        options={{
          gestureEnabled: true,
        }}
        name="Activities" component={ActivitiesScreen} />

     
    </Stack.Navigator>
  );
}; 

const StackProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="TermsConditions" component={TermsConditionsScreen} />

    </Stack.Navigator>
  );
}; 

class HomeScreen extends React.Component {

  HomeScreen = () => {

    const fade = useRef(new Animated.Value(0)).current;
   
    const fadeIn = () => {
      Animated.timing(fade, {
        toValue: 1,
        duration: 2000,
        useNativeDriver:true
      }).start();
    };

    useEffect(() => {
       fadeIn();  
    },);
  
    return ( 
      <View
       style = {{height:'100%', width:'100%'}}
       > 
      {/* <View style={stylesHomeScreen.container}> */}
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
          style = {{width:'80%', height:'20%', top:'40%', opacity:fade}}
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
    {/* </View> */}
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
  
      <NavigationContainer>

            {/* Rest of your app code */}
            { !loading && (user  ? <BottomTabNavigator /> : <StackNavigator />)}
            
      </NavigationContainer>
  
  );   
}

const stylesHomeScreen = StyleSheet.create({
  startText: {
    fontSize: 20,
    fontWeight:'500',
    display: 'flex',
    color: '#000000',
  },
  imageBackground: {
    width: '100%', // You can adjust width and height as needed
    height: '100%',
  },
  containerLogo:{
    flex:1,
    alignItems:'center',
    resizeMode:'cover'
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },

  createButton: {
    backgroundColor:'#23C2DF',
    alignSelf: 'center',
    margin:10,
    height: 60,
    width:'80%',
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center'
  },
  loginButton: {
    backgroundColor:'#FFFFFF',
    alignSelf: 'center',
    margin:10,
    height: 60,
    width:'80%',
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center'
  },
});
