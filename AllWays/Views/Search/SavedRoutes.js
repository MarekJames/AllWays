/*

SavedRoutes.js 
  
  -> Shows the list of saved routes

*/




/******************** Imports Section ********************/ 

import React from 'react';  
import {Image, StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, ImageBackground} from 'react-native'; 
import {deleteRoute, updateSavedRoutes} from '../../config/firebase-config'
import { Ionicons } from '@expo/vector-icons';



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

    // Check if user has saved routes
    checkRoutes = () => {
      // Only call the API if the field imageUrl doesn't exist
      var userRoutes = updateSavedRoutes();
      
      if(userRoutes._j.length != 0){
        return ( 
          <View>
            <Text style = {{fontSize:20, fontWeight:'500', margin:10}}>Your saved routes, ready to explore!</Text>
            <ScrollView style = {{marginBottom:65}}>
              {this.savedRoutes(userRoutes)}
            </ScrollView>
          </View>
        )
      }
      else{
        return ( 
            <View style = {{flex:1, alignItems:'center', justifyContent:'center'}}>
              <Text style = {{textAlign:'center', fontSize:15}}>Click on the <Ionicons name="heart-outline" size={30} color="black"/> on the routes to save them here</Text>
            </View>
        )
      }
    }

    // Show saved routes
    savedRoutes =  (userRoutes) => {
      return userRoutes._j.map((item, index) => (   
        <TouchableOpacity style={SavedRoutesStyles.square} key={index} onPress={() =>  {
          this.props.navigation.navigate('Days', {  savedRoutes: true, 
                                                    listsPlan: item.route, 
                                                    city: item.city, 
                                                    days: item.days, 
                                                    imageRoute: item.imageUrl
                                                  })
        }}>

          {/* Image */}
          <Image
            source={{ uri: item.imageUrl }}
            style={SavedRoutesStyles.image}
          />

          {/* Title and description */}
          <View style={SavedRoutesStyles.textContainer}>
            <Text style={SavedRoutesStyles.titleSquare}>{item.city}</Text>
            <Text style={SavedRoutesStyles.description}>{item.days} Days </Text>
          </View>

          {/* Delete Option */}
          <TouchableOpacity style={SavedRoutesStyles.deleteContainer} onPress={()=> {deleteRoute(item.id)}}>
            <Ionicons name="trash-outline" size={20} color="#3B3B3B"/>
          </TouchableOpacity>
        </TouchableOpacity> 
      )) 
    }
  
    // Show header and call check routes
    render(){
      return (
        <View style={SavedRoutesStyles.container}>
          
          {/* Title and background image */}
          <View style={SavedRoutesStyles.imageBackground}> 
            <ImageBackground source={require('../../Images/BackgroundSaved.png')} style={SavedRoutesStyles.imageTitle} >
              <View style = {{flex:1, justifyContent:'flex-end', alignItems:'left', marginBottom:10, marginLeft:20}}>
                <Text style ={SavedRoutesStyles.title}>Saved Routes</Text> 
              </View>
            </ImageBackground> 
          </View>
        
          <this.checkRoutes/>
        </View>
      );
    } 
}




/********************* Stylesheets ***********************/

const SavedRoutesStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems:'center'
    },
    imageBackground: {
      width:'100%',
      height:'20%',
    },
    dayContainer: {
      width: width * 0.9, // 90% of the device width
      height: height * 0.12,
    },
    square: {
      flexDirection:'row',
      width: width * 0.9, // 90% of the device width
      height: height * 0.15,
      backgroundColor: '#EEF6FB',
      borderRadius: 25,
      overflow: 'hidden',
      elevation: 5, // Adds a shadow (Android)
      shadowColor: '#000', // Adds a shadow (iOS)
      shadowOffset: { width: 0, height: 2 }, // Adds a shadow (iOS)
      shadowOpacity: 0.25, // Adds a shadow (iOS)
      shadowRadius: 3.84, // Adds a shadow (iOS)
      margin: 10,
    },
    image: {
      width: '30%',
      height: '100%', // Adjusted to 100% to fill the container
    },
    imageTitle: {
        width: '100%',
        height: '100%', // Adjusted to 100% to fill the container
      },
    textContainer: {
      flex:1,
      alignItems:'left',
      justifyContent:'center',
      margin:10
    },
    deleteContainer: {
      alignSelf:'stretch',
      justifyContent:'center',
      margin:10
    },
    title: {
      fontSize: 40,
      fontWeight: '600',
      marginBottom: 10,
      color:'#FFFFFF'
    },
    titleSquare: {
        fontSize: 27,
        fontWeight: '500',
        marginBottom: 10,
        color:'#000000'
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