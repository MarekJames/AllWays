/*

ChangeName.js 

  -> Handles update of the users name

*/




/******************** Imports Section ********************/ 

import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { updateUser } from '../../config/firebase-config';
import { NetworkContext, showNetworkError } from '../../config/network-config';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
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
    const handleSubmit = async (navigation, isConnected) => {
        
      if(isConnected){

        let regex = /^[a-zA-Z]+$/;

        // Check user inputs
        if(!name){
            setInvalidName('Please input your name');
        }
        if(name && invalidName){
          setInvalidName('');
        }
        if(name){

          if(regex.test(name)){
            // Call updateUser to chage name
            const result = await updateUser(name);
            if(result == 'success') {

              // If successfull navigate to the Profile screen
              navigation.navigate('Profile');
            }
            else{
              showNetworkError(navigation, result);
            }
          }
          else{
            setInvalidName('Please input a valid name');
          }
        }
      }
      else{
        showNetworkError(navigation, 'Network');
      }
    }

    return (
      <NetworkContext.Consumer>
      {(value) => (
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
            <TouchableOpacity style = {ChangeNameStyles.recover} onPress={() => {handleSubmit(this.props.navigation, value)}}>
              <Text style = {ChangeNameStyles.updateText}>Update</Text>
            </TouchableOpacity>
      
          </ImageBackground>
        </View>
      )}
      </NetworkContext.Consumer>
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
    backgroundColor:'white',
  },
  subContainer:{
    flexDirection:'row',
    marginTop:verticalScale(50),
    marginBottom:verticalScale(10),
  },
  imageBackground:{
    flex:1,
    width:width,
    height:height,
  },
  title: {
    flex:1,
    color:'#000000',
    fontSize:scale(30),
    alignSelf:'center',
    textAlign:'center',
    marginRight:scale(55),
    fontFamily:'Poppins-Bold',
  },
  subTitle: {
    color:'#494949',
    fontSize:scale(20),
    textAlign:'center',
    fontFamily:'Poppins-Medium',
    marginBottom:verticalScale(40),
  },
  input: {
    width:width*0.8,
    borderRadius:30,
    alignSelf:'center',
    paddingLeft:scale(20),
    height:verticalScale(50),
    backgroundColor:'#F1F4FF',
    fontFamily:'Poppins-Light',
    marginVertical:verticalScale(30),
  },
  recover: {
    borderRadius:30,
    width:width*0.8,
    alignSelf:'center',
    justifyContent:'center',
    height:verticalScale(50),
    backgroundColor:'#23C2DF',
    marginTop:verticalScale(10),
    marginBottom:verticalScale(10),
  },
  backButton:{
    width:scale(45),
    borderRadius:30,
    height:scale(45),
    alignItems:'center',
    backgroundColor:'#fff',
    justifyContent:'center',
    marginLeft:verticalScale(10),
  },
  invalidInput:{
    color:'red',
    fontSize:scale(12),
    textAlign:'center',
    fontFamily:'Poppins-Medium',
  },
  updateText:{
    color:'#FFF',
    fontSize:scale(20),
    textAlign:'center',
    fontFamily:'Poppins-SemiBold',
  },
})