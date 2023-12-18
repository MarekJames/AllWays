/*

App.js - Master file

  -> Creates the app
  -> Creates the app navigator to navigate through different screens
  -> First classes ( homepage, first questionary, etc)  // This may change

*/




/******************** Imports Section ********************/ 

// Imports for the react components add buttons, images, text, etc
import React from 'react';  
import {StyleSheet, View, Text, Pressable, ImageBackground, Dimensions, Image, TextInput } from 'react-native';  
import {createAppContainer} from 'react-navigation'; 
import {createStackNavigator} from 'react-navigation-stack'; 

// Imports to get the screens of other javascript files, necessary for the app navigator ( navigate through screens )
import {TripsScreen, ListsScreen, RegionsScreen, TripsFilterScreen, MapsTripsScreen, LinksScreen } from './Views/Trips.js'
import PointsScreen, { ListsPointsScreen, LoadingPointsScreen, MapsPointsScreen } from './Views/Points.js'
import {PlansScreen, MapsPlansScreen, DayRoutePlanScreen, LoadingScreen, DaysScreen} from './Views/Plans.js'


// Imports to get text fonts, images, videos, etc
import * as Font from 'expo-font';
import SVGLogo from './Images/RouteMasterLogo.svg'
import SVGTrips from './Images/Trips.svg'
import SVGRoutes from './Images/Routes.svg'
import SVGOption3 from './Images/Option3.svg'
import SVGOption4 from './Images/Option4.svg'




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
             
              <View style = {stylesHomeScreen.containerLogo}>
            
                <SVGLogo
                  style = {stylesHomeScreen.imageLogo}
                />
              
              </View>
              
              <Pressable style = {stylesHomeScreen.startButton} onPress = { () => {this.props.navigation.navigate('Plans')}}>
                <Text style = {stylesHomeScreen.startText}>Start your Route</Text>
              </Pressable>

      
          </View> 
      );      
    }
  }  
}  

/*

  Screen showed after START is clicked in the homepage
  First options displayed to the user
  Allows the user to choose between the different functionalities

*/
class OptionsScreen extends React.Component {  
  
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

  // Call text fonts function after component mounted
  componentDidMount() {
    this.loadFonts();
  }

  // Screen components
  render() { 

    // Only show screen after fonts are loaded
    if (this.state.fontsLoaded) { 
        return (  

          <ImageBackground source={require('./Images/Background1.png')} resizeMode="cover" style={stylesOptionsScreen.image}>
              <View style={stylesOptionsScreen.container}>
                <View style={stylesOptionsScreen.containerLogo}>
                  <SVGLogo
                    style = {stylesOptionsScreen.imageLogo}
                  />
                </View>
                
                <View style = {stylesOptionsScreen.container}>
                <Pressable style={stylesOptionsScreen.tripsButton} onPress={() => this.props.navigation.navigate('Trips')}>
                  <Text style={stylesOptionsScreen.buttonsText}>TRIPS</Text>
                </Pressable>

              
                <Pressable style={stylesOptionsScreen.plansButton} onPress={() => this.props.navigation.navigate('Plans')}>
                  <Text style={stylesOptionsScreen.buttonsText}>TRAVEL PLANS</Text>
                </Pressable>

          
                <Pressable style={stylesOptionsScreen.pointsButton} onPress={() => this.props.navigation.navigate('Points')}>
                  <Text style={stylesOptionsScreen.buttonsText}>POINTS OF INTEREST</Text>
                </Pressable>
                </View>
            </View> 

          </ImageBackground>

        );      
    } 
  } 
}  

//FALTA VERIFICAR A CLASSE ABAIXO
/*
class FiltersScreen extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
        fontsLoaded: false
    }
  }

  async loadFonts() {
    await Font.loadAsync({
      'Sansation': require('./assets/fonts/Sansation_Regular.ttf'),
      'SansationBold': require('./assets/fonts/Sansation_Bold.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() { 
    if (this.state.fontsLoaded) { 
        return (  
          <View style={styles4.container}>
           
            <ImageBackground source={require('./Images/Background.png')} resizeMode="cover" style={styles3.imageBackground} imageStyle ={{borderBottomLeftRadius:30,borderBottomRightRadius:30}}>

            <View style = {styles3.container3}>
              <Text style = {{left:20,color:'#FFFFFF', fontFamily:'Sansation', fontSize:11, }}> Sort </Text>
              <Text style = {{left:220,color:'#FFFFFF', fontFamily:'Sansation', fontSize:11,}}> Filters </Text>
            </View>

            </ImageBackground>
          

            <View style ={styles3.container2}>
              <View style={styles4.row}>
                <SVGTrips
                  style = {styles4.imageLogo1}
                />
              
                <SVGRoutes
                  style = {styles4.imageLogo2}
                />
              </View>

              <View style={styles4.row}>
                <SVGOption3
                  style = {styles4.imageLogo1}
                />

                <SVGOption4
                  style = {styles4.imageLogo2}
                />
              </View>
            </View>

          </View>

        );      
    } 
  } 
}  




/******************** App Initializer **********************/

