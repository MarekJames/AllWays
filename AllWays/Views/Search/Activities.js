/*

Activities.js 
  
  -> Shows the list of activities for the route generated ( day selected )

*/




/******************** Imports Section ********************/ 

// Imports for the react components add buttons, images, text, etc
import "react-native-url-polyfill/auto"
import { Feather, Ionicons } from '@expo/vector-icons';
import { getImageUrl } from "../../config/images-config";
import { updateRoute } from '../../config/firebase-config';
import { NetworkContext } from "../../config/network-config";  
import React, {useState, useEffect, useContext} from 'react';
import { showNetworkError } from "../../config/network-config";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {Image, ActivityIndicator, StyleSheet, View, Text, Dimensions, TouchableOpacity, ScrollView, Linking, ImageBackground} from 'react-native'; 




/******************* Global Variables ********************/

const width = Dimensions.get('window').width   // Get width of the user screen
const height = Dimensions.get('window').height // Get height of the user screen




/*********************** Classes *************************/

/*

  ActivitiesScreen class
  Displayed when the user selects a day from the route plan
  Shows the detailed route plan for the specific day

*/
export class ActivitiesScreen extends React.Component{

  activities = () => {

    const { route } = this.props;
    const [isLoading, setIsLoading] = useState([]);
    const isConnected = useContext(NetworkContext);
    const { listsPlan, routePlan, city, savedRoutes, routeId } = route.params;

    // Called when the screen is loaded
    useEffect(() => {
      
      // Create an array of `true` values based on listsPlan length
      const initialLoading = Array(listsPlan.length).fill(true);
      setIsLoading(initialLoading);
      var counter = 0;

      // Loop through the activities and put the url in the routePlan object
      routePlan.activities.forEach(async (item, index) => {  
        try{
          if(index != 0 && !routePlan.activities[index].imageUrl) {
            await getImageUrl(routePlan.activities, item.name + ', ' + city, index, 0, isConnected);
            counter++;
          }

          // Update Loading State
          setIsLoading((prevLoading) => {

            // Create a new array based on the previous state
            const updatedLoading = [...prevLoading];
            
            // Update the loading flag for the specific index
            updatedLoading[index] = false;
            return updatedLoading;
          });
        
          // All images loaded
          if(savedRoutes && counter == 5){

            // Update route in DB
            updateRoute(routeId, listsPlan);
          }
        }
        catch(error){
          showNetworkError(this.props.navigation, error.message);
        }
      });
    }, []);

    
    const openGoogleMaps = (activity) => {
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${activity}`;
  
      Linking.openURL(mapUrl)
        .catch(err => console.error('An error occurred', err));
    };

    const openGoogle = (activity) => {
        // Wikipedia URL for a specific page (example: React_Native)
        const googlePageURL = `https://www.google.com/search?q=${activity}`;
    
        Linking.openURL(googlePageURL)
          .then((supported) => {
            if (!supported) {
              console.error("Can't open Wikipedia page.");
            }
          })
          .catch((err) => console.error('An error occurred: ', err));
    };

    return routePlan.activities.map((item, index) => (   
      
      <View style={ActivitiesListStyles.square} key={index}>
        
        {/* Image at the top -> 40% of the square */}
        <View style = {ActivitiesListStyles.squareImageContainer}>  
          {!isLoading[index] ? (
            <Image
              source={{ uri: item.imageUrl }}
              style={ActivitiesListStyles.image}
            />
          ) : (
            <ActivityIndicator 
              size="small"
              style = {{justifyContent:'center', alignItems:'center', height:'30%'}}
            />
          )}
        </View>

        {/* Title and description -> 40% of the square */}
        <View style={ActivitiesListStyles.textContainer}>
          <Text style={ActivitiesListStyles.title}>{item.name}</Text>
          <Text style={ActivitiesListStyles.description}>{item.description}</Text>
        </View>

        {/* Buttons at the bottom -> 20% of the square*/}
        <View style={ActivitiesListStyles.buttonContainer}>
          <TouchableOpacity  style={ActivitiesListStyles.button} onPress = { () => {openGoogleMaps(item.name)}}>
              <Text style={ActivitiesListStyles.buttonText}>Maps</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ActivitiesListStyles.button} onPress = { () => {openGoogle(item.name)}}>
              <Text style={ActivitiesListStyles.buttonText}>Info</Text>
          </TouchableOpacity>
        </View>

      </View>
    )) 
  } 

  render(){

    const { route } = this.props;
    const { routePlan, city, imageRoute } = route.params;
    // Define the image variable and the associated function
    
    var newCity = city.split(',')[0];
    return (
      <View style={ParentStyles.container}>
        
        {/* Header */}
        <View style = {ActivitiesListStyles.headerView}>
          <ImageBackground source={{ uri: imageRoute }} style={ActivitiesListStyles.imageBackground} >
             <View style = {ActivitiesListStyles.headerSubview}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={ActivitiesListStyles.backButton}
              >
                <Ionicons name="chevron-back-sharp" size={25} color="black" />
              </TouchableOpacity>
            </View>
            <View style = {ActivitiesListStyles.headerTitle}>
              <Text style ={ParentStyles.title}>{newCity}</Text>
            </View>
            <View style = {ActivitiesListStyles.headerSubtitle}>
              <Text style ={ParentStyles.subtitle}>{routePlan.day}</Text> 
              <Text style ={ActivitiesListStyles.activitySubtitleDate}>{routePlan.date}</Text>  
            </View>
             
          </ImageBackground>
        </View>

        {/* Scroll view of the list of activities for the specified day */}
        <ScrollView style={ActivitiesListStyles.scrollView}>

          {/* List of activities, description and, maps and info buttons */}
          <View style={ActivitiesListStyles.activitiesView}>
            <this.activities/>
          </View>
          
        </ScrollView>
      
      </View>
    );
  }
}




