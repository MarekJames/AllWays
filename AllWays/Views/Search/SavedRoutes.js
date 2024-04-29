/*

SavedRoutes.js 
  
  -> Shows the list of saved routes

*/




/******************** Imports Section ********************/ 

import React from 'react';  
import { Ionicons } from '@expo/vector-icons';
import { deleteRoute, updateSavedRoutes } from '../../config/firebase-config'
import { Image, StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, ImageBackground } from 'react-native'; 




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
    
    // Get Saved Routes
    var userRoutes = updateSavedRoutes();
    
    // Loop through saved routes
    if(userRoutes._j.length != 0){
      return ( 
        <View style = {{flex:1}}>
          <Text style = {SavedRoutesStyles.subtitle}>Your saved routes, ready to explore!</Text>
          <ScrollView style = {SavedRoutesStyles.scrollView}>
            {this.savedRoutes(userRoutes)}
          </ScrollView>
        </View>
      )
    }
    else{
      return ( 
        <View style = {SavedRoutesStyles.noRoutesContainer}>
          <Text style = {SavedRoutesStyles.noRoutesText}>Click on the <Ionicons name="heart-outline" size={30} color="black"/> on the routes to save them here</Text>
        </View>
      )
    }
  }

  // Show saved routes
  savedRoutes =  (userRoutes) => {
    return userRoutes._j.map((item, index) => (   
      <TouchableOpacity style={SavedRoutesStyles.square} key={index} onPress={() =>  {
        this.props.navigation.navigate('Days', {  savedRoutes: true, 
                                                  city: item.city, 
                                                  routeId: item.id,
                                                  endDate: item.endDate,
                                                  listsPlan: item.route, 
                                                  startDate: item.startDate, 
                                                  imageRoute: item.imageUrl,
                                                })
      }}>

        {/* Image */}
        <Image
          source={{ uri: item.imageUrl }}
          style={SavedRoutesStyles.image}
        />

        {/* Title and description */}
        <View style={SavedRoutesStyles.textContainer}>
          <Text style={SavedRoutesStyles.titleSquare}>{item.city.split(',')[0] + ',' + item.city.split(',')[item.city.split(',').length - 1]}</Text>
          <Text style={SavedRoutesStyles.description}>{item.startDate}-{item.endDate}</Text>
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
          <ImageBackground source={require('../../Images/BackgroundSaved.jpg')} style={SavedRoutesStyles.imageTitle} >
            <View style = {SavedRoutesStyles.headerTitleContainer}>
              <Text style ={SavedRoutesStyles.title}>Saved Routes</Text> 
            </View>
          </ImageBackground> 
        </View>
      
        {/* User Routes */}
        <this.checkRoutes/>
      </View>
    );
  } 
}




/********************* Stylesheets ***********************/

const SavedRoutesStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    backgroundColor: '#FFFFFF',
  },
  headerTitleContainer: {
    flex:1, 
    marginLeft:20,
    marginBottom:10, 
    alignItems:'left', 
    justifyContent:'flex-end', 
  },
  noRoutesContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  noRoutesText:{
    fontSize:15,
    textAlign:'center',
    fontFamily: 'Poppins-Medium',
  },
  imageBackground: {
    width:'100%',
    height:'20%',
  },
  scrollView: {
    marginBottom:65
  },
  square: {
    margin: 10,
    elevation: 5,
    borderRadius: 25,
    width: width * 0.9,
    overflow: 'hidden',
    shadowRadius: 3.84,
    flexDirection:'row',
    shadowColor: '#000', 
    shadowOpacity: 0.25, 
    height: height * 0.15,
    backgroundColor: '#EEF6FB',
    shadowOffset: { width: 0, height: 2 }, 
  },
  image: {
    width: '30%',
    height: '100%',
  },
  imageTitle: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex:1,
    margin:10,
    alignItems:'left',
    justifyContent:'center',
  },
  deleteContainer: {
    margin:10,
    alignSelf:'stretch',
    justifyContent:'center',
  },
  title: {
    fontSize: 40,
    color:'#FFFFFF',
    marginBottom: 10,
    fontFamily: 'Poppins-Medium',
  },
  subtitle: {
    margin:10,
    fontSize:20,  
    fontFamily: 'Poppins-Medium',
  },
  titleSquare: {
    fontSize: 27,
    color:'#000000',
    marginBottom: 10,
    fontFamily: 'Poppins-Medium',
  },
  description: {
    fontSize: 13,
    fontFamily: 'Poppins-Light',
  },
});