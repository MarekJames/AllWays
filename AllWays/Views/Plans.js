/*

Plans.js 
  
  -> File called when the user selects "Travel Plans" in the OptionsScreen of the App.js file
  -> Allows the user to select the amount of days he/she intends to travel and the intended destination
  -> Returns a travel plan generated by the chat gpt api specific to the user input

*/




/******************** Imports Section ********************/ 

// Imports for the react components add buttons, images, text, etc
import React, {useState, useEffect, useRef} from 'react';  
import { FlatList, Image, ActivityIndicator, StyleSheet, View, Text, Dimensions, inputRef, TextInput, TouchableOpacity, ScrollView, Linking, ImageBackground} from 'react-native'; 
import axios from 'axios';
import {Animated} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import "react-native-url-polyfill/auto"
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { apiKey, googleKey, customSearchKey, searchEngineId} from '../config/keys-config'
import { listsPlan, savedRoutes, routeNewYork, routeParis } from '../testVariables';
import { generatePrompt } from '../prompt';
import {insertRoute, getRoutes, deleteRoute, updateSavedRoutes} from '../config/firebase-config'



/******************* Global Variables ********************/

const width = Dimensions.get('window').width   // Get width of the user screen
const height = Dimensions.get('window').height // Get height of the user screen




/*********************** Classes *************************/

/*

  PlansScreen class
  Displayed after selecting Travel Plans in the OptionsScreen of the App.js file
  Allows the user to choose the amount of days he/she intends to travel and the desired destination

*/

export class PlansScreen extends React.Component {  
    
