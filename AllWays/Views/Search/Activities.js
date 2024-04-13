/*

Activities.js 
  
  -> Shows the list of activities for the route generated ( day selected )

*/




/******************** Imports Section ********************/ 

// Imports for the react components add buttons, images, text, etc
import axios from 'axios';
import "react-native-url-polyfill/auto"
import { Ionicons } from '@expo/vector-icons';
import React, {useState, useEffect} from 'react';
import { updateRoute } from '../../config/firebase-config';  
import { customSearchKey, searchEngineId } from '../../config/keys-config'
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
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const { listsPlan, routePlan, city, savedRoutes, routeId } = route.params;
    
    const getImageUrl = async (query,index, counter) => {
      // Call the google search engine here
      const url = `https://www.googleapis.com/customsearch/v1?key=${customSearchKey}&cx=${searchEngineId}&q=${query}&searchType=image&num=1&fileType=jpg`;

      try{
        await axios.get(url)
        .then((response) => {
          const image = response.data.items[0];
          return image;
        })
        .then((image) => {
          const imageUrl = image.link;
          routePlan.activities[index].imageUrl = imageUrl;
        })
      }catch(e){
        console.log(e.response.data)
        if( counter < 3 ) await getImageUrl(query,index, counter + 1);
      }
      
    }

    const createImagesUrls = async () => {
      var counter = 0;
      
      // Loop through the activities and put the url in the routePlan object
      await routePlan.activities.forEach(async (item, index) => {
        if(index != 0) await getImageUrl(item.name + ', ' + city,index, 0);
      
        // Need a counter because the loop indexes can terminate randomly like ( index 4 returns the image first, then the index 2, etc)
        counter++;
        if(counter == 5){

          // Activities loaded from a saved route
          if(savedRoutes){

            // Update route in DB
            updateRoute(routeId, listsPlan);
          }
          setImagesLoaded(true);
        }
      });
    }

    // Called when the screen is loaded
    useEffect(() => {
      
      // Only call the API if the field imageUrl doesn't exist
      if(!routePlan.activities[1].imageUrl){
        createImagesUrls();
      }
      else{
        setImagesLoaded(true)
      }
      
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

        {/* Image at the top occupying 50% of the square */}
        {imagesLoaded && <Image
          source={{ uri: item.imageUrl }}
          style={ActivitiesListStyles.image}
        />}

        {!imagesLoaded &&  <ActivityIndicator 
          size="small"
          style = {{justifyContent:'center', alignItems:'center', height:'30%'}}
        />}

        {/* Title and description */}
        <View style={ActivitiesListStyles.textContainer}>
          <Text style={ActivitiesListStyles.title}>{item.name}</Text>
          <Text style={ActivitiesListStyles.description}>{item.description}</Text>
        </View>

        {/* Buttons at the bottom */}
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
        
        {/* Logo */}
        <View style = {{height:'25%', flexDirection: 'row', alignItems: 'center', marginBottom:5}}>
          <ImageBackground source={{ uri: imageRoute }}style={ActivitiesListStyles.imageBackground} >
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{
                width: 45,
                height: 45,
                borderRadius: 30,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop:40,
                marginLeft:10
              }}
            >
              <Text><Ionicons name="chevron-back-sharp" size={30} color="black" /></Text>
            </TouchableOpacity>
            <Text style ={ParentStyles.title}>{newCity}</Text>
            <Text style ={ParentStyles.subtitle}>{routePlan.day}</Text>  
          </ImageBackground>
        </View>

        {/* Scroll view of the list of activities for the specified day */}
        <ScrollView style={{flex:1, marginBottom:65}}>

          {/* List of activities, description and, maps and info buttons */}
          <View style={{alignItems:'center'}}>
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
  
const ActivitiesListStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: width * 0.90, // 90% of the device width
    height: height * 0.35,
    backgroundColor: '#EEF6FB',
    borderRadius: 30,
    overflow: 'hidden',
    margin: 10,
    justifyContent:'space-between',
  },
  imageBackground: {
    width: '100%',
    height: '100%', // Adjusted to 100% to fill the container
  },
  image: {
    width: '100%',
    height: '40%', // Adjusted to 100% to fill the container
  },
  textContainer: {
    justifyContent:'center',
    alignItems:'center',
    margin:10
     // Adjusted margin top for better spacing
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center'
  
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    textAlign:'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:16
  },
  button: {
    borderRadius:30,
    backgroundColor:'#23C2DF',
    width:'45%',
    height:35,
    margin:10,
    justifyContent:'center',
    alignItems:'center'
  }

});