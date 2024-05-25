/*

Days.js 
  
  -> Shows the list of days for the route generated

*/




/******************** Imports Section ********************/ 

// Imports for the react components add buttons, images, text, etc
import Moment from 'moment';
import "react-native-url-polyfill/auto";
import { extendMoment } from 'moment-range';
import { Ionicons } from '@expo/vector-icons';
import { getImageUrl } from '../../config/images-config';
import React, {useEffect, useState, useContext} from 'react';
import { NetworkContext } from '../../config/network-config';
import {insertRoute, deleteRoute} from '../../config/firebase-config';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {Image, View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator} from 'react-native'; 




/******************* Global Variables ********************/

const moment = extendMoment(Moment);
const width = Dimensions.get('window').width   // Get width of the user screen
const height = Dimensions.get('window').height // Get height of the user screen




/*********************** Classes *************************/

/*

  DaysScreen class
  Displayed after CHATGPT response
  Shows the list of days

*/
export class DaysScreen extends React.Component {  
  
  // Function that displays the list of days
  lists = () => {
    
    const { route } = this.props;
    const [isLoading, setIsLoading] = useState([]);
    const isConnected = useContext(NetworkContext);
    const { savedRoutes, listsPlan, city, startDate, endDate, imageRoute, routeId } = route.params;

    // Load Images
    useEffect(() => {
      
      // Create an array of `true` values based on listsPlan length
      const initialLoading = Array(listsPlan.length).fill(true);
      setIsLoading(initialLoading);
      
      //Loop through the activities and put the url in the listsPlan object
      listsPlan.forEach(async (item, index) => {  
        try{
          
          // Get Image
          if(!listsPlan[index].imageUrl){
            await getImageUrl(listsPlan, item.activities[0].name + ', ' + city, index, 0, isConnected);
          }
          
          // Update Loading State
          setIsLoading((prevLoading) => {

            // Create a new array based on the previous state
            const updatedLoading = [...prevLoading];
            
            // Update the loading flag for the specific index
            updatedLoading[index] = false;
            return updatedLoading;
          });
        }
        catch(e){
          throw Error(e);
        }
      });
    }, []);
    
    return listsPlan.map((item, index) => (
      <TouchableOpacity key={item.day} style = {DaysListStyles.dayContainer} onPress={() => {this.props.navigation.navigate('Activities', { savedRoutes: savedRoutes, listsPlan:listsPlan, routePlan:listsPlan[index], city: city, startDate: startDate, endDate: endDate, imageRoute: imageRoute, routeId: routeId != null ? routeId : 0 })}}>
          {/* Image at the top occupying 50% of the square */}
          {!isLoading[index] ? ( 
            <Image
              source={{ uri: item.imageUrl }}
              style={DaysListStyles.image}
            />
          ) : (
            <ActivityIndicator
              size="small"
              style = {{alignSelf:'center'}}
            />
          )}

          <View style = {{flex:1, alignItems:'left', justifyContent:'center', margin:moderateScale(10)}}>
            <View style = {{flexDirection:'row'}}>
              <Text style = {DaysListStyles.dayTitle}>{item.day}</Text>
              <Text style = {DaysListStyles.dayTitleDate}>{item.date}</Text>
            </View>
            <Text style = {DaysListStyles.daySubtitle}>{item.description}</Text>
          </View>

      </TouchableOpacity>
    ));
   
  }