  // pontosScreen Function that configs what is displayed in this class
  pontosScreen = () => {
    
    // Variables for storing purposes
    const [selectedCity, setSelectedCity] = useState(null);         // Contains the value of the selected city                                                                                                                     // Contains all the countries received from the API
    const [selectedNumber, setSelectedNumber] = useState('');       // Contains the value of the selected days
    const [isValidInput, setValidInput] = useState('');               // Contains the error message if a non valid city is selected
    var listsPlan2;                                                 // Contains the route plan after the AI is called

    // Variables for control purposes
    const [loading, setLoading] = useState(false);                  // Controls if Search/Loading page is shown
    const [isNext, setNext] = useState(false);                      // Controls if City/Number of days input is shown
    const [isResponse, setReponse] =useState(false);                // Controls which text appears in the loading page (waiting for Ai or loading images)
    
    // Variables for animation purposes
    const translation = useRef(new Animated.Value(0)).current;
    const fadeWhere = useRef(new Animated.Value(1)).current;
    const fadeHow = useRef(new Animated.Value(0)).current;

    //_____ Functions related to the images API ____//

    // Calls the API with a parameter query and updates the listsplan
    const getImageUrl = async (query,index) => {
      // Call the google search engine here
      const url = `https://www.googleapis.com/customsearch/v1?key=${customSearchKey}&cx=${searchEngineId}&q=${query}&searchType=image&num=1&fileType=jpg`;

      await axios.get(url)
      .then((response) => {
        const image = response.data.items[0];
        return image;
      })
      .then((image) => {
        const imageUrl = image.link;
        listsPlan2[index].activities[0].imageUrl = imageUrl;
        listsPlan2[index].imageUrl = imageUrl;
      })
      
    }

    // Loops through the listsplan, calls the getImageUrl and navigates to the days list when finished
    const createImagesUrls = async (navigation, city) => {
      //Loop through the activities and put the url in the listsPlan object
      var counter = 0;
      //Loop through the activities and put the url in the listsPlan object
      listsPlan2.forEach(async (item, index) => {
        await getImageUrl(item.activities[0].name + ',' + city,index);
      
        //Need a counter because the loop indexes can terminate randomly like ( index 4 returns the image first, then the index 2, etc)
        counter++;
        if(counter == listsPlan2.length){
          //Reset animations for when the search screen is called again
          translation.setValue(0);
          fadeHow.setValue(0);
          fadeWhere.setValue(1);
 
          setLoading(false);
          this.props.navigation.getParent().setOptions({tabBarStyle: { borderTopWidth: 2, borderTopColor:'#fff',position:'absolute', elevation:0, height:55}});
          navigation.navigate("Days", {
            savedRoutes: false,
            listsPlan : listsPlan2,
            city: selectedCity,
            days: selectedNumber
          }) 
        }
      });
    }

    //_____ Functions related to the animations ____//

    // Slides the where text to the right and changes opacity
    const animationWhereText = () => {

      Animated.parallel([
        Animated.timing(translation, {
          toValue: width,
          duration: 500,
          useNativeDriver:true
    
        }),
        Animated.timing(fadeWhere, {
          toValue: 0,
          duration: 500,
          useNativeDriver:true
        })
      ]).start(({finished}) => {
        if(finished) {
          setNext(true); 
          fadeInHow();}
      });;   
    };

    // Fades in the how text
    const fadeInHow = () => {

      Animated.timing(fadeHow, {
        toValue: 1,
        duration: 500,
        useNativeDriver:true
      }).start();
    };

    // Fades out the how text
    const fadeOutHow = () => {

      Animated.timing(fadeHow, {
        toValue: 0,
        duration: 500,
        useNativeDriver:true
      }).start(({finished}) => {
        if(finished) {setNext(false); translation.setValue(0); fadeInWhere();}
      });
    };

    // Fades in the where text
    const fadeInWhere = () => {

      Animated.timing(fadeWhere, {
        toValue: 1,
        duration: 500,
        useNativeDriver:true
      }).start();

    };

    //_____ Functions related to the button handlers ____//

    // Handles the next button on the right of city and number inputs
    const handleNext = async () => {
      
      if(isNext){
        if( selectedNumber != null && Number.isInteger(parseInt(selectedNumber)) && selectedNumber % 1 == 0 && parseInt(selectedNumber) >= 1 && parseInt(selectedNumber) <= 10 ){
          setValidInput('')
          setLoading(true); 
          this.props.navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
          getPlan(this.props.navigation, selectedCity, selectedNumber);
          setNext(false);
          setValidInput(null);
          setSelectedCity(null);
        }
        else{
          setValidInput('Please select a valid number (1 to 10)')
        }
      }
      else{
        if(selectedCity != null && isValidInput != null){
          setValidInput('');
          animationWhereText();
        }
        else{
          setValidInput('Please select a valid city')
        }
      }
    }

    const handleBack = () => {
      setSelectedCity(null);
      setSelectedNumber(null);
      setValidInput(null);
      fadeOutHow();
    }

    //_____ Functions related to the AI ____//

    // Calls the AI 
    async function getPlan(navigation, cityName, daysNumber) {
     
      const prompt = generatePrompt(daysNumber, cityName);

      try {
        const result = await axios.post(
          'https://api.openai.com/v1/completions',
          {
            prompt: prompt,
            max_tokens: 2048,
            model: "gpt-3.5-turbo-instruct"
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
          },
        )
        setReponse(true);
        listsPlan2 = JSON.parse(result.data.choices[0].text);
        createImagesUrls(navigation, cityName);

      } catch (error) {
        console.error('Error fetching AI response:', error);
        setLoading(false);
        alert('There was an error with the AI response. \nPlease try again.')
      } 
    }

    // Defines the screen components
    if(!loading){
      
      return (
        <View style = {PlansScreenStyles.container}>
          <ImageBackground style={{flex:1, width:'100%', height:'100%'}} source = {require('../Images/SearchBackground.png')}>

              {/* <View style = {{flex:1, width:'100%', justifyContent:'center', alignItems:'center'}}>
                <Image  style = {PlansScreenStyles.imageLogo} source = {require('../Images/Logo.png')}/>
              </View> */}

              {isNext && 
                <View style = {{flex:1, justifyContent:'flex-start', marginTop:30, paddingLeft:15}}>
                  <TouchableOpacity onPress={handleBack}>
                    <Ionicons name="arrow-back-circle-outline" size={50} color="#23C2DF" />
                  </TouchableOpacity>
                </View>
              }

            <View style = {{ flex:1, justifyContent:'flex-end'}}>
              <View style = {{alignSelf:'flex-start', justifyContent:'center', width:'80%', paddingLeft:20}}>
                <Text style = {{fontSize:20, color:'#fff', fontWeight:'200'}}>Welcome to AllWays</Text>
                {!isNext && <Animated.Text style = {{fontSize:42, fontWeight:'600', color:'#fff',transform:[{translateX:translation }], opacity: fadeWhere }}>Where do you want to go?</Animated.Text>}
                {isNext && <Animated.Text style = {{fontSize:42, fontWeight:'600', color:'#fff', opacity: fadeHow}}>How many days of exploration?</Animated.Text>}
              </View>
            
            {isValidInput != null && (
              <Text style = {{paddingLeft:30, fontSize:15, color:'red'}}>{isValidInput}</Text>
            )}

            <View style = {{ flexDirection:'row', justifyContent:'space-between', margin:20, marginBottom:100}}>
              {/* Country Dropdown */}
              
              {/* <View style = {{width:'80%', height:'100', marginRight:10}}> */}
              {!isNext && ( 
                
                <GooglePlacesAutocomplete
                  placeholder = "City"
                  styles={{
                    container: {
                      flex:1,
                      width: '100%',
                      height:'100%',

                    },
                    textInput: {
                      textAlign: 'left',
                      paddingLeft:30,
                      height: 50,
                      borderRadius: 30,
                      fontSize: 15,
                      backgroundColor: '#F1F4FF',
                    },
                    separator: {
                      height: 1,
                      backgroundColor: '#23C2DF',
                    },
                    row: {
                      backgroundColor: '#F1F4FF',
                      padding: 13,
                      height: 44,
                      flexDirection: 'row',
                    },
                  }}
                  enablePoweredByContainer = {false}
                  minLength={2}
                  debounce={500}
                  onPress={ (data) => {setSelectedCity(data.description)}}
                  query={{ key: googleKey, language: 'en', types : '(cities)'}}
                  onFail={(error) => console.error(error)}
                  onNotFound={() => console.log('no results')}
                />

              )}

              {/*  </View> */}

              {/* <View style = {{width:'80%', height:'100', marginRight:10}}> */}
              
              {isNext && ( 

                <TouchableOpacity style = {{width:'87%',justifyContent:'center', borderRadius:30, height:50, backgroundColor: '#F1F4FF'}}>
                    <TextInput
                      style = {{textAlign:'left', fontSize:15, paddingLeft:30}}
                      onChangeText={setSelectedNumber}
                      value={selectedNumber}
                      placeholder="Number of days"
                    />
                </TouchableOpacity> 

              )}

              {/*  </View> */}

              {/* Route Up button */}
            
              <TouchableOpacity onPress={() => {handleNext()}}>
                <Ionicons name="arrow-forward-circle-outline" size={50} color="#23C2DF" />
              </TouchableOpacity>
          
            </View>
            </View>

          </ImageBackground>
        </View>
      );
    } 
    else{
      return ( 
        <View style = {LoadingScreenStyle.container}>  
          
          {/* Show Logo */}
          <Image
          source={require('../Images/Logo.png')}
          style = {LoadingScreenStyle.imageLogo}
          resizeMode='contain'
          />

          {/* Title and subtitle */}
          {!isResponse &&
            <Text style = {LoadingScreenStyle.titleText}> Generating your response</Text>
           
          }
          {!isResponse &&
            <Text style = {LoadingScreenStyle.subtitleText}> Wait a moment</Text>
          }

          {isResponse &&
            <Text style = {LoadingScreenStyle.titleText}> AI response generated</Text>
           
          }
          {isResponse &&
            <Text 
            style = {LoadingScreenStyle.subtitleText}>  
             Loading images...</Text>
          }
          
          <Text> {" "}</Text>

          {/* Loading indicator */}
          <ActivityIndicator size="large"/>
        </View>
      )
    }
  }

