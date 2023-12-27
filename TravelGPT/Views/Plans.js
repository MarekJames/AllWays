/*

Plans.js 
  
  -> File called when the user selects "Travel Plans" in the OptionsScreen of the App.js file
  -> Allows the user to select the amount of days he/she intends to travel and the intended destination
  -> Returns a travel plan generated by the chat gpt api specific to the user input

*/




/******************** Imports Section ********************/ 

// Imports for the react components add buttons, images, text, etc
import React, {useState, useEffect} from 'react';  
import { FlatList, Image, ActivityIndicator, StyleSheet, View, Text,  TextInput, Dimensions, TouchableOpacity, ScrollView, BackHandler, Alert, Linking} from 'react-native';  
import "react-native-url-polyfill/auto"
import axios from 'axios';
import * as Font from 'expo-font';
import { Configuration, OpenAIApi } from 'openai'
import SVGLogo from '../Images/RouteMasterLogo.svg'
import { LinearGradient } from 'expo-linear-gradient';

/******************* Global Variables ********************/

var days;                                       // Stores the number of days the user intends to travel
var city;                                       // Stores the city the user intends to travel to  
var country;                                    // Stores the country the user intends to travel to
var listsPlan;                                  // Stores the plan received from the chatgpt api

const width = Dimensions.get('window').width;   // Get width of the user screen
const height = Dimensions.get('window').height; // Get height of the user screen


listsPlan = [
  {"day": "Day 1", 
   "activities" : [{"name": "Visit the Colosseum",
                    "description": "Walk through the colosseum....."},

                    {"name": "Visit the Roman Forum",
                    "description": "Walk through the forum....."},

                    {"name": "Palatine Hill",
                    "description": " Suck my balls in palatine hill"},

                    {"name": "Jao is Gay",
                    "description": "Finger Jao"},

                    {"name": "Jao takes it up the bum",
                    "description": "A lot"}
                    ]},
    {"day": "Day 2", 
    "activities" : [{"name": "Eat at Pizzaria",
                      "description": "Eat at the pizzaria near the colisseum"},

                      {"name": "Visit the river near the...",
                      "description": "Desc for act 2"},

                      {"name": "Palatine Hill",
                      "description": " Suck my balls in palatine hill"},

                      {"name": "aaaaa",
                      "description": "bbbbbbbbb"},

                      {"name": "llllllllll",
                      "description": "oooooooo"}
                      ]},
   {"day": "Day 3",
   "activities" : [{"name": "Visit the Colosseum",
                    "description": "Walk through the colosseum....."},

                    {"name": "Visit the Roman Forum",
                    "description": "Walk through the forum....."},

                    {"name": "Palatine Hill",
                    "description": " Suck my balls in palatine hill"},

                    {"name": "Jao is Gay",
                    "description": "Finger Jao"},

                    {"name": "Jao takes it up the bum",
                    "description": "Sometimes"}
                    ]
    },
    {"day": "Day 4",
    "activities" : [{"name": "Visit the Colosseum",
                     "description": "Walk through the colosseum....."},
 
                     {"name": "Visit the Roman Forum",
                     "description": "Walk through the forum....."},
 
                     {"name": "Palatine Hill",
                     "description": " Suck my balls in palatine hill"},
 
                     {"name": "Jao is Gay",
                     "description": "Finger Jao"},
 
                     {"name": "Jao takes it up the bum",
                     "description": "Sometimes"}
                     ]
     },
     {"day": "Day 5",
     "activities" : [{"name": "Visit the Colosseum",
                      "description": "Walk through the colosseum....."},
  
                      {"name": "Visit the Roman Forum",
                      "description": "Walk through the forum....."},
  
                      {"name": "Palatine Hill",
                      "description": " Suck my balls in palatine hill"},
  
                      {"name": "Jao is Gay",
                      "description": "Finger Jao"},
  
                      {"name": "Jao takes it up the bum",
                      "description": "Sometimes"}
                      ]
      },
      {"day": "Day 6",
      "activities" : [{"name": "Visit the Colosseum",
                       "description": "Walk through the colosseum....."},
   
                       {"name": "Visit the Roman Forum",
                       "description": "Walk through the forum....."},
   
                       {"name": "Palatine Hill",
                       "description": " Suck my balls in palatine hill"},
   
                       {"name": "Jao is Gay",
                       "description": "Finger Jao"},
   
                       {"name": "Jao takes it up the bum",
                       "description": "Sometimes"}
                       ]
       },
       {"day": "Day 7",
       "activities" : [{"name": "Visit the Colosseum",
                        "description": "Walk through the colosseum....."},
    
                        {"name": "Visit the Roman Forum",
                        "description": "Walk through the forum....."},
    
                        {"name": "Palatine Hill",
                        "description": " Suck my balls in palatine hill"},
    
                        {"name": "Jao is Gay",
                        "description": "Finger Jao"},
    
                        {"name": "Jao takes it up the bum",
                        "description": "Sometimes"}
                        ]
        },
        {"day": "Day 8",
        "activities" : [{"name": "Visit the Colosseum",
                         "description": "Walk through the colosseum....."},
     
                         {"name": "Visit the Roman Forum",
                         "description": "Walk through the forum....."},
     
                         {"name": "Palatine Hill",
                         "description": " Suck my balls in palatine hill"},
     
                         {"name": "Jao is Gay",
                         "description": "Finger Jao"},
     
                         {"name": "Jao takes it up the bum",
                         "description": "Sometimes"}
                         ]
         },
         {"day": "Day 9",
         "activities" : [{"name": "Visit the Colosseum",
                          "description": "Walk through the colosseum....."},
      
                          {"name": "Visit the Roman Forum",
                          "description": "Walk through the forum....."},
      
                          {"name": "Palatine Hill",
                          "description": " Suck my balls in palatine hill"},
      
                          {"name": "Jao is Gay",
                          "description": "Finger Jao"},
      
                          {"name": "Jao takes it up the bum",
                          "description": "Sometimes"}
                          ]
          }
]  // Test route plan

