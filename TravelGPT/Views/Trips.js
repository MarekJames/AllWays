import React, {useState, useEffect} from 'react';  
import {ScrollView, StyleSheet, View, Text, Pressable, TextInput, Platform, Linking} from 'react-native';  
import { Configuration, OpenAIApi } from 'openai'
import "react-native-url-polyfill/auto"
import DatePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import {getCurrentPositionAsync, requestForegroundPermissionsAsync} from 'expo-location';
import MapView , {Marker, Callout} from 'react-native-maps'


const config = new Configuration({
  apiKey: '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'
})

const openai = new OpenAIApi(config)

var list = []
var listOfCities = []
var num = 0
var region = ''
var city = ''
var country = ''
var booking_link ={"link" : "b"}
var flights_link  ={"link" : "a"}

export class TripsScreen extends React.Component {  
    render() { 
        return ( 
    
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>  
            <Text>What kind of trip do you like the most?</Text>

            <Text>{" "}</Text>

            <Pressable style={styles.button} onPress={ () => this.props.navigation.navigate('Regions')}>
              <Text style={styles.text}>Beach</Text>
            </Pressable>

            <Text>{" "}</Text>

            <Pressable style={styles.button} onPress={() => this.props.navigation.navigate('Restauracao')}>
              <Text style={styles.text}>Cultural</Text>
            </Pressable>

            <Text>{" "}</Text>

            <Pressable style={styles.button} onPress={() => this.props.navigation.navigate('')}>
              <Text style={styles.text}>Snow</Text>
            </Pressable>

            <Text>{" "}</Text>

            <Pressable style={styles.button} onPress={() => this.props.navigation.navigate('Pontos')}>
              <Text style={styles.text}>Nature</Text>
            </Pressable>

            <Text>{" "}</Text>

            <Pressable style={styles.button} onPress={() => this.props.navigation.navigate('Pontos')}>
              <Text style={styles.text}>No preference</Text>
            </Pressable>
          </View> 
        )   
    }   
} 

export class RegionsScreen extends React.Component {  
  render() { 
      return ( 
  
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>  
          <Text>What region would you prefer?</Text>

          <Text>{" "}</Text>

          <Pressable style={styles.button} onPress={() => { region = 'Western Europe' , sendToChatGPT(this.props.navigation)}}>
            <Text style={styles.text}>Western Europe</Text>
          </Pressable>

          <Text>{" "}</Text>

          <Pressable style={styles.button} onPress={() => { region = 'East Europe' , sendToChatGPT(this.props.navigation)}}>
            <Text style={styles.text}>East Europe</Text>
          </Pressable>

          <Text>{" "}</Text>

          <Pressable style={styles.button} onPress={() => { region = 'Northern Europe' , sendToChatGPT(this.props.navigation)}}>
            <Text style={styles.text}>Northern Europe</Text>
          </Pressable>

          <Text>{" "}</Text>

          <Pressable style={styles.button} onPress={() => { region = 'Southern Europe' , sendToChatGPT(this.props.navigation)}}>
            <Text style={styles.text}>Southern Europe</Text>
          </Pressable>

          <Text>{" "}</Text>

          <Pressable style={styles.button} onPress={() => { region = 'Europe' , sendToChatGPT(this.props.navigation)}}>
            <Text style={styles.text}>No preference</Text>
          </Pressable>
        </View> 
      )   
  }   
} 

export class ListsScreen extends React.Component {  

 

  lists = () => {

    const [lists, setLists] = useState(listOfCities)

    useEffect(() => {
      setLists(listOfCities)
      //console.log(lists)
    });

    return (
      <View style={styles.container4}>
        <View style={styles.container4}>  
        <ScrollView>
            {lists.map((item,index) => {
              return (
                <View>
                  <Text>{" "}</Text>
                  <Pressable key= {index} style = {styles.button} onPress = { () => { city = item.city, country = item.country, this.props.navigation.navigate("TripsFilter")}}>
                    <Text style={{ color: 'ghostwhite', fontSize: 15}}>{item.city}</Text>
                    <Text style={{ color: 'ghostwhite', fontSize: 12}}>{item.country} </Text>
                    {/* <Text style={styles.text}>{item.highlights[0]}</Text>
                    <Text style={styles.text}>{item.highlights[1]}</Text>
                    <Text style={styles.text}>{item.highlights[2]}</Text>
                    <Text style={styles.text}>{item.highlights[3]}</Text>
                    <Text style={styles.text}>{item.highlights[4]}</Text> */}
                  
                  </Pressable>
                </View>
              );
            })}
        </ScrollView>

        
        </View> 
        <View style={styles.container}>
          <Pressable style = {styles.button} onPress = { () => sendToChatGPT(this.props.navigation)}>
            <Text style ={styles.text}>Load more</Text>
          </Pressable>
        </View>
      </View>

    )
  }