  // Renders the screen components defined in the pontosScreen function
  render() { 
   
    return (
      <this.pontosScreen></this.pontosScreen>
    ) 
  }
   
}

/*

  ActivitiesScreen class
  Displayed when the user selects a day from the route plan
  Shows the detailed route plan for the specific day

*/
export class ActivitiesScreen extends React.Component{

  activities = () => {

    const { route } = this.props;
    const { routePlan, city } = route.params;
  
    const [imagesLoaded, setImagesLoaded] = useState(false);
    
    const getImageUrl = async (query,index) => {
      // Call the google search engine here
      const url = `https://www.googleapis.com/customsearch/v1?key=${customSearchKey}&cx=${searchEngineId}&q=${query}&searchType=image&num=1&fileType=jpg`;

      await axios.get(url)
      .then((response) => {
        const image = response.data.items[0];
        return image;
      })
      .then((image) => {
        const imageUrl = image.link;
        routePlan.activities[index].imageUrl = imageUrl;
        //console.log(routePlan.activities[index].imageUrl);
      })
      
    }

    const createImagesUrls = async () => {
      var counter = 0;
      //Loop through the activities and put the url in the routePlan object
      await routePlan.activities.forEach(async (item, index) => {
        
        if(index != 0) await getImageUrl(item.name + ',' + city,index);
      
        //Need a counter because the loop indexes can terminate randomly like ( index 4 returns the image first, then the index 2, etc)
        counter++;
        if(counter == 5){setImagesLoaded(true);}
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
         
              <Text style={ActivitiesListStyles.buttonText}>+Info</Text>
         
          </TouchableOpacity>
        </View>

      </View>
    )) 
  } 

  render(){

    const { route } = this.props;
    const { routePlan, city, days } = route.params;
    // Define the image variable and the associated function
    
    return (
      <View style={ParentStyles.container}>
        
        {/* Logo */}
        <View style = {{flexDirection: 'row', alignItems: 'center', marginBottom:5}}>
          {/* Your Logo Component */}
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{
              width: 45,
              height: 45,
              borderRadius: 30,
              backgroundColor: 'lightgrey',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft:15
            }}
          >
            <Ionicons name="arrow-back-outline" size={30} color="black" />
          </TouchableOpacity>

          
          <View style={{ alignSelf: 'center'}}>
          <Image
          source={require('../Images/Logo.png')}
            style = {LoadingScreenStyle.imageLogo}
          />
          </View>

        </View>

        {/* Scroll view of the list of activities for the specified day */}
        <ScrollView style={{flex:1}}>

          {/* Title and description */}
          <Text style={ParentStyles.listTitle}> Discover {city} </Text>
          <Text style={ParentStyles.listSubtitle}> Here is the perfect route for {days} days </Text>

          {/* Specified Day */}
          <Text style={ParentStyles.dayText}> {routePlan.day} </Text>
          
          {/* List of activities, description and, maps and info buttons */}
          <View style={{alignItems:'center'}}>
            <this.activities/>
          </View>

        </ScrollView>
      
      </View>
    );
  }
}

