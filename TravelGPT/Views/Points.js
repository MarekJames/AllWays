import React, {useState, useEffect} from 'react';  
import {ScrollView, StyleSheet, View, Text, Pressable, TextInput, ActivityIndicator} from 'react-native';  
import { Configuration, OpenAIApi } from 'openai'
import "react-native-url-polyfill/auto"

import {getCurrentPositionAsync, requestForegroundPermissionsAsync, reverseGeocodeAsync} from 'expo-location';
import MapView , {Marker, Callout} from 'react-native-maps'

var destination
var listsPoints

const config = new Configuration({
  apiKey: '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'
})

const openai = new OpenAIApi(config)


export default class PointsScreen extends React.Component {  
    
    pontosScreen = () => {

      return (  
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>  
        <Text>Where are you??</Text>

        <Text>{" "}</Text>

        <Pressable onPress = { () => {this.props.navigation.navigate("MapsPoints")}}>
          <TextInput
          editable = {false}
          placeholder ="Choose your destination!!"
          />
        </Pressable>

        <Text>{" "}</Text>

        <Pressable onPress = { () => {getPoints(this.props.navigation)}}>
          <TextInput
          editable = {false}
          placeholder ="SUBMIT"
          />
        </Pressable>

    </View>  
); 

    }
    render() {  
      return (
        <this.pontosScreen></this.pontosScreen>
      )
        
    }
     
}

export class MapsPointsScreen extends React.Component { 
    
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

export class ListsPointsScreen extends React.Component {  

 

  lists = () => {

    return (
      <View style={styles.container}>
          <ScrollView>
            {listsPoints.map((item,index) => {
              return (
                <View key = {index}>

                  <Text>{" "}</Text>
                  <Text style={{ color: 'ghostwhite', fontSize: 15}}>{item.name}</Text>
                  <Text style={{ color: 'ghostwhite', fontSize: 12}}>{item.description}</Text>
                 
                </View>
              );
            })}
          </ScrollView>
      </View>

    )
  }

  render(){
    return(
      <this.lists></this.lists>
    )
  }
}

export class LoadingPointsScreen extends React.Component{
  
  render(){
    return (
      <View style = {styles.container}>
        <Text style = {{fontSize:20}}> Generating your response</Text>
        <Text style = {{fontSize:15}}> Wait a moment</Text>
        <Text> {" "}</Text>
        <ActivityIndicator size="large"/>
      </View>
    )

}

}
async function getPoints(navigator) {

  const city = await reverseGeocodeAsync(destination)

  //var prompt = 'Can you give a JSON file with a plan for ' + days +' days in ' + city[0].city +', '+ city[0].country +' using this format as example [{"day": "day1", "activities" : ["activity1", "activity2", "activity3"]}] ? Give 5 activities for each day'
  var prompt = 'Can you give a JSON file with the 20 points of interest in ' + city[0].city +', '+ city[0].country + ' using the following format as example [{"name":"name of the highlight", "description": "description of the highlight}].'

  console.log(prompt)
  navigator.navigate("LoadingPoints")
  const res = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 2048
  })

  listsPoints = JSON.parse(res.data.choices[0].text)

  console.log(listsPoints)

  navigator.navigate("ListsPoints")
  
}

function closeMap(location, Navigator){

  destination = location
  Navigator.navigate('Points')

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'ghostwhite',
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
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
      width: 200,
      height:50,
      borderRadius:10
    },
  
    text:{
      alignItems: 'center',
      justifyContent: 'center',
      color: 'ghostwhite',
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
      borderWidth: 0.0  
    },
  });