  render() {
    return (
      <this.lists/>
    )
  }

}

export class TripsFilterScreen extends React.Component {  
  
  filterScreen = () => {
    
    
    const [dateBegin, setDateBegin] = useState(new Date())
    const [dateEnd, setDateEnd] = useState(new Date())

    const [sliderValue, setSliderValue] = useState(500)

    const [showPickerBegin, setShowPickerBegin] = useState(false)
    const [showPickerEnd, setShowPickerEnd] = useState(false)

    const toogleDataPickerBegin = () => {
      setShowPickerBegin(!showPickerBegin)
    }
    
    const toogleDataPickerEnd = () => {
      setShowPickerEnd(!showPickerEnd)
    }

    const onChangeBegin = ({type}, selectedDate) => {
      if(type == "set"){
        const currentDate = selectedDate
        setDateBegin(currentDate)

        if(Platform.OS === "android") {
          toogleDataPickerBegin();
        }

      }else{
        toogleDataPickerBegin()
      }
    }

    const onChangeEnd = ({type}, selectedDate) => {
      if(type == "set"){
        const currentDate = selectedDate
        setDateEnd(currentDate)

        if(Platform.OS === "android") {
          toogleDataPickerEnd();
        }

      }else{
        toogleDataPickerEnd()
      }
    }

    return (
      
      <View style={styles.container}>
        <View style={styles.container2}>
          <Text style = {{justifyContent: 'center', fontSize: 20}}>Choose your filters to go to </Text>
          <Text style = {{justifyContent: 'center', fontSize: 30}}>{city}</Text>
          <Text style = {{justifyContent: 'center', fontSize: 15}}>{country}</Text>
        </View>
     
        <View style={styles.container3}> 

          <Text style = {{color:'black', fontSize:18}}> Budget:  {sliderValue} Euros </Text>
          <Slider style = {{ width : 300, height : 50 }}
            minimunValue={0}
            maximumValue={5000}
            value={sliderValue}
            step = {50}
            onValueChange = {(value) => setSliderValue(value)}
          />

          <Text>{" "}</Text>

          <Text style = {{color:'black', fontSize:18}}> When do you want to go ? </Text>
          <Pressable style = {styles.button2} onPress = {toogleDataPickerBegin}>
            <TextInput
              style = {styles.text}
              placeholder='Click to choose date'
              value = {dateBegin.toDateString()}
              editable = {false}
            />
          </Pressable>

          {showPickerBegin && (

            <DatePicker
              style = {{color:'black'}}
              mode="date"
              display="spinner"
              value={dateBegin}
              onChange={onChangeBegin}
            />
          )
          }

          <Text>{" "}</Text>

          <Text style = {{color:'black', fontSize:18}}> When are you planning coming back? </Text>
          <Pressable style = {styles.button2} onPress = {toogleDataPickerEnd}>
            <TextInput
              style = {styles.text}
              placeholder='Click to choose date'
              value = {dateEnd.toDateString()}
              editable = {false}
            />
          </Pressable>

          {showPickerEnd && (

            <DatePicker
              style = {{color:'black'}}
              mode="date"
              display="spinner"
              value={dateEnd}
              onChange={onChangeEnd}
            />
          )
          }

          <Text>{" "}</Text>

          <Pressable style = {styles.button2} onPress = { () => this.props.navigation.navigate("MapsTrips")}>
          <TextInput
              style = {styles.text}
              placeholder='Click to get your location'
              editable = {false}
            />
          </Pressable>

          <Text>{" "}</Text>
          <Text>{" "}</Text>
          <Text>{" "}</Text>

          <Pressable style = {styles.button2} onPress = { () => getLinks(this.props.navigation)}>
          <Text
              style = {styles.text}
          >Submit</Text>
          </Pressable>

        </View> 
      </View>
    );
  }

  render() { 
      return (
        <this.filterScreen/>
      )
  }
}

export class MapsTripsScreen extends React.Component { 
    