/********************* Stylesheets ***********************/

const ParentStyles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#FFFFFF',
  },
  imageBackground: {
    width:'100%',
    height:'30%',
  },
  title:{
    color:'#fff',
    fontSize:scale(40),
    textAlignVertical:'center',
    fontFamily:'Poppins-Medium',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  subtitle:{
    color:'#fff',
    fontSize:scale(20),
    textAlignVertical:'center',
    fontFamily:'Poppins-Medium',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  }
});
  
const ActivitiesListStyles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  scrollView:{
    flex:1,
    marginTop:verticalScale(5),
    marginBottom:verticalScale(65),
  },
  activitiesView:{
    alignItems:'center',
  },
  headerView:{
    height:'25%',
    alignItems:'center',
    flexDirection: 'row',
  },
  headerSubview:{
    height:'45%',
    paddingLeft:scale(10),
    paddingTop:verticalScale(40),
  },
  headerTitle:{
    height:'32%',
    paddingLeft:scale(10),
    justifyContent:'center',
  },
  headerSubtitle:{
    alignItems:'center',
    flexDirection:'row',
    paddingLeft:scale(10),
  },
  backButton:{
    borderRadius:30,
    alignItems:'center',
    backgroundColor:'#ffffff',
    justifyContent:'center',
    width:moderateScale(40),
    height:moderateScale(40),
  },
  icon:{
    alignSelf:'center',
    marginHorizontal:scale(10),
  },
  square: {
    elevation:5,
    borderRadius:30,
    width:width*0.90,
    overflow:'hidden',
    height:height*0.35,
    margin:moderateScale(10),
    backgroundColor:'#E8E8E8',
    justifyContent:'space-between',
  },
  squareImageContainer:{
    width:'100%',
    height:'40%',
  },
  imageBackground: {
    width:'100%',
    height:'100%',
  },
  image: {
    width:'100%',
    height:'100%',
  },
  textContainer: {
    width:'100%',
    height:'40%',
    alignItems:'center',
    justifyContent:'center',
    padding:moderateScale(10),
    fontFamily:'Poppins-Medium',
  },
  title: {
    fontSize:scale(20),
    textAlign:'center',
    fontFamily:'Poppins-SemiBold',
  },
  description: {
    fontSize:scale(13),
    textAlign:'center',
    fontFamily:'Poppins-Light',
  },
  buttonContainer: {
    width:'100%',
    height:'20%',
    flexDirection:'row',
    alignItems:'center',
    alignContent:'center',
    justifyContent:'space-around',
    paddingBottom:verticalScale(10),
  },
  buttonText: {
    color:'white',
    alignSelf:'center',
    textAlign:'center',
    fontSize:scale(13),
    fontFamily:'Poppins-SemiBold',
  },
  button: {
    width:'40%',
    elevation:2,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center',
    height:verticalScale(30),
    backgroundColor:'#23C2DF',
  },
  activitySubtitleDate: {
    fontSize:scale(16),
    textAlign:'center',
    marginLeft:scale(10),
    color:'rgba(255,255,255,1)',
    fontFamily:'Poppins-Light',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});