var routePlan = []  // Stores the specific day to show the route plan

// Configs the apiKey -> We may need to encrypt this key
const config = new Configuration({
  apiKey: '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'
})

// Configs the openai api
const openai = new OpenAIApi(config)

// Access key to the images API
const accessKey = 'Q37z9gm8MYXdVPEDA6MFPe77A9jHWLdM9pLtqr060Xo'




/*********************** Classes *************************/

/*

  PlansScreen class
  Displayed after selecting Travel Plans in the OptionsScreen of the App.js file
  Allows the user to choose the amount of days he/she intends to travel and the desired destination

*/

export class PlansScreen extends React.Component {  
    
    // Constructor
    constructor(props) {
      super(props);
      this.state = {
          fontsLoaded: false
      }
    }

    // Load text fonts function
    async loadFonts() {
      await Font.loadAsync({
        'Sansation': require('../assets/fonts/Sansation_Regular.ttf'),
        'SansationBold': require('../assets/fonts/Sansation_Bold.ttf'),
      });
      this.setState({ fontsLoaded: true });
    }

    // Call load fonts function after component mounted
    componentDidMount() {
      this.loadFonts();
    }

    // pontosScreen Function that configs what is displayed in this class
    pontosScreen = () => {
     
  
      const [isOpenCountry, setIsOpenCountry] = useState(false);                                                      // Control if Country dropdown was selected
      const [selectedCountry, setSelectedCountry] = useState(null);                                                   // Contains the value of the chosen country
      const [selectedCity, setSelectedCity] = useState(null);                                                         // Contains the value of the chosen city
      const [countries, setCountries] = useState([]);                                                                 // Contains all the countries received from the API
      const [isOpen, setIsOpen] = useState(false);                                                                    // Controls if Days dropdown was selected
      const [selectedNumber, setSelectedNumber] = useState(null);                                                     // Contains the value of the selected days
      const numbers = Array.from({ length: 10 }, (_, index) => ({ label: `${index + 1}`, value: `${index + 1}` }));   // List from 1 to 10 to allow the user to choose
     
      // Handles what happens when Select Country is pressed
      const handleCountrySelect = (item) => {
        setSelectedCountry(item);
        setSelectedCity(null); // Reset city selection when country changes
        setIsOpenCountry(false);
      };

      // Handles what happens when Select City is pressed
      const handleCitySelect = (item) => {
        setSelectedCity(item);
      };

      // Handles what happens when Number of Days is pressed
      const handleSelect = (item) => {
        setSelectedNumber(item.value);
        setIsOpen(false);
      };

      // Gets all countries from the API
      const getCountriesURL = async () => {
        try {
          const response = await fetch('https://restcountries.com/v3.1/all');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          
          const countries = data.map((country) => ({
            countryId: country.cca3, // Using 'cca3' as the country ID, you can use other fields as needed
            countryName: country.name.common,
          }));

          //console.log(countries); // Display the extracted city IDs and names
          // Sort countries alphabetically by countryName
          const sortedCountries = countries.sort((a, b) =>
            a.countryName.localeCompare(b.countryName)
          );
          setCountries(sortedCountries);

        } catch (error) {
          console.error('Error fetching countries:', error);
        }
      };
      
      // Calls the GetCountriesUrl when screen is loaded
      useEffect(() => {
        getCountriesURL();
      }, []);

      // Defines the screen components
      return (
        <View style={PlansScreenStyles.container}>

          {/* Logo and Title */}
          <View style={PlansScreenStyles.containerLogo}>
            {/* Your Logo Component */}
            <SVGLogo style={PlansScreenStyles.imageLogo} />
            {/* Title and subtitle */}
            <Text style={PlansScreenStyles.whereToText}>Where to?</Text>
            <Text style={PlansScreenStyles.wellGiveText}>We'll give you the route for it</Text>
          </View>
    
          {/* Country Dropdown */}
          <View style={PlansScreenStyles.dropdownContainer}>
            <TouchableOpacity onPress={() => setIsOpenCountry(!isOpenCountry)} style={PlansScreenStyles.howManyDaysButton}>
              <Text style={PlansScreenStyles.dropdownText}>{selectedCountry ? selectedCountry : 'Select Country'}</Text>
            </TouchableOpacity>
            {isOpenCountry && (
              <View style={PlansScreenStyles.dropdownList}>
                <FlatList
                  data={countries}
                  keyExtractor={(item) => item.countryId}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleCountrySelect(item.countryName)} style={PlansScreenStyles.dropdownItem}>
                      <Text>{item.countryName}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
    
          {/* City Dropdown */}
          {selectedCountry && (
            <View style={PlansScreenStyles.dropdownContainer}>
              <TouchableOpacity style={PlansScreenStyles.howManyDaysButton}>
                <TextInput 
                  style={PlansScreenStyles.dropdownInput}
                  placeholder = {selectedCity || 'Select City'}
                  value = {selectedCity}
                  onChangeText={handleCitySelect}
                  placeholderTextColor={'#000'}
                />
              </TouchableOpacity>
            </View>
          )}
    
          {/* Number of Days Dropdown */}
          <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={PlansScreenStyles.howManyDaysButton}>
            <Text style={PlansScreenStyles.dropdownText}>{selectedNumber || 'Number of days'}</Text>
          </TouchableOpacity>
          {isOpen && (
            <View style={PlansScreenStyles.howManyDaysDrop}>
              <FlatList
                data={numbers}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelect(item)} style={PlansScreenStyles.dropdownItem}>
                    <Text>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
    
          {/* Route Up button */}
          <View style={PlansScreenStyles.dropdownContainer}>
            <TouchableOpacity style={PlansScreenStyles.routeUpButton} onPress={() => { getPlan(this.props.navigation, selectedCity, selectedCountry, selectedNumber) }}>
              <LinearGradient
                colors={['#0038F5', '#9F03FF']} // Replace with your gradient colors
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={PlansScreenStyles.gradient}
              >
                <Text style={PlansScreenStyles.routeUpText}>Route!</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

        </View> 
      ); 
    }

    // Renders the screen components defined in the pontosScreen function
    render() {  
      return (
        <this.pontosScreen></this.pontosScreen>
      )    
    }
     
}

/*

  LoadingScreen class
  Used when waiting for the AI response

*/
export class LoadingScreen extends React.Component{
  
  // Renders the loading screen
  render(){
    return (
      <View style = {LoadingScreenStyle.container}>  
        
        {/* Show Logo */}
        <SVGLogo
          style = {LoadingScreenStyle.imageLogo}
        />

        {/* Title and subtitle */}
        <Text style = {LoadingScreenStyle.titleText}> Generating your response</Text>
        <Text style = {LoadingScreenStyle.subtitleText}> Wait a moment</Text>
        
        <Text> {" "}</Text>

        {/* Loading indicator */}
        <ActivityIndicator size="large"/>

      </View>
    )
  }
}

/*

  DaysScreen class
  Displayed when the user selects a day from the route plan
  Shows the detailed route plan for the specific day

*/
export class DaysScreen extends React.Component {  
  
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      showDayRoutePlan: false
    };
  }
  
