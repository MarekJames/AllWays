/*

ChangeName.js 

  -> Handles update of the users name

*/




/******************** Imports Section ********************/ 

import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { updateUser } from '../../config/firebase-config';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';




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
          <View style = {{flexDirection:'row', marginTop:50, marginBottom:10}}>
            
            {/* Back button */}
            <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                  style={{
                    width: 45,
                    height: 45,
                    marginLeft:10,
                    borderRadius: 30,
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    justifyContent: 'center'
                  }}
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
            <Text style = {{color:'red',fontSize:12,fontWeight:'600', textAlign:'center'}}>{invalidName}</Text>
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
            <Text style = {{fontSize:20, fontWeight:'600', textAlign:'center', color:'#FFFFFF'}}>Update</Text>
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
    flex: 1,
    alignItems: 'center',
    backgroundColor:'white'
  },
  imageBackground:{
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    flex:1,
    fontSize: 30,
    marginRight:55,
    color:'#000000',
    fontWeight: 'bold',
    alignSelf:'center',
    textAlign:'center'
  },
  subTitle: {
    fontSize: 20,
    color:'#494949',
    fontWeight:'600',
    marginBottom: 40,
    textAlign:'center'
  },
  input: {
    height: 50,
    width: '80%',
    paddingLeft: 20,
    borderRadius:30,
    alignSelf:'center',
    marginVertical: 30,
    backgroundColor:'#F1F4FF'
  },
  recover: {
    height: 50,
    width: '80%',
    marginTop:10,
    borderRadius:30,
    marginBottom: 10,
    alignSelf:'center',
    justifyContent:'center',
    backgroundColor:'#23C2DF'
  }
})