/*

  DaysScreen class
  Displayed after CHATGPT response
  Shows the list of days

*/
export class DaysScreen extends React.Component {  
  
 
  // Function that displays the list of days
  lists = () => {
    
    const { route } = this.props;
    const { savedRoutes, listsPlan, city, days} = route.params;
   
    return listsPlan.map((item, index) => (
      <TouchableOpacity key={item.day} style = {DaysListStyles.dayContainer} onPress={() => {this.props.navigation.navigate('Activities', {savedRoutes: savedRoutes, routePlan:listsPlan[index], city: city, days:days})}}>
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
    const { savedRoutes, city, days, listsPlan } = route.params;
    
    // Const that gets the images for the specific activities
    // Also defines what is shown in the specific day route plan screen
   
    const HeartIcon = () => {
      const [isSaved, setIsSaved] = useState(false); // Initially, the content is not saved
      const [routeId, setRouteId] = useState('');

      const toggleSave = () => {
        if(!isSaved) insertRoute(listsPlan,city,days).then((id) => setRouteId(id));
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
          
          <ImageBackground source={{ uri: listsPlan[0].imageUrl }}style={DaysListStyles.imageBackground} >

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
                <Text><Ionicons name="arrow-back-outline" size={30} color="black" /></Text>
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
              <Text style ={ParentStyles.title}>{city}</Text>
              <Text style ={ParentStyles.subtitle}>{days} Days</Text>  
            </View>
           
          </ImageBackground>
          
        </View>

      
          {/* Scroll view with the list of days */}
        <ScrollView style={{flex:1}}>
            {/* Title and description */}
          <Text style={ParentStyles.listTitle}> Select a day to discover your journey</Text>
         
          <this.lists/>
        </ScrollView>

      </View>
    );
  }
}

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
    const userRoutes = updateSavedRoutes();
    //console.log(userRoutes._j)
  
    if(userRoutes.__j!=[]){
      //console.log(userRoutes);
      return userRoutes._j.map((item, index) => (   
      
        <TouchableOpacity style={SavedRoutesStyles.square} key={index} onLongPress = {() => {alert('Route Deleted'); deleteRoute(item.id)}} onPress={() =>  {
           this.props.navigation.navigate('Days', {savedRoutes: true, listsPlan: item.route, city: item.city, days: item.days})
          }}>

          <Image
            source={{ uri: item.route[0].imageUrl }}
            style={ActivitiesListStyles.image}
          />

          {/* Title and description */}
          <View style={SavedRoutesStyles.textContainer}>
            <Text style={SavedRoutesStyles.title}>{item.city}</Text>
            <Text style={SavedRoutesStyles.description}>{item.days} Days </Text>
          </View>
          
        </TouchableOpacity> 

      ))
    }
    else{
      return ( 
        <View style = {LoadingScreenStyle.container}>  

          {/* Title and subtitle */}
        
          <Text style = {LoadingScreenStyle.titleText}> Wait a moment</Text>
          
          <Text> {" "}</Text>

          {/* Loading indicator */}
          <ActivityIndicator size="large"/>
        </View>
      )
    }
  }

  render(){

    return (
      <View style={ParentStyles.container}>

        {/* Your Logo Component */}
        <View style={{ alignSelf: 'center'}}>
        
        <Image
          source={require('../Images/Logo.png')}
            style = {ParentStyles.imageLogo}
          />
        </View>
      
        {/* Scroll view of the list of activities for the specified day */}
        <ScrollView style={{flex:1}}>

          {/* Title and description */}
          <Text style={ParentStyles.listTitle}> Saved Routes </Text>
    
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

// Used for the PlansScreen class
const PlansScreenStyles = StyleSheet.create({
  container: {
  
    alignItems: 'center',
    flex:1
   
   
  },
  containerLogo: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  containerSelects: {
    alignItems: 'center',
    width: '100%',
  },
  containerRouteUp: {
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  imageLogo: {
    resizeMode:'contain',
    width:'80%',
    height:250,
    margin:10
  },
  whereToText: {
    fontSize: 36,
    color: '#000000',
    marginTop: 10,
  },
  wellGiveText: {
    fontSize: 18,
    color: '#000000',
    marginTop: 5,
  },
  dropdownContainer: {
  
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10,
  },
  dropdown: {
    borderWidth: 1,
    padding: 10,
    width: '40%',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  dropdownText: {
   
    fontSize: 16,
  },
  dropdownInput: {
    width:'100%',
    textAlign:'center',
    fontSize: 16,
  },
  dropdownList: {
    borderWidth: 1,
    width: '40%',
    maxHeight: 150,
    backgroundColor: '#DDD',
    borderRadius: 10,
  },
  dropdownItem: {
    fontSize:16,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  howManyDaysButton: {
    backgroundColor: '#DDD',
    borderRadius: 20,
    width: '80%',
    height: 50,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:2
  },
  howManyDaysDrop: {
    backgroundColor: '#DDD',
    borderRadius: 20,
    height: 150,
    width: '80%',
  },
  routeUpButton: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#000000',
    borderRadius:30,
    width:'80%',
    height:50,
    margin:20,
  },
  routeUpText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  
});

// Used for the LoadingScreen class
const LoadingScreenStyle = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#000'
  },
  imageLogo:{
    top:'-5%',
    width:'50%',
    height:'30%',
  },
  titleText:{
    fontSize: 20,
    color:'#fff'
  
  },
  subtitleText:{
    fontSize: 15,
    color:'#fff'
  
  },
})

// The 3 styles below are used for the DaysScreen class
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
    fontSize:40,
    color:'#fff'
  },
  subtitle:{
    marginLeft:10,
    fontWeight:'500',
    fontSize:20,
    color:'#fff'
  }
});

const DaysListStyles = StyleSheet.create({
  dayContainer: {
      width: width * 0.9, // 90% of the device width
      height: height * 0.12,
      backgroundColor: 'lightgrey',
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
    color:'#000',
    paddingLeft:20,
    paddingBottom:10

  },

})

const ActivitiesListStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: width * 0.9, // 90% of the device width
    height: height * 0.4,
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
    height: '50%', // Adjusted to 100% to fill the container
  },
  textContainer: {
    padding: 10,
    marginTop: 10, // Adjusted margin top for better spacing
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  gradient: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal:50,
  },
});

const SavedRoutesStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  textContainer: {
    marginTop: 10, // Adjusted margin top for better spacing
    alignItems:'center'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
    
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
  },
  gradient: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal:50,
  },
});