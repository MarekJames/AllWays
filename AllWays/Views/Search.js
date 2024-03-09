/*

Search.js 
  
  -> File called when the user selects "Travel Plans" in the OptionsScreen of the App.js file
  -> Allows the user to select the amount of days he/she intends to travel and the intended destination
  -> Returns a travel plan generated by the chat gpt api specific to the user input

*/




/******************** Imports Section ********************/ 

// Imports for the react components add buttons, images, text, etc
import React, {useState, useRef} from 'react';  
import {Image, ActivityIndicator, StyleSheet, View, Text, Dimensions, TextInput, TouchableOpacity, ImageBackground} from 'react-native'; 
import axios from 'axios';
import {Animated} from 'react-native';

import "react-native-url-polyfill/auto"
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { apiKey, googleKey, customSearchKey, searchEngineId} from '../config/keys-config'
import { listsPlan, savedRoutes, routeNewYork, routeParis } from '../testVariables';
import { generatePrompt } from '../prompt';



/******************* Global Variables ********************/

const width = Dimensions.get('window').width   // Get width of the user screen
const height = Dimensions.get('window').height // Get height of the user screen




/*********************** Classes *************************/

/*

  PlansScreen class
  Displayed after selecting Travel Plans in the OptionsScreen of the App.js file
  Allows the user to choose the amount of days he/she intends to travel and the desired destination

*/

export class SearchScreen extends React.Component {  
    
  // pontosScreen Function that configs what is displayed in this class
  pontosScreen = () => {
    
    // Variables for storing purposes
    const [selectedCity, setSelectedCity] = useState(null);         // Contains the value of the selected city                                                                                                                     // Contains all the countries received from the API
    const [selectedNumber, setSelectedNumber] = useState('');       // Contains the value of the selected days
    const [isValidInput, setValidInput] = useState('');             // Contains the error message if a non valid city is selected
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
          listsPlan2[index].activities[0].imageUrl = imageUrl;
          listsPlan2[index].imageUrl = imageUrl;
          console.log(imageUrl);
        }) 
      }catch(e){
        console.log("Error getting image" + e.response.data)

        // Only try three times, to not get an infinite loop
        if(counter < 3) await getImageUrl(query, index, counter + 1);
      }  
    }

    const getImageUrlOne = async (query, counter) => {
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
          listsPlan2.imageUrl = imageUrl;
        
        })
      }catch(e){
        console.log("Error getting image");

        //Try to get the image 3 times
        if(counter < 3){
          await getImageUrlOne(query, counter + 1)
        }

      }   
    }

    // Loops through the listsplan, calls the getImageUrl and navigates to the days list when finished
    const createImagesUrls = async (navigation, city) => {
      //Loop through the activities and put the url in the listsPlan object
      var counter = 0;
      //Loop through the activities and put the url in the listsPlan object
      listsPlan2.forEach(async (item, index) => {
        await getImageUrl(item.activities[0].name + ',' + city,index,0);
        
        //Need a counter because the loop indexes can terminate randomly like ( index 4 returns the image first, then the index 2, etc)
        counter++;
        if(counter == listsPlan2.length){

          // Get an image for the route
          await getImageUrlOne(city,0);

          //Reset animations for when the search screen is called again
          translation.setValue(0);
          fadeHow.setValue(0);
          fadeWhere.setValue(1);
          
          console.log(listsPlan2[0]);
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
              Authorization: `Bearer ${apiKey}`
            },
          },
        )
        setReponse(true);
        listsPlan2 = JSON.parse(result.data.choices[0].text);
        
        createImagesUrls(navigation, cityName);

      } catch (error) {
        console.error('Error fetching AI response:', error);

        //Reset animations for when the search screen is called again
        translation.setValue(0);
        fadeHow.setValue(0);
        fadeWhere.setValue(1);
        setSelectedCity('');
        setSelectedNumber('');
        setLoading(false);

        alert('There was an error with the AI response. \nPlease try again.')
      } 
    }

    // Defines the screen components
    if(!loading){
      
      return (
        <View style = {PlansScreenStyles.container}>
          <ImageBackground style={{flex:1, width:'100%', height:'100%', resizeMode:'contain',paddingTop:30}} source = {require('../Images/SearchBackground.png')}>

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

            <View style = {{ flexDirection:'row', justifyContent:'space-between', margin:20, marginBottom:80}}>
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
       
        <ImageBackground source = {require('../Images/BackgroundHome.png')} style= {{justifyContent:'center', alignItems:'center',  width:'100%', height:'100%', resizeMode:'contain'}}>
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
        </ImageBackground>
       
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