/* 

  Inserts screens into the navigator and associates a tag for each one
  First screen is defined in "initialRouteName"
  Header mode to none defines that the screens don't have an header that says the name of the screens

*/
const AppNavigator = createStackNavigator(  
    {  
        Home: HomeScreen, 
        Options: OptionsScreen, 
        Trips: TripsScreen,
        Lists: ListsScreen,
        Points: PointsScreen,
        Plans: PlansScreen,
        Regions: RegionsScreen,
        TripsFilter: TripsFilterScreen,
        MapsPlans: MapsPlansScreen,
        MapsTrips: MapsTripsScreen,
        Links: LinksScreen,
        MapsPoints: MapsPointsScreen,
        ListsPoints: ListsPointsScreen,
        LoadingPoints: LoadingPointsScreen,
        LoadingScreen: LoadingScreen,
        DaysScreen: DaysScreen,
        //Test: MyComponent
    
    },  
    {  
        initialRouteName: "DaysScreen",
        headerMode: 'none'
    }  
);  
  
/*

    Creates the app
    Associates the app navigator

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
    position: 'absolute',
    fontFamily: 'SansationBold',
    fontSize: 14,
    display: 'flex',
    letterSpacing: 2,
    color: '#FFFFFF',
  },
  startButton : {
    position: 'absolute',
    justifyContent:'center',
    alignItems:'center',
    left: '10%',
    right: '10%',
    top: '85%',
    bottom: '8%',
    backgroundColor: '#161B1A',
    borderRadius: windowWidth * 0.1, // 10% of the screen width
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height:'100%',
    backgroundColor: '#938698',
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30
  },
  containerLogo:{
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    bottom:'20%'
  },
  imageLogo:{
    width:'100%',
    height:'30%',
    top:'10%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent:'center',
    width:'100%',
    height:'100%'
  },
});

const stylesOptionsScreen = StyleSheet.create({
  buttonsText: {
    position: 'absolute',
    left: '35%',
    right: '35%',
    top: '35%',
    bottom: '35%',
    fontFamily: 'Sansation',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 22,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 2,
    color: 'black',
  },
  tripsButton : {
    position: 'absolute',
    left: 25,
    top: 0,
    width: 350,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: windowWidth * 0.1, // 10% of the screen width
  },
  pointsButton : {
    position: 'absolute',
    left: 25,
    top: 200,
    width: 350,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: windowWidth * 0.1, // 10% of the screen width
  },
  plansButton : {
    position: 'absolute',
    left: 25,
    top: 100,
    width: 350,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: windowWidth * 0.1, // 10% of the screen width
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height:'100%',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    height:'100%',
  },
  containerLogo:{
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    bottom:'20%'
  },
  imageLogo:{
    width:'100%',
    height:'30%'
  }
})

// FALTA VERIFICAR ESTES DOIS ABAIXO
const styles3 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
  },
  container2: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  container3:{
    alignItems:'center',
    flexDirection:'row',
    backgroundColor:'#311D6F',
    borderRadius:30,
    width:'90%',
    height:'40%',
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  imageBackground:{
    flex:1,
    width:'100%',
    height:'100%',
    backgroundColor:'rgba(0,0,0,0.5)',
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    alignItems:'center',
    justifyContent:'center'
  }
})

const styles4 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  row: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop: 20
  },
  item: {
    flex: 1,
    justifyContent: '',
    alignItems: 'center',
    height:200,
    width:10,
    backgroundColor: 'gray',
    padding: 20,
    borderRadius:10
  },
  title: {
    fontSize: 12,
    fontFamily:'Sansation',
    top:20,
    left:20,
    color: '#D039B0'
  },
  description: {
    fontSize: 10,
    fontFamily:'Sansation',
    left:20,
    top:40,
    color:'#D0D0E0'
  },
  imageLogo1:{
    width:'100%',
    heigh:'100%',
    left:'15%'
  },
  imageLogo2:{
    width:'100%',
    heigh:'100%',
    right:'15%'
  },
  
});

/*********************************************************/
