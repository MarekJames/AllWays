/*

App.js - Master file

  -> Creates the app
  -> Creates the app navigator to navigate through different screens
  -> First classes ( homepage, first questionary, etc)  // This may change

*/




/******************** Imports Section ********************/ 

// Imports for the react components add buttons, images, text, etc
import React from 'react'; 
import {useEffect, useRef} from 'react'; 
import { Appearance, StyleSheet, View, Text, TouchableOpacity, ImageBackground, Dimensions, Image, Platform, BackHandler} from 'react-native';  
import { LinearGradient } from 'expo-linear-gradient';

import {createAppContainer} from 'react-navigation'; 
import {createStackNavigator} from 'react-navigation-stack'; 

// Imports to get the screens of other javascript files, necessary for the app navigator ( navigate through screens )
import {PlansScreen, LoadingScreen, DaysScreen} from './Views/Plans.js'
import { LoginUserScreen, RegisterUserScreen } from './Views/User.js';
import {ProfileScreen} from './Views/Profile.js'

// Imports to get text fonts, images, videos, etc
import * as Font from 'expo-font';
import SVGLogo from './Images/Logo.svg'

// Imports for the nav bar
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';



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

  // Constructor
  constructor(props) {
    super(props);
    this.state = {
        fontsLoaded: false
    }
  }

  // Load text fonts function
  async loadFonts() {
    await Font.loadAsync({
      'Sansation': require('./assets/fonts/Sansation_Regular.ttf'),
      'SansationBold': require('./assets/fonts/Sansation_Bold.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  // Call load fonts function after component mounted
  componentDidMount() {
    this.loadFonts();
  }

  // Screen components
  render() { 

    // Load screen after the fonts are loaded
    if (this.state.fontsLoaded) { 
      return (  
        <View style={stylesHomeScreen.container}>
        {/* Background Image */}
        <ImageBackground
          source={require('./Images/HomeBackground.png')} // Replace with your image path
          style={stylesHomeScreen.imageBackground}
          resizeMode="cover" // You can adjust the resizeMode property as needed
        >
          {/* Logo */}
          <View style ={stylesHomeScreen.containerLogo}>
            <SVGLogo
              style = {stylesHomeScreen.imageLogo}
            />
          </View>
  
          {/* Login Button */}
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={stylesHomeScreen.optionButton}>
              <Text style={stylesHomeScreen.startText}>Login</Text>
          </TouchableOpacity>

          {/* Create Button */}
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={stylesHomeScreen.optionButton}>
              <Text style={stylesHomeScreen.startText}>Create Account</Text>
          </TouchableOpacity>
  
        </ImageBackground>
      </View>
      );      
    }
  }  
}




/******************** App Initializer **********************/

/* 

  Defines the navigation bar, the icons, the text, etc

*/
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

  return (
  <NavigationContainer>

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
      slideDisabled
      backBehavior='none'
    >

      <Tab.Screen 
        name="Plans" 
        component={PlansScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({size,focused,color}) => {
            return (
             <Ionicons name={'search-outline'} size={size} color={color} />
            )
          },
        }}
      />
      <Tab.Screen 
        name="Days" 
        component={DaysScreen}
        options={{
          title: 'Saved',
          tabBarIcon: ({size,focused,color}) => {
            return (
             <Ionicons name={'heart-outline'} size={size} color={color} />
            )
          },
        }}

      />

      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          title: 'Profile',
          tabBarIcon: ({size,focused,color}) => {
            return (
             <Ionicons name={'person-circle-outline'} size={size} color={color} />
            )
          },
        }} 
      />

    </Tab.Navigator>

  </NavigationContainer>
  )
};

/* 

  Inserts screens into the navigator and associates a tag for each one
  First screen is defined in "initialRouteName"
  Header mode to none defines that the screens don't have an header that says the name of the screens

*/
const AppNavigator = createStackNavigator(  
    {        
        Home: HomeScreen,
        Loading: LoadingScreen,
        Login: LoginUserScreen,
        Register: RegisterUserScreen,
        Tabs: BottomTabNavigator 
        //Test: MyComponent
    
    },  
    {  
        initialRouteName: "Home",
        headerMode: 'none',
    }  
);  
  
/*

    Creates the app
    Associates the app navigator
    Set the light mode default

*/
export const AppContainer = createAppContainer(AppNavigator);  

export default class App extends React.Component {  
    render() {  
        return <AppContainer />;  
    }  
}  




/********************* Stylesheets ***********************/

// Stylesheet for the homepage screen
const stylesHomeScreen = StyleSheet.create({
  startText: {
    fontFamily: 'SansationBold',
    fontSize: 25,
    display: 'flex',
    letterSpacing: 2,
    color: '#FFFFFF',
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
    top:'20%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },

  optionButton: {
    backgroundColor:'#4E80B5',
    alignSelf: 'center',
    margin:10,
    marginBottom:20,
    height:'7%',
    width:'80%',
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center'
  },
});