  mapsScreen = () => {
    
    const [location, setLocation] = useState(false);
  
    async function getLocation(){

      const {granted} = await requestForegroundPermissionsAsync()
    
      if(granted){
       
        const currentPosition = await getCurrentPositionAsync() 
        setLocation(currentPosition.coords)
      
      }
      else{
        console.log("Didn't give permissions")
      }
    
    }

    useEffect(() => {
    
      getLocation()
    } , []);

    return (
      
      <View style={styles.containerMap}> 

        {(location && 
        <MapView 
          style = {{flex:1, width:'100%', height:'100%'}}
          onPress= {e => setLocation(e.nativeEvent.coordinate)}
          initialRegion = {{
            latitude: location.latitude,
            longitude:location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
          }}
          
        >
          <Marker coordinate={{
            latitude: location.latitude,
            longitude: location.longitude

          }}></Marker>
        </MapView>
        )} 

        <Callout>
          <View style={styles.calloutView} >
            <Pressable style={styles.calloutSearch} onPress = {() => closeMap(location, this.props.navigation)}>
              <Text >
                Done
              </Text>
            </Pressable>
          </View>
        </Callout>

      </View> 
    );
  }

  render() { 
      return (
       
        <this.mapsScreen/>
   
      )
  }
}

export class LinksScreen extends React.Component {  
  render(){
    return(

      <View>

      <Pressable onPress = {Linking.openURL(booking_link.link)}>
      <TextInput
        style = {styles.text}
        editable = {false}
        placedholder = "Booking link"

      />
      </Pressable>

      <Text>{" "}</Text>

      <Pressable onPress = {Linking.openURL(flights_link.link)}>
      <TextInput
        style = {styles.text}
        editable = {false}
        placedholder = "Flights Link"

      />
      </Pressable>

      </View>
    )
  }
}

async function sendToChatGPT(navigation) {

  var prompt

  if(num == 0) prompt = 'Give me a JSON file with 5 places to visit with the best beaches in '+  region +'. Give me the city name, country and 5 highlights of the city in lower case. Use the following format as guide [{"city" :"lisbon", "country":"portugal", "highlights":["beach1", "beach2"]}]'
  else prompt = 'Give me a JSON file with 5 more places to visit with the best beaches in '+  region +'. Give me the city name, country and 5 highlights of the city in lower case. Use the following format as guide [{"city" :"lisbon", "country":"portugal", "highlights":["beach1", "beach2"]}]'
  
  console.log(prompt)

  const res = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 2048
  })

  list = res.data.choices[0].text.toLowerCase()
  list = JSON.parse(list)

  var count 
  if(num == 0) count = 0
  else count = 5 * num

  list.forEach((item) => {
    listOfCities.push(item)
    listOfCities[count].id = count++
  })
  

  if(num!=0 ) {
    num++
    navigation.push('Lists')
  }
  else {
    num++
    navigation.navigate('Lists')
  }

}

async function getLinks(navigation) {

  var prompt_booking

  prompt_booking = 'Can you give me a link to the booking.com website with filters for Lisbon, Portugal?. Use the following format as example { "link" : "https://www.booking.com" }'
  
  console.log(prompt_booking)

  const res = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt_booking,
    max_tokens: 2048
  })

  console.log(res.data.choices[0].text)
  booking_link = JSON.parse(res.data.choices[0].text)
  console.log(booking_link.link)

  prompt_booking = 'Can you give me a link to the expedia.com website with filters for  Lisbon, Portugal ?. Use the following format as example { "link" : "https://www.expedia.com" } '
  
  console.log(prompt_booking)


  const res2 = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt_booking,
    max_tokens: 2048
  })

  console.log(res2.data.choices[0].text)
  flights_link = JSON.parse(res2.data.choices[0].text)
  console.log(flights_link.link)


  navigation.navigate('Links')


}

function closeMap(location, Navigator){

  userLocation = location
  Navigator.navigate('TripsFilter')

}

const styles = StyleSheet.create({
    container2: {
      top:100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container3: {
      top: 200,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    container4: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerMap: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button:{
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      elevation: 3,
      backgroundColor: '#696969',
      width: 300,
      height:120,
      borderRadius:40
    },
    button2:{
      top:10,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 32,
      elevation: 3,
      backgroundColor: '#a9a9a9',
      width: 300,
      height:40,
      borderRadius:20
    },
    text:{
      alignItems: 'center',
      justifyContent: 'center',
      color: 'ghostwhite',
      fontSize: 17,
    },
    item: {
      padding: 20,
      fontSize: 17,
      marginTop: 5,
    },
    calloutView: {
      flex:0.3,
      flexDirection: "row",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: 10,
      top:300,
      width: "100%",
      height: "100%",
      
    },
    calloutSearch: {
      borderColor: "transparent",
      justifyContent: 'center',
      alignItems: 'center',
      width: 300,
      height: 50,
      borderWidth: 0.0,
    },
});

 