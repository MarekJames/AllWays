/*

App.js - Master file

  -> Creates the app
  -> Creates the app navigator to navigate through different screens
  -> First classes ( homepage, first questionary, etc)  // This may change

*/




/******************** Imports Section ********************/ 

// Imports for the react components add buttons, images, text, etc
import React, {useEffect} from 'react'; 
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Dimensions, Image, Platform, BackHandler} from 'react-native';  

import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Imports to get the screens of other javascript files, necessary for the app navigator ( navigate through screens )
import {PlansScreen, DaysScreen, ActivitiesScreen, SavedRoutesScreen} from './Views/Plans.js'
import { LoginUserScreen, RegisterUserScreen } from './Views/User.js';
import {ProfileScreen} from './Views/Profile.js'
import {SettingsScreen} from './Views/Settings.js'

// Imports to get text fonts, images, videos, etc
import * as Font from 'expo-font';
import SVGLogo from './Images/Logo.svg'

// Imports for the nav bar
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  Ionicons  from '@expo/vector-icons/Ionicons';



/******************* Global Variables ********************/

const windowWidth = Dimensions.get('window').width;   // Get width of the user screen
const windowHeight = Dimensions.get('window').height; // Get height of the user screen


/*********************** Classes *************************/


/* 

  Homescreen of the app
  Displays a background image, the logo and a start button
  <ImageBackground source={require('./Images/Background4.jpg')} resizeMode="cover" style={stylesHomeScreen.background}>
             
*/
class HomeScreen extends React.Component {

  // Screen components
  render() { 

    // Load screen after the fonts are loaded
   
      return (  
        <View style={stylesHomeScreen.container}>
        {/* Background Image */}
        <ImageBackground
          source={require('./Images/BackgroundHome.jpg')} // Replace with your image path
          style={stylesHomeScreen.imageBackground}
          resizeMode="cover" // You can adjust the resizeMode property as needed
        >
          {/* Logo */}
          <View style ={stylesHomeScreen.containerLogo}>
            <SVGLogo
              style = {stylesHomeScreen.imageLogo}
            />
          </View>

          <View style = {{justifyContent:'flex-end', marginBottom:50}}>
            {/* Login Button */}
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={stylesHomeScreen.loginButton}>
                <Text style={stylesHomeScreen.startText}>Login</Text>
            </TouchableOpacity>

            {/* Create Button */}
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={stylesHomeScreen.createButton}>
                <Text style={stylesHomeScreen.startText}>Create Account</Text>
            </TouchableOpacity>
          </View>
  
        </ImageBackground>
      </View>
      );      
  }  
}




/******************** Tab Navigator **********************/

/* 

  Defines the navigation bar, the icons, the text, etc

*/
const Tab = createBottomTabNavigator();
export const BottomTabNavigator = () => {

  return (
    <Tab.Navigator   
      screenOptions={{
        headerShown: false, // Hide the header for tab navigator
        tabBarStyle: {
          borderTopWidth: 0,
          marginTop:3,
          backgroundColor: 'transparent',
          elevation: 0, // this solved the triangle type view problem in android
        },
        tabBarLabelStyle: {
          fontSize: 14, // Adjust label font size
          fontWeight: 'bold', // Make label text bold
          marginBottom: 4
        },
      }}
        // screenListeners={({ navigation }) => ({
        //   tabPress: (e) =>{
             
        //       const lastScreen = navigation.getState().routes[0].state.routes[navigation.getState().routes[0].state.routes.length-1];

              
        //       //This means the route has been generated, otherwise the last screen would be "Plans"
        //       if(lastScreen.name== 'Activities' || lastScreen.name == 'Days'){

        //         //Get listsPlan
        //         //console.log(navigation.getState().routes[0]);
        //         console.log(lastScreen.name);
        //         navigation.navigate('Days', {
        //           savedRoutes: lastScreen.params.savedRoutes,
        //           listsPlan: lastScreen.params.listsPlan,
        //           city: lastScreen.params.city,
        //           days: lastScreen.params.days
        //         })
        //       }
             
        //   }
               
        //})}
      
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
 
/*

  Creates the app stack navigator
  Includes the tab navigator

*/
const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRoute = {DaysScreen}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      
      <Stack.Screen 
      name="Home" 
      component={HomeScreen}/>

      <Stack.Screen name="Tabs" component={BottomTabNavigator} />
      <Stack.Screen name="Login" component={LoginUserScreen} />
      <Stack.Screen name="Register" component={RegisterUserScreen} />

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
        name="Plans" component={PlansScreen} />

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
      initialRoute = {ProfileScreen}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
     
    </Stack.Navigator>
  );
}; 


 

/********************* Stylesheets ***********************/

// Stylesheet for the homepage screen
const stylesHomeScreen = StyleSheet.create({
  startText: {
    fontSize: 20,
    fontWeight:500,
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
  imageLogo:{
    width:'100%',
    height:'20%',
    top:'40%',
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