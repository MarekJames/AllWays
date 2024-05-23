/*

Search.js 
  
  -> File called when the user selects "Travel Plans" in the OptionsScreen of the App.js file
  -> Allows the user to select the amount of days he/she intends to travel and the intended destination
  -> Returns a travel plan generated by the chat gpt api specific to the user input

*/




/******************** Imports Section ********************/

import { useFonts } from 'expo-font';
import "react-native-url-polyfill/auto";
import { Feather } from '@expo/vector-icons';
import { callAI } from '../../config/ai-config';
import { Calendar } from 'react-native-calendars';
import React, {useState, useCallback} from 'react';  
import * as SplashScreen from 'expo-splash-screen';
import { googleKey } from '../../config/keys-config';
import { generatePrompt } from '../../config/ai-config';
import { getImageUrl } from '../../config/images-config';
import { NetworkContext, showNetworkError } from '../../config/network-config';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Image, ActivityIndicator, StyleSheet, View, Text, Dimensions, TouchableOpacity, ImageBackground, Switch, Modal} from 'react-native'; 




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
    var listsPlan2 = [];                                                        // Contains the route plan after the AI is called
    const [isEnabled, setIsEnabled] = useState(false);                          // Flag for food search
    const [markedDates, setMarkedDates] = useState({});                         // Contains the dates 
    const [isValidInput, setValidInput] = useState('');                         // Contains the error message if a non valid city is selected
    const [selectedCity, setSelectedCity] = useState('');                       // Contains the value of the selected city                                                                                                                     // Contains all the countries received from the API
    const [isModalCity, setIsModalCity] = useState(false);                      // Flag to show/not show Modal to select city
    const [isModalDates, setIsModalDates] = useState(false);                    // Flag to show/not show Modal to select dates
    const [selectedEndDate, setSelectedEndDate] = useState('');                 // Contains the value of the end date
    const [selectedStartDate, setSelectedStartDate] = useState('');             // Contains the value of the start date
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const [fontsLoaded, fontError] = useFonts({
      'Poppins-Light': require('../../Fonts/Poppins-Light.ttf'),
      'Poppins-SemiBold': require('../../Fonts/Poppins-SemiBold.ttf'),
      'Poppins-Bold': require('../../Fonts/Poppins-Bold.ttf'),
      'Poppins-Medium': require('../../Fonts/Poppins-Medium.ttf'),
    });
    
    // Variables for control purposes
    const [loading, setLoading] = useState(false);                  // Controls if Search/Loading page is shown
    const [isResponse, setResponse] =useState(false);               // Controls which text appears in the loading page (waiting for Ai or loading images)
    
    // Handle fonts loaded
    const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    }, [fontsLoaded, fontError]);
  
    // Check fonts loaded
    if (!fontsLoaded && !fontError) {
      return null;
    }

    // Loops through the listsplan, calls the getImageUrl and navigates to the days list when finished
    async function createImagesUrls(navigation, city, isConnected) {
        
      try{
        
        // Get an image for the route
        await getImageUrl(listsPlan2, city, 10, 0, isConnected);

        // Remove Loading page
        setLoading(false);

        // Reset tab bar
        navigation.getParent().setOptions({tabBarStyle: { borderTopWidth: 2, borderTopColor:'#fff',position:'absolute', elevation:0, height:45}});
        
        var startDate = selectedStartDate.split('-');
        startDate = startDate[2] + '/' + startDate[1] + '/' + startDate[0];

        var endDate = selectedEndDate.split('-');
        endDate = endDate[2] + '/' + endDate[1] + '/' + endDate[0];
        
        // Navigate to days list
        navigation.navigate("Days", {
            endDate: endDate,
            savedRoutes: false,
            city: selectedCity,
            startDate: startDate,
            listsPlan : listsPlan2,
            imageRoute: listsPlan2.imageUrl
        }) 
      }
      catch(error){
        showNetworkError(navigation, 'Network');
      }
    }
    
    // Handles the next button on the right of city and number inputs
    const handleNext = async (isConnected) => {

      // Check network connection
      if( selectedStartDate != '' && selectedStartDate != '' & selectedEndDate != '' ){
    
        // Call AI
        try{
          
          // Show loading page
          setLoading(true); 
          
          // Remove nav bar
          this.props.navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});

          await getPlan(this.props.navigation, selectedCity, selectedStartDate, selectedEndDate, isConnected);
        }
        catch(e){
          setLoading(false);
          showNetworkError(this.props.navigation, e);
        }
      
      }
      else{
        setValidInput('Please select the city and the dates')
      }
    }

    // Handles clear button
    const handleClear = () => {
      setLoading(false);
      setValidInput('');
      setResponse(false);
      setMarkedDates({});
      setIsEnabled(false);
      setSelectedCity('');
      setSelectedEndDate('');
      setSelectedStartDate('');
    }

    // Handle toogle switch
    const toggleSwitch = () => {
      setIsEnabled(previousState => !previousState);
    }

    // Handles Calendar day press
    const onDayPress = (day) => {
      const date = day.dateString;
  
      if (!selectedStartDate || selectedEndDate || date < selectedStartDate) {
        setSelectedStartDate(date);
        setSelectedEndDate('');
        setMarkedDates({
          [date]: { startingDay: true, color: '#1FACC6', textColor: 'black', selected: true, dotColor: '#1FACC6' },
        });
      } else {
        const startDate = new Date(selectedStartDate);
        const endDate = new Date(date);
        const dayDifference = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  
        if (dayDifference <= 6) {
          setSelectedEndDate(date);
          const range = {
            [selectedStartDate]: { startingDay: true, color: '#1FACC6', textColor: 'black', selected: true, dotColor: '#1FACC6' },
            [date]: { endingDay: true, color: '#1FACC6', textColor: 'black', selected: true, dotColor: '#1FACC6' },
          };
  
          let nextDate = new Date(selectedStartDate);
          nextDate.setDate(nextDate.getDate() + 1);
          while (nextDate.toISOString().slice(0, 10) !== date) {
            range[nextDate.toISOString().slice(0, 10)] = {
              color: '#B6EBF4',
              textColor: 'black',
              selected: true,
              dotColor: 'rgba(31, 172, 198, 0.5)',
            };
            nextDate.setDate(nextDate.getDate() + 1);
          }
          setMarkedDates(range);
        } else {
          setSelectedStartDate(date);
          setSelectedEndDate('');
          setMarkedDates({
            [date]: { startingDay: true, color: '#1FACC6', textColor: 'black', selected: true, dotColor: '#1FACC6' },
          });
        }
      }
    };

    // Modal Select City
    ModalSelectCity = () => {
      return(
        <View style = {{flex:1}}>
          <View style = {{flexDirection:'row', justifyContent:'space-between', margin:20}}>
            <TouchableOpacity onPress={() => {setSelectedCity(''); setIsModalCity(false);}}>
              <Feather name="x" size={20} color="#979797"/>
            </TouchableOpacity>
            <Text style = {{fontFamily:'Poppins-Medium', fontSize:scale(17), textAlign:'center', color:'#000000'}}>Search city</Text>
            <TouchableOpacity  style = {{opacity:selectedCity == '' ? 0.5 : 1}} disabled={selectedCity == '' ? true : false} onPress={() => {setSelectedCity('')}}>
              <Text style = {{fontFamily:'Poppins-Medium', fontSize:scale(17), textAlign:'center', color:'#23C2DF'}}>Clear</Text>  
            </TouchableOpacity>
          </View>
          <View style = {{alignItems:'center', flex:1}}>
            <GooglePlacesAutocomplete
              placeholder = {selectedCity == '' ? "Search" : selectedCity}
              styles={{
                container: {
                  flex:1,
                  width: width*0.9,
                  height:'100%',
                },
                textInput: {
                  borderRadius:30,
                  color:'#1B115C',
                  textAlign: 'left',
                  fontSize:scale(15),
                  paddingLeft:scale(30),
                  height:verticalScale(50),
                  backgroundColor: '#F1F4FF',
                },
                separator: {
                  height:1,
                  backgroundColor: '#23C2DF',
                },
                row: {
                  flexDirection:'row',
                  height:verticalScale(44),
                  padding:moderateScale(13),
                  backgroundColor:'#F1F4FF',
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

            <TouchableOpacity style = {{width: width * 0.9, justifyContent:'center', borderRadius:30, height:verticalScale(56), backgroundColor: '#23C2DF', margin:moderateScale(20), opacity:selectedCity == '' ? 0.5 : 1}} disabled={selectedCity == '' ? true : false} onPress={() => {setIsModalCity(false)}}>
              <Text style = {{textAlign:'center', fontSize:scale(17), color:'#fff', fontFamily:'Poppins-Medium'}}>Done</Text>
            </TouchableOpacity> 
          </View>
        </View>
      )
    }

    // Modal Select Dates
    ModalSelectDates = () => {
      return(
        <View style = {{flex:1}}> 
          <View style = {{flexDirection:'row', justifyContent:'space-between', margin:moderateScale(20)}}>
            <TouchableOpacity onPress={() => {setSelectedStartDate(''); setSelectedEndDate(''); setMarkedDates({}); setIsModalDates(false);}}>
              <Feather name="x" size={20} color="#979797"/>
            </TouchableOpacity>
            <Text style = {{fontFamily:'Poppins-Medium', fontSize:17, textAlign:'center', color:'#000000'}}>Search date range</Text>
            <TouchableOpacity  style = {{opacity:selectedStartDate == '' ? 0.5 : 1}} disabled={selectedStartDate == '' ? true : false} onPress={() => {setSelectedStartDate(''); setSelectedEndDate(''); setMarkedDates({});}}>
              <Text style = {{fontFamily:'Poppins-Medium', fontSize:17, textAlign:'center', color:'#23C2DF'}}>Clear</Text>  
            </TouchableOpacity>
          </View>

          <View style = {{flexDirection:'row', justifyContent:'space-between', margin:moderateScale(20), alignItems:'center'}}>
            <Text style = {{width:width*0.4, fontFamily:'Poppins-Medium', fontSize:scale(17), textAlign:'center', color:'#949494', margin:moderateScale(5)}}>{selectedStartDate != '' ? formatDate(selectedStartDate) : 'Earliest outbound date'}</Text>
            <Feather style= {{alignSelf:'center'}} name="arrow-right" size={20} color="#1B115C"/>
            <Text style = {{textAlignVertical:'center', width:width*0.4, fontFamily:'Poppins-Medium', fontSize:scale(17), textAlign:'center', color:'#949494', margin:moderateScale(5)}}>{selectedEndDate != '' ? formatDate(selectedEndDate) : 'Latest return date'}</Text>
          </View>

          <View style = {{flex:1, marginTop:verticalScale(50)}}>
            <Calendar
              theme={{
                'stylesheet.calendar.header':{
                  header: {
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  paddingLeft: 10,
                  backgroundColor: 'rgba(35, 194, 223, 0.3)',
                },
                monthText: {
                  fontSize: 17,
                  color: '#1B115C',
                  fontFamily:'Poppins-Medium',
                  opacity:1
                },
                },
              }}
              onDayPress={onDayPress}
              markingType={'period'}
              markedDates={markedDates}
              initialDate={selectedStartDate}
              enableSwipeMonths={true}
              hideArrows={true}
              minDate={new Date(Date.now()).toISOString().split('T')[0].toString()}
            /> 
          </View>

          <TouchableOpacity style = {{width: width * 0.9, justifyContent:'center', borderRadius:30, height:verticalScale(56), backgroundColor: '#23C2DF', margin:moderateScale(20), opacity:selectedEndDate == '' ? 0.5 : 1 }} disabled={selectedEndDate == '' ? true : false} onPress={() => {setIsModalDates(false)}}>
              <Text style = {{textAlign:'center', fontSize:scale(17), color:'#fff', fontFamily:'Poppins-Medium'}}>Done</Text>
          </TouchableOpacity> 
        </View>
      )
    }

    // Format dates to Day Month Year
    function formatDate(date){
      
      date = date.split('-');

      var day = date[2];
      var year = date[0];
      var month = date[1];
      var formatedDate = day + " " + months[month-1] + " " + year;

      return formatedDate;
    }

    // Calls the AI 
    async function getPlan(navigation, cityName, startDate, endDate, isConnected) {
     
      const prompt = generatePrompt(cityName, startDate, endDate, isEnabled);
      
      try {
        
        // Call AI
        listsPlan2 = await callAI(prompt, isConnected);
     
        // Change Loading Page Message
        setResponse(true);

        // Load Images to Route
        await createImagesUrls(navigation, cityName, isConnected);

      }
      catch(e) {
        throw Error(e.message);
      } 
    }

    // Defines the screen components
    if(!loading){
      return (
        <NetworkContext.Consumer>
        {(value) => (
          <View style = {PlansScreenStyles.container} onLayout={onLayoutRootView}>

              {/* Modal Select City */}
              <Modal
                animationType="slide"
                visible={isModalCity}
                onRequestClose={() => setIsModalCity(false)}
              >
                <ModalSelectCity></ModalSelectCity>
              </Modal>

              {/* Modal Select Dates */}
              <Modal
                animationType="slide"
                visible={isModalDates}
                onRequestClose={() => setIsModalDates(false)}
              >
                <ModalSelectDates></ModalSelectDates>
              </Modal>
            
              {/* Search Screen */}
              <ImageBackground style={{flex:1, width:'100%', height:'100%', resizeMode:'contain',paddingTop:verticalScale(30)}} source = {require('../../Images/SearchBackground.jpg')}>

                <View style = {{ justifyContent:'center', alignItems:'center'}}>

                  <Image
                    source={require('../../Images/Logo.png')}
                    style = {LoadingScreenStyle.imageLogo}
                    resizeMode='contain'
                  />
              
                  <View style = {{alignSelf:'flex-start', justifyContent:'center', width:width*0.8, paddingLeft: width*0.075}}>
                  <Text style = {{fontSize:scale(42), fontFamily:'Poppins-SemiBold', color:'#fff' }}>Where and when to go?</Text>
                  </View>
                
                  {isValidInput != null && (
                    <Text style = {{paddingLeft:scale(30), fontSize:scale(15), color:'red'}}>{isValidInput}</Text>
                  )}

                    {/* Where ? Button */}
                    <TouchableOpacity style = {{width: width*0.85,justifyContent:'center', borderRadius:30, height:verticalScale(56), backgroundColor: '#F1F4FF', margin:moderateScale(5)}} onPress={() => {setIsModalCity(true)}}>
                      <View style = {{flexDirection:'row', alignItems:'center'}}>
                        <Feather name="map-pin" size={20} color="#1B115C" style = {{margin:moderateScale(15)}}/>
                        <View>
                          <Text style = {{color:'#1B115C', fontSize:scale(14), fontFamily:'Poppins-Medium'}}>Where</Text>
                          <Text style = {{color:'#585858', fontSize:scale(14), fontFamily:'Poppins-Medium'}}>{selectedCity == '' ? 'Select City' : selectedCity}</Text>
                        </View>
                      </View>
                    </TouchableOpacity> 
                  
                    {/* When ?  Button*/}
                    <TouchableOpacity style = {{width: width*0.85,justifyContent:'center', borderRadius:30, height:verticalScale(56), backgroundColor: '#F1F4FF', margin:moderateScale(5)}} onPress={() => {setIsModalDates(true)}}>
                      <View style = {{flexDirection:'row', alignItems:'center'}}>
                        <Feather name="calendar" size={20} color="#1B115C" style = {{margin:moderateScale(15)}}/>
                        <View>
                          <Text style = {{color:'#1B115C', fontSize:scale(14), fontFamily:'Poppins-Medium'}}>When</Text>
                          <Text style = {{color:'#585858', fontSize:scale(14), fontFamily:'Poppins-Medium'}}>{selectedEndDate != '' ? formatDate(selectedStartDate) + ' - ' + formatDate(selectedEndDate) : 'Select Dates'}</Text>
                        </View>
                      </View>
                    </TouchableOpacity> 
                    
                    <View style = {{flexDirection:'row', justifyContent:'left', width:width, paddingLeft: width*0.075}}>
                      <Switch
                        trackColor={{false: '#767577', true: '#FFFFFF'}}
                        thumbColor={isEnabled ? '#23C2DF' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                      />
                      <Text style = {{textAlignVertical:'center', fontFamily:'Poppins-SemiBold', fontSize:scale(16), color:'#fff'}}>Include food sugestions</Text>
                    </View>

                    <TouchableOpacity onPress={() => {handleNext(value)}} style = {{width: width*0.85,justifyContent:'center', borderRadius:30, height:verticalScale(56), backgroundColor: '#23C2DF', margin:moderateScale(5)}}>
                      <Text style = {{textAlign:'center', fontSize:scale(24), color:'#fff', fontFamily:'Poppins-Medium'}}>Go</Text>
                    </TouchableOpacity> 

                    <TouchableOpacity style = {{margin:moderateScale(20)}} onPress={() => {handleClear()}}>
                      <Text style = {{fontFamily:'Poppins-Medium', fontSize:scale(16), textAlign:'center', color:'#fff'}}>Clear Search</Text>
                    </TouchableOpacity>
                </View>
              </ImageBackground>
          </View>
        )}
        </NetworkContext.Consumer>
      );
    } 
    else{
      return ( 
        <ImageBackground source = {require('../../Images/BackgroundLoading.jpg')} style= {{justifyContent:'center', alignItems:'center',  width:'100%', height:'100%', resizeMode:'contain'}}>
          
          {/* Show Logo */}
          <Image
            source={require('../../Images/Logo.png')}
            style = {LoadingScreenStyle.imageLogo}
            resizeMode='contain'
          />

          {/* Title and subtitle - Waiting for ChatGPT */}
          {!isResponse && <Text style = {LoadingScreenStyle.titleText}> Generating your response</Text>}

          {!isResponse && <Text style = {LoadingScreenStyle.subtitleText}> Wait a moment</Text>}

          {/* Title and subtitle - Waiting for Images */}
          {isResponse && <Text style = {LoadingScreenStyle.titleText}> AI response generated</Text>}

          {isResponse && <Text style = {LoadingScreenStyle.subtitleText}>Loading images...</Text>}
          
          {/* Loading indicator */}
          <ActivityIndicator size="large" style={{margin:moderateScale(20)}}/>
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
    flex:1,
    alignItems: 'center',
  },
  imageLogo: {
    width:'80%',
    resizeMode:'contain',
    height:verticalScale(250),
    margin:moderateScale(10),
  },
});

// Used for the LoadingScreen class
const LoadingScreenStyle = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    backgroundColor:'#000',
    justifyContent:'center',
  },
  imageLogo:{
    top:'-5%',
    width:'50%',
    height:'30%',
  },
  titleText:{
    color:'#fff',
    fontSize:scale(20),
    fontFamily:'Poppins-Bold',
  },
  subtitleText:{
    color:'#fff',
    fontSize:scale(15),
    fontFamily:'Poppins-Medium'
  },
})

