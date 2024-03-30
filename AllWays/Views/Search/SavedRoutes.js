/*

SavedRoutes.js 
  
  -> Shows the list of saved routes

*/




/******************** Imports Section ********************/ 

import React from 'react';  
import {Image, StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, ImageBackground} from 'react-native'; 
import {deleteRoute, updateSavedRoutes} from '../../config/firebase-config'




/******************* Global Variables ********************/

const width = Dimensions.get('window').width   // Get width of the user screen
const height = Dimensions.get('window').height // Get height of the user screen




/*********************** Classes *************************/

/*

  SavedRoutesScreen class
  Displayed when Saved tab is clicked
  Shows the users saved routes

*/
export class SavedRoutesScreen extends React.Component{

    // Need to wait for the query to finish
    // Show loading page while waiting
  
    savedRoutes =  () => {
     
      // Only call the API if the field imageUrl doesn't exist
      var userRoutes = updateSavedRoutes();
      
      if(userRoutes._j.length != 0){
  
        return userRoutes._j.map((item, index) => (   
        
          <TouchableOpacity style={SavedRoutesStyles.square} key={index} onLongPress = {() => {alert('Route Deleted'); deleteRoute(item.id)}} onPress={() =>  {
             this.props.navigation.navigate('Days', {savedRoutes: true, listsPlan: item.route, city: item.city, days: item.days})
            }}>
  
            <Image
              source={{ uri: item.route[0].imageUrl }}
              style={SavedRoutesStyles.image}
            />
  
            {/* Title and description */}
            <View style={SavedRoutesStyles.textContainer}>
              <Text style={SavedRoutesStyles.titleSquare}>{item.city}</Text>
              <Text style={SavedRoutesStyles.description}>{item.days} Days </Text>
            </View>
            
          </TouchableOpacity> 
  
        ))
      }
      else{
        return ( 
          <View style = {{alignItems:'center'}}>
            <Text style = {{marginTop: 70, marginHorizontal:30, marginBottom:10, fontSize:25, textAlign:'center'}}>You haven't saved a route yet!</Text>
            <Text style = {{fontSize:15}}>Be sure to do so in the Search Tab</Text>
            <View style = {{width:300, height:300,borderRadius:30, margin:50}}> 
              <Image source={require('../../Images/SavedRoutesEmpty.png')}style={{resizeMode:'contain', width:'100%', height:'100%', borderRadius:100}}/>
            </View>
          </View>
        )
      }
    }
  
    render(){
  
      return (
        <View style={SavedRoutesStyles.container}>
  
          <View style={SavedRoutesStyles.imageBackground}>
            
            <ImageBackground source={require('../../Images/BackgroundHome.jpg')} style={SavedRoutesStyles.imageTitle} >
  
              <View style = {{flex:1, justifyContent:'flex-end', alignItems:'center', marginBottom:30}}>
                <Text style ={SavedRoutesStyles.title}>Saved Routes</Text> 
              </View>
             
            </ImageBackground>
            
          </View>
        
          {/* Scroll view of the list of activities for the specified day */}
          <ScrollView style = {{flex:1}}>
            
            {/* List of activities, description and, maps and info buttons */}
            <View style={{alignItems:'center'}}>
              <this.savedRoutes/>
            </View>
  
          </ScrollView>
        
        </View>
      );
    } 
}




/********************* Stylesheets ***********************/

const SavedRoutesStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF'
    },
    imageBackground: {
      width:'100%',
      height:'15%',
    },
    square: {
      width: width * 0.9, // 90% of the device width
      height: 200,
      backgroundColor: 'lightgrey',
      borderRadius: 10,
      overflow: 'hidden',
      elevation: 5, // Adds a shadow (Android)
      shadowColor: '#000', // Adds a shadow (iOS)
      shadowOffset: { width: 0, height: 2 }, // Adds a shadow (iOS)
      shadowOpacity: 0.25, // Adds a shadow (iOS)
      shadowRadius: 3.84, // Adds a shadow (iOS)
      margin: 10,
    },
    image: {
      width: '100%',
      height: '60%', // Adjusted to 100% to fill the container
    },
    imageTitle: {
        width: '100%',
        height: '100%', // Adjusted to 100% to fill the container
      },
    textContainer: {
      marginTop: 10, // Adjusted margin top for better spacing
      alignItems:'center'
    },
    title: {
      fontSize: 35,
      fontWeight: '600',
      marginBottom: 10,
      color:'#FFFFFF'
    },
    titleSquare: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
        color:'#FFFFFF'
      },
    description: {
      fontSize: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    }
});