  // Load text fonts function
  async loadFonts() {
    await Font.loadAsync({
      'Sansation': require('../assets/fonts/Sansation_Regular.ttf'),
      'SansationBold': require('../assets/fonts/Sansation_Bold.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  // Call load fonts function after component mounted
  componentDidMount() {
    this.loadFonts();
  }

  // Function that displays the list of days
  lists = () => {
    // Only show after the fonts are loaded
    if (this.state.fontsLoaded) {
      return listsPlan.map((item, index) => (
        <TouchableOpacity key={item.day} style = {DaysListStyles.dayContainer} onPress={() => {routePlan= listsPlan[index]; this.setState({ showDayRoutePlan: true })}}>
          <LinearGradient
              colors={['#0038F5', '#9F03FF']} // Replace with your gradient colors
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={DaysListStyles.gradient}
            >
            <Text style = {DaysListStyles.dayText}>{item.day}</Text>
          </LinearGradient>
        </TouchableOpacity>
      ));
    }
  }

  // Renders the screen
  render() {

    // Const that gets the images for the specific activities
    // Also defines what is shown in the specific day route plan screen
    const DayRoutePlan = () => {

      // Define the image variable and the associated function
      const [towerOfPisaImage, setTowerOfPisaImage] = useState([]);
      
      // Called when the screen is loaded
      useEffect(() => {
        // Fetch image of the Leaning Tower of Pisa when the component mounts
        fetchTowerOfPisaImage();
      }, []);
      
      // Called when the user clicks to go back
      useEffect(() => {
        // Const that alerts the user that he/she pressed the go back button
        const backAction = () => {
          Alert.alert('Hold on!', 'Are you sure you want to go back?', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: () => this.setState({ showDayRoutePlan: false })},
          ]);
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
        return () => backHandler.remove();
      }, []);
    
      // Const that calls the Image API
      const fetchTowerOfPisaImage = async () => {
        try {
          const accessKey = accessKey; // Replace with your actual Unsplash Access Key
          const response = await axios.get('https://api.unsplash.com/photos/random', {
            params: {
              client_id: 'Q37z9gm8MYXdVPEDA6MFPe77A9jHWLdM9pLtqr060Xo',
              query: 'Tower of Pisa Italy', // Search query for the Tower of Pisa in Italy
              count: 5, // Number of images you want to fetch (in this case, just one)
            },
          });
    
          // Store the image URL in state
          const imagesOfPisa = response.data.map((photo) => photo.urls.regular);
          setTowerOfPisaImage(imagesOfPisa);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };
      
      // Only show the screen after the images are loaded
      if (towerOfPisaImage) { 
        return routePlan.activities.map((item, index) => (   
          
          <View style={ActivitiesListStyles.square} key={index}>

            {/* Image at the top occupying 50% of the square */}
            <Image
              source={{ uri: towerOfPisaImage[index] }}
              style={ActivitiesListStyles.image}
            />

            {/* Title and description */}
            <View style={ActivitiesListStyles.textContainer}>
              <Text style={ActivitiesListStyles.title}>{item.name}</Text>
              <Text style={ActivitiesListStyles.description}>{item.description}</Text>
            </View>

            {/* Buttons at the bottom */}
            <View style={ActivitiesListStyles.buttonContainer}>
              <TouchableOpacity  style={ActivitiesListStyles.button} onPress = { () => {openGoogleMaps(item.name)}}>
                <LinearGradient
                  colors={['#0038F5', '#9F03FF']} // Replace with your gradient colors
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={ActivitiesListStyles.gradient}
                  
                > 
                  <Text style={ActivitiesListStyles.buttonText}>Maps</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={ActivitiesListStyles.button} onPress = { () => {openGoogle(item.name)}}>
              <LinearGradient
                  colors={['#0038F5', '#9F03FF']} // Replace with your gradient colors
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={ActivitiesListStyles.gradient}
                > 
                  <Text style={ActivitiesListStyles.buttonText}>+Info</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

          </View>
        ))
      }
    }

    const HeartIcon = () => {
      const [isSaved, setIsSaved] = useState(false); // Initially, the content is not saved
    
      const toggleSave = () => {
        setIsSaved(!isSaved);
        // Add logic to handle saving content or updating the saved status
      };
    
      return (
        <TouchableOpacity onPress={toggleSave}>
          <View>
            <Image
              source={isSaved ? require('../Images/fullHeart.png') : require('../Images/emptyHeart.png')}
              style={{ width: 30, height: 30 }}
            />
          </View>
        </TouchableOpacity>
      );
    };

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

    // If fonts are loaded and showDayRoutePlan is 0 (Shows the list of days)
    if(this.state.fontsLoaded && !this.state.showDayRoutePlan){
      return (

        <View style={ParentStyles.container}>
          
          <View style={ParentStyles.containerLogoHeart}>
            {/* SVGLogo component */}
            <View style={ParentStyles.containerLogo}>
              <Image
                source={require('../Images/RouteMasterLogo.png')}
                style={ParentStyles.logo}
              />
            </View>

            {/* HeartIcon component */}
            <View style = {ParentStyles.iconContainer}>
              <HeartIcon />
            </View>
          </View>

          {/* Title and description */}
          <Text style={ParentStyles.listTitle}> Discover {city}, {country} </Text>
          <Text style={ParentStyles.listSubtitle}> Here is the perfect route for {days} days </Text>
          
           {/* Scroll view with the list of days */}
          <ScrollView style={{flex:1}}>
            {this.lists()}
          </ScrollView>

        </View>
      );
    }
    // If fonts are loaded and showDayRoutePlan is 1 (Shows the route plan for the specified day)
    else if(this.state.fontsLoaded && this.state.showDayRoutePlan){
      return (
        <View style={ParentStyles.container}>
          
          {/* Logo */}
          <View style = {{alignSelf:'center', padding:10}}>
            {/* Your Logo Component */}
            <SVGLogo style = {ParentStyles.imageLogo}/>
          </View>

          {/* Scroll view of the list of activities for the specified day */}
          <ScrollView style={{flex:1}}>

            {/* Title and description */}
            <Text style={ParentStyles.listTitle}> Discover {city}, {country} </Text>
            <Text style={ParentStyles.listSubtitle}> Here is the perfect route for {days} days </Text>

            {/* Specified Day */}
            <Text style={ParentStyles.dayText}> {routePlan.day} </Text>
            
            {/* List of activities, description and, maps and info buttons */}
            <View style={{alignItems:'center'}}>
              <DayRoutePlan/>
            </View>

          </ScrollView>
        
        </View>
      );
    }
  }
}




/********************** Functions ************************/

/*

  getPlan Function
  Calls the OpenAI to get the route plan for the specified days and destination
  Calls the LoadingScreen while waiting for the response
  Calls the ListPlans after the response is received and verified

*/
async function getPlan(navigator, cityName, countryName, daysNumber) {
  // Get city and contry via the location coordinates
  city = cityName;
  country = countryName;
  days = daysNumber;
  
  // Prompt to submit to the OpenAI
  //var prompt = 'Can you give a JSON file with a plan for ' + days +' days in ' + city[0].city +', '+ city[0].country +' using this format as example [{"day": "day1", "activities" : ["activity1", "activity2", "activity3"]}] ? Give 5 activities for each day'
  
  var prompt = 'Give me a JSON format only response for the following prompt: ' +
  `Generate a route plan for ${days} days ` +
  `in ${city}, ${country} with 5 activities for each day with a name and description. Give a specific name for the activity and a single line description` + 
  `Use the following json format mandatorily: ` +
  ` [{  "day": "day1", ` + 
  `     "activities" : [{` + 
  `       "name": "activity name 1",
          "description": "activity description"},

        { "name": "activity name 2",
          "description": "activity description"},

        { "name": "activity name 3",
          "description": "activity description"},

        { "name": "activity name 4",
          "description": "activity description"},

        { "name": "activity name 5",
          "description": "activity description"}
      ]}}] `


  // Navigate to the LoadingScreen while waiting for the response
  navigator.navigate("LoadingScreen")

  // Call the OpenAI to get the route plan
  // const res = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: prompt,
  //   max_tokens: 2048
  // })

  //console.log(res.data.choices[0].text)
  // console.log(JSON.parse(res.data.choices[0].text))

  // Parse the OpenAI response to JSON
  //listsPlan = JSON.parse(res.data.choices[0].text)

  // Waits 10 seconds for testing purposes
  // Only needed if chatgpt is commented
  // const delay = ms => new Promise(async resolve => setTimeout(resolve, ms))
  // await delay(1000)

  // Navigate to the ListPlans to show the days
  navigator.navigate("Days")
  
}




/********************* Stylesheets ***********************/

// Used for the PlansScreen class
const PlansScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
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
    width: '80%',
    height: 150,
    margin:10
  },
  whereToText: {
    fontFamily: 'SansationBold',
    fontSize: 36,
    color: '#000000',
    marginTop: 10,
  },
  wellGiveText: {
    fontFamily: 'Sansation',
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
    fontFamily: 'Sansation',
    fontSize: 16,
  },
  dropdownInput: {
    width:'100%',
    textAlign:'center',
    fontFamily: 'Sansation',
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
    fontFamily:'Sansation',
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
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  routeUpText: {
    fontFamily: 'SansationBold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  gradient: {
    borderRadius: 30,
    paddingVertical: '5%',
    paddingHorizontal: '30%',
  },
});

// Used for the LoadingScreen class
const LoadingScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogo:{
    top:'-5%',
    width:'50%',
    height:'30%',
  },
  titleText:{
    fontSize: 20,
    fontFamily:'SansationBold'
  },
  subtitleText:{
    fontSize: 15,
    fontFamily:'Sansation'
  },
})

// The 3 styles below are used for the DaysScreen class
const ParentStyles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
    
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
    justifyContent: 'space-between', // Space evenly between children
    padding: 20,
    height:'20%',
    width:'100%'
  },
  containerLogo: {
    flex: 1, // Occupy available space
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
    fontSize: 30,
    fontFamily:'SansationBold',
    textAlign: 'center',
  },
  listSubtitle: {
    fontSize: 20,
    fontFamily:'Sansation',
    textAlign: 'center',
    marginTop: 10, // Adjust margin top as needed to bring the list name down
    marginBottom:20
  },
  dayText: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily:'Sansation'
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
    fontFamily:'SansationBold',
    fontSize: 30,
    color:'#000'
  }
});

const DaysListStyles = StyleSheet.create({
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily:'SansationBold',
    color:'#fff'
  },
  gradient: {
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 100,
    margin:10
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