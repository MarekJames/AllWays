
import { StyleSheet, Text,  TouchableOpacity, Image, View, ImageBackground} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import { getAuth } from 'firebase/auth';
import  Ionicons  from '@expo/vector-icons/Ionicons';

import {PlansScreen, DaysScreen, ActivitiesScreen, SavedRoutesScreen} from './Views/Plans.js'
import { LoginUserScreen, RegisterUserScreen } from './Views/User.js';
import {ProfileScreen} from './Views/Profile.js'
import {SettingsScreen} from './Views/Settings.js'
import { SafeAreaView } from 'react-native-safe-area-context';


const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {

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
        tabBarActiveTintColor:'#23C2DF',
        tabBarLabelStyle: {
          fontSize: 14, // Adjust label font size
          fontWeight: 'bold', // Make label text bold
          marginBottom: 4,
        },
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
            
            <Image
            source = {require('./Images/Logo.png')}
            style = {stylesHomeScreen.imageLogo}
            resizeMode='contain'
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
