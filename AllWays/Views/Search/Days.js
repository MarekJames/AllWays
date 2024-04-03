/*

Days.js 
  
  -> Shows the list of days for the route generated

*/




/******************** Imports Section ********************/ 

// Imports for the react components add buttons, images, text, etc
import React, {useState} from 'react';  
import {Image, View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, ImageBackground} from 'react-native'; 
import "react-native-url-polyfill/auto"
import { Ionicons } from '@expo/vector-icons';
import {insertRoute, deleteRoute} from '../../config/firebase-config'




/******************* Global Variables ********************/

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
    const { savedRoutes, listsPlan, city, days, imageRoute} = route.params;
   
    return listsPlan.map((item, index) => (
      <TouchableOpacity key={item.day} style = {DaysListStyles.dayContainer} onPress={() => {this.props.navigation.navigate('Activities', {savedRoutes: savedRoutes, listsPlan:listsPlan, routePlan:listsPlan[index], city: city, days:days, imageRoute: imageRoute})}}>
          {/* Image at the top occupying 50% of the square */}
          <Image
            source={{ uri: item.imageUrl }}
            style={DaysListStyles.image}
          />

          <View style = {{flexDirection:'column', justifyContent:'center', alignItems:'flex-start'}}>
            <Text style = {DaysListStyles.dayTitle}>{item.day}</Text>
            <Text style = {DaysListStyles.daySubtitle}>{item.description}</Text>
          </View>

      </TouchableOpacity>
    ));
   
  }

  // Renders the screen
  render() {
    const { route } = this.props;
    const { savedRoutes, city, days, listsPlan, imageRoute } = route.params;
    var newCity = city.split(',')[0];
    // Const that gets the images for the specific activities
    // Also defines what is shown in the specific day route plan screen
   
    const HeartIcon = () => {
      const [isSaved, setIsSaved] = useState(false); // Initially, the content is not saved
      const [routeId, setRouteId] = useState('');

      const toggleSave = () => {
        if(!isSaved) insertRoute(listsPlan, listsPlan.imageUrl, city, days).then((id) => setRouteId(id));
        else deleteRoute(routeId);

        setIsSaved(!isSaved);
      };
    
      return (
        <TouchableOpacity onPress={toggleSave}>
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
          
          <ImageBackground source={{ uri: imageRoute }}style={DaysListStyles.imageBackground} >

            <View style ={{flexDirection:'row', justifyContent:'space-between'}} >
              {savedRoutes && (<TouchableOpacity
                onPress={() => this.props.navigation.navigate('SavedRoutes')}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 30,
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin:20
                }}
              >
                <Text><Ionicons name="chevron-back-sharp" size={30} color="black" /></Text>
              </TouchableOpacity>
              )}

              {/* HeartIcon component */}
              {!savedRoutes && (<TouchableOpacity
                onPress={() => this.props.navigation.navigate('SavedRoutes')}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 30,
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin:20
                }}
              >
                <HeartIcon/>
              </TouchableOpacity>
              )}
            </View>

            <View style = {{flex:1, justifyContent:'flex-end',marginBottom:30}}>
              <Text style ={ParentStyles.title}>{newCity}</Text>
              <Text style ={ParentStyles.subtitle}>{days} Days</Text>  
            </View>
           
          </ImageBackground>
          
        </View>

      
          {/* Scroll view with the list of days */}
        <ScrollView style={{flex:1, marginBottom:65}}>
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
  container: {
    flex:1,
    backgroundColor: '#FFFFFF',
  },
  imageBackground: {
    width:'100%',
    height:'30%',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingBottom: 10,
    marginBottom: 20,
  },
  containerLogoHeart: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center', // Align items vertically
    justifyContent: 'center', // Space evenly between children
  },
  containerLogo: {
    flex:1,
    marginRight: 10, // Adjust margin as needed
  },
  logo: {
    width: '100%', // Adjust logo width as needed
    height: '100%', // Adjust logo height as needed
    resizeMode: 'contain', // Ensure the logo fits its container
  },
  iconContainer: {
    // Style heart icon container if needed
    paddingRight:10
  },
  listTitle: {
    fontSize: 20,
    fontWeight:'500',
    marginTop:10,
    textAlign: 'center',
  },
  listSubtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10, // Adjust margin top as needed to bring the list name down
    marginBottom:20
  },
  dayText: {
    fontSize: 30,
    textAlign: 'center',
  },
  saveRouteButtom:{
    borderColor:'#000',
    borderWidth:1,
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 60,
    margin:10,
    alignSelf:'center',
  },
  saveRouteText:{
    fontSize: 30,
    color:'#000'
  },
  title:{
    marginLeft:10,
    fontWeight:'500',
    fontSize:64,
    color:'#fff',
  },
  subtitle:{
    marginLeft:10,
    fontWeight:'400',
    fontSize:30,
    color:'#fff',
    marginTop:-15
  }
});

const DaysListStyles = StyleSheet.create({
  dayContainer: {
      width: width * 0.9, // 90% of the device width
      height: height * 0.12,
      backgroundColor: '#EEF6FB',
      borderRadius: 25,
      overflow: 'hidden',
      elevation: 5, // Adds a shadow (Android)
      shadowColor: '#000', // Adds a shadow (iOS)
      shadowOffset: { width: 0, height: 2 }, // Adds a shadow (iOS)
      shadowOpacity: 0.25, // Adds a shadow (iOS)
      shadowRadius: 3.84, // Adds a shadow (iOS)
      margin: 10,
      flexDirection:'row',
      alignSelf:'center',
  },
  image: {
    width: '35%',
    height: '100%', // Adjusted to 100% to fill the container
  },
  imageBackground: {
    width: '100%',
    height: '100%', // Adjusted to 100% to fill the container
   
  },
  dayTitle: {
    fontSize: 30,
    fontWeight:'500',
    color:'#000',
    paddingLeft:20,
  },  
  daySubtitle: {
    fontSize: 15,
    fontWeight:'400',
    color:'#000',
    paddingLeft:20,
  }

});