  // Renders the screen
  render() {
    const { route } = this.props;
    const { savedRoutes, city, startDate, endDate, listsPlan, imageRoute } = route.params;
    var newCity = city.split(',')[0];
    
    // Format dates
    const start = moment(startDate, 'DD/MM/YYYY');
    const end   = moment(endDate, 'DD/MM/YYYY');
    const range = moment.range(start, end);

    // Heart Icon
    const HeartIcon = () => {
      const [isSaved, setIsSaved] = useState(false); // Initially, the content is not saved
      const [routeId, setRouteId] = useState('');

      const toggleSave = () => {
        if(!isSaved) insertRoute(listsPlan, listsPlan.imageUrl, city, startDate, endDate).then((id) => setRouteId(id));
        else deleteRoute(routeId);

        setIsSaved(!isSaved);
      };
    
      return (
        <TouchableOpacity  
          onPress = {toggleSave}
          style={{
          width:scale(45),
          height:verticalScale(45),
          borderRadius: 30,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop:verticalScale(40),
          marginLeft:scale(20)
          }}
        >
          <View>
            {!isSaved && <Ionicons name="heart-outline" size={30} color="black" /> }
            {isSaved && <Ionicons name="heart" size={30} color="black" /> }
          </View>
        </TouchableOpacity>
      );
    };

    // If fonts are loaded and showDayRoutePlan is 0 (Shows the list of days)
    return (
      <View style={ParentStyles.container}>
        <View style={ParentStyles.imageBackground}>
          <ImageBackground source={{ uri: imageRoute }} style={DaysListStyles.imageBackground} >
            <View style = {{height:'45%', flexDirection:'row', justifyContent:'space-between', marginRight: scale(20)}}>
              <View>
                {savedRoutes && (<TouchableOpacity style = {ParentStyles.backButton} onPress={() => this.props.navigation.navigate('SavedRoutes')}>
                  <Ionicons name="chevron-back-sharp" size={30} color="black" />
                </TouchableOpacity>
                )}
              </View>
              <View>
  
                {/* HeartIcon component */}
                {!savedRoutes && (
                  <HeartIcon/>
                )}
              </View>
            </View>
            <View style = {{height:'30%', paddingLeft:scale(10), justifyContent:'center'}}>
              <Text style ={ParentStyles.title}>{newCity}</Text>
            </View>
            <View style = {{height:'15%', paddingLeft:scale(10),  flexDirection:'row'}}>
              <Text style ={ParentStyles.subtitle}>{range.diff('days') + 1} Days</Text>
              <Text style ={ParentStyles.subtitleDate}> {startDate.substring(0,5)}-{endDate.substring(0,5)}</Text>
            </View>  
            
          </ImageBackground>
        </View>

        {/* Scroll view with the list of days */}
        <ScrollView style={{flex:1, marginBottom:verticalScale(65)}}>
            {/* Title and description */}
          <Text style={ParentStyles.listTitle}> Select a day to discover your journey</Text>
          <this.lists/>
        </ScrollView>

      </View>
    );
  }
}




/********************* Stylesheets ***********************/

const ParentStyles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#FFFFFF',
  },
  imageBackground:{
    width:'100%',
    height:'30%',
  },
  listTitle:{
    fontSize:scale(16),
    textAlign:'center',
    marginTop:verticalScale(10),
    fontFamily:'Poppins-Medium',
  },
  title:{
    color:'#fff',
    fontSize:scale(50),
    fontFamily:'Poppins-Medium',
  },
  subtitle:{
    color:'#fff',
    fontSize:scale(25),
    textAlign:'center',
    fontFamily:'Poppins-Medium',
  },
  subtitleDate:{
    color:'#fff',
    fontSize:scale(16),
    textAlignVertical:'center',
    fontFamily:'Poppins-Light', 
  },
  backButton:{
    width:scale(45),
    borderRadius:30,
    alignItems:'center',
    marginLeft:scale(10),
    backgroundColor:'#fff',
    justifyContent:'center',
    height:verticalScale(45),
    marginTop:verticalScale(40),
  },
});

const DaysListStyles = StyleSheet.create({
  dayContainer:{
      margin:moderateScale(10),
      elevation:5, 
      borderRadius:25,
      overflow:'hidden',
      width:width*0.9,
      shadowRadius:3.84,
      alignSelf:'center',
      shadowOpacity:0.25,
      shadowColor:'#000',
      flexDirection:'row',
      height:height*0.15,
      backgroundColor:'#EEF6FB',
      shadowOffset:{width:0, height:2},
  },
  image:{
    height:'100%',
    width:'35%',
  },
  imageBackground: {
    width:'100%',
    height:'100%',
  },
  dayTitle:{
    color:'#000',
    fontSize:scale(25),
    textAlign:'center',
    fontFamily:'Poppins-Medium',
  },  
  dayTitleDate:{
    fontSize:scale(13),
    textAlign:'center',
    color:'rgba(0,0,0,0.5)',
    margin:moderateScale(10),
    fontFamily:'Poppins-Medium',
  },
  daySubtitle:{
    color:'#000',
    fontSize:scale(13),
    fontFamily:'Poppins-Light',
  }
});


