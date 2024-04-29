/*

ChangeName.js 

  -> Handles update of the users name

*/




/******************** Imports Section ********************/ 

import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { updateUser } from '../../config/firebase-config';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';




/******************* Global Variables ********************/

const width = Dimensions.get('window').width   // Get width of the user screen
const height = Dimensions.get('window').height // Get height of the user screen




/*********************** Classes *************************/

/* 

  Change name screen of the app
  Allows the user to update their name

*/

export class ChangeNameScreen extends React.Component{
  
  changeNameScreen = () => {
    
    // Const to store name and error message
    const [name, setName] = useState('');
    const [invalidName, setInvalidName] = useState('');
  
    // Function to handle submit button
    const handleSubmit = async (navigator) => {
        
      // Check user inputs
      if(!name){
          setInvalidName('Please input your name');
      }
      if(name && invalidName){
        setInvalidName('');
      }
      if(name){

        // Call updateUser to chage name
        const result = await updateUser(name);
        if(result == 'success') {

          // If successfull navigate to the Profile screen
          navigator.navigate('Profile');
        }
      }
    }

    return (
      <View style={ChangeNameStyles.container}>

        {/* ImageBackground of the screen */}
        <ImageBackground
          resizeMode="cover"
          style={ChangeNameStyles.imageBackground}
          source={require('../../Images/LoginBackground.png')}
        >

          {/* Header of the screen | Back button | Title */}
          <View style = {ChangeNameStyles.subContainer}>
            
            {/* Back button */}
            <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                  style={ChangeNameStyles.backButton}
                >
                  <Text><Ionicons name="chevron-back-sharp" size={30} color="black" /></Text>
            </TouchableOpacity>

            {/* Title */}
            <Text style={ChangeNameStyles.title}>Change Name</Text>
          </View>
          
          {/* Subtitle */}
          <Text style={ChangeNameStyles.subTitle}>Enter your name</Text>

          {/* Error Message */}
          {invalidName !== null && ( // Checking if the variable is not null
            <Text style = {ChangeNameStyles.invalidInput}>{invalidName}</Text>
          )}

          {/* Name Input */}
          <TextInput
            value={name}
            placeholder="Name"
            onChangeText={setName}
            style={ChangeNameStyles.input}
            placeholderTextColor={'#626262'}
          />

          {/* Submit Button */}
          <TouchableOpacity style = {ChangeNameStyles.recover} onPress={() => {handleSubmit(this.props.navigation)}}>
            <Text style = {ChangeNameStyles.updateText}>Update</Text>
          </TouchableOpacity>
    
        </ImageBackground>
      </View>
    );
  };

  // Render screen
  render() {  
    return (
      <this.changeNameScreen></this.changeNameScreen>
    )    
  }
}




/********************* Stylesheets ***********************/

const ChangeNameStyles = StyleSheet.create ({
  container: {
    flex:1,
    alignItems:'center',
    backgroundColor:'white'
  },
  subContainer:{
    marginTop:50,
    marginBottom:10,
    flexDirection:'row',
  },
  imageBackground:{
    flex:1,
    width:width,
    height:height,
  },
  title: {
    flex:1,
    fontSize: 30,
    marginRight:55,
    color:'#000000',
    alignSelf:'center',
    textAlign:'center',
    fontFamily:'Poppins-Bold',
  },
  subTitle: {
    fontSize:20,
    color:'#494949',
    marginBottom:40,
    textAlign:'center',
    fontFamily:'Poppins-Medium',
  },
  input: {
    height:50,
    paddingLeft:20,
    width:width*0.8,
    borderRadius:30,
    marginVertical:30,
    alignSelf:'center',
    backgroundColor:'#F1F4FF',
    fontFamily:'Poppins-Light',
  },
  recover: {
    height:50,
    marginTop:10,
    borderRadius:30,
    width:width*0.8,
    marginBottom:10,
    alignSelf:'center',
    justifyContent:'center',
    backgroundColor:'#23C2DF'
  },
  backButton:{
    width:45,
    height:45,
    marginLeft:10,
    borderRadius:30,
    alignItems:'center',
    backgroundColor:'#fff',
    justifyContent:'center',
  },
  invalidInput:{
    color:'red',
    fontSize:12,
    textAlign:'center',
    fontFamily:'Poppins-Medium',
  },
  updateText:{
    fontSize:20,
    color:'#FFF',
    textAlign:'center',
    fontFamily:'Poppins-SemiBold',
  },
})