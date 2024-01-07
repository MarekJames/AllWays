/*

App.js - Master file

  -> Creates the app
  -> Creates the app navigator to navigate through different screens
  -> First classes ( homepage, first questionary, etc)  // This may change

*/




/******************** Imports Section ********************/ 

// Imports for the react components add buttons, images, text, etc
import React from 'react'; 
import {useEffect} from 'react'; 
import { Appearance, StyleSheet, View, Text, TouchableOpacity, ImageBackground, Dimensions, Image, Platform, BackHandler} from 'react-native';  
import { LinearGradient } from 'expo-linear-gradient';

import {createAppContainer} from 'react-navigation'; 
import {createStackNavigator} from 'react-navigation-stack'; 

// Imports to get the screens of other javascript files, necessary for the app navigator ( navigate through screens )
import {PlansScreen, LoadingScreen, DaysScreen} from './Views/Plans.js'


// Imports to get text fonts, images, videos, etc
import * as Font from 'expo-font';

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
          source={require('./Images/BackgroundHomePage.png')} // Replace with your image path
          style={stylesHomeScreen.imageBackground}
          resizeMode="cover" // You can adjust the resizeMode property as needed
        >
          {/* Logo */}
          <View style={stylesHomeScreen.containerLogo}>
            {/* Your Logo Component */}
            {/* <SVGLogo style = {stylesHomeScreen.imageLogo}/> */}
            <Image source = {require('./Images/RouteMasterLogo.png')} style = {{top: 200, width:'70%', height:'25%', borderRadius:15}}/>
          </View>
  
          {/* Start Button */}
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Tabs')} style={stylesHomeScreen.startButton}>
            <LinearGradient
              colors={['#0038F5', '#9F03FF']} // Replace with your gradient colors
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={stylesHomeScreen.gradient}
            >
              <Text style={stylesHomeScreen.startText}>Get Started</Text>
            </LinearGradient>
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

 

  useEffect(() => {
   
    if (Platform.OS === 'android') {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        // Prevent default back navigation action
        return true;
      });

      return () => backHandler.remove();
    }
  }, []);

  return (
  <NavigationContainer>

    <Tab.Navigator 
      screenOptions={{
        headerShown: false, // Hide the header for tab navigator
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0, // this solved the triangle type view problem in android
        },
        tabBarLabelStyle: {
          fontSize: 14, // Adjust label font size
          fontWeight: 'bold', // Make label text bold
        },
        gestureEnabled: Platform.OS === 'ios' ? false : true, // Disable gesture only for iOS
      }}
      
    >

      <Tab.Screen 
        name="Plans" 
        component={PlansScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({size,focused,color}) => {
            return (
             <Ionicons name={'search-outline'} size={size+3} color={color} />
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
             <Ionicons name={'heart-outline'} size={size+3} color={color} />
            )
          },
        }} 
      />

      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: 'Settings',
          tabBarIcon: ({size,focused,color}) => {
            return (
             <Ionicons name={'settings-outline'} size={size+3} color={color} />
            )
          },
        }} 
      />

    </Tab.Navigator>

  </NavigationContainer>
)};

/* 

  Inserts screens into the navigator and associates a tag for each one
  First screen is defined in "initialRouteName"
  Header mode to none defines that the screens don't have an header that says the name of the screens

*/
const AppNavigator = createStackNavigator(  
    {  
        Home: HomeScreen,  
        Plans: PlansScreen,
        LoadingScreen: LoadingScreen,
        Days: DaysScreen,
        Tabs: { screen: BottomTabNavigator }
        //Test: MyComponent
    
    },  
    {  
        initialRouteName: "Home",
        headerMode: 'none'
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
    flex: 1,
    width: '100%', // You can adjust width and height as needed
    height: '100%',
  },
  containerLogo:{
    flex:1,
    alignItems:'center'
  },
  imageLogo:{
    width:'100%',
    height:'30%',
    top:'20%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  startButton: {
    position: 'absolute',
    bottom: 80, // Adjust the button position from the bottom as needed
    alignSelf: 'center',
  },
  gradient: {
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
});