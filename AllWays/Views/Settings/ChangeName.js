/*

ChangeName.js 

  -> Handles update of the users name

*/




/******************** Imports Section ********************/ 

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { updateUser } from '../../config/firebase-config';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from '../../config/firebase-config';


/*********************** Classes *************************/

/* 

  Change name screen of the app
  Allows the user to update their name

*/

export class ChangeNameScreen extends React.Component{
  
  changeNameScreen = () => {
    
    const [name, setName] = useState('');
    const [invalidName, setInvalidName] = useState('');
  
    const handleSubmit = async (navigator) => {
        
        if(!name){
            setInvalidName('Please input your name');
        }
        if(name && invalidName){
          setInvalidName('');
        }
        if(name){
          const result = await updateUser(name);
          if(result == 'success') {
            navigator.replace('Profile', {userName : name});
          }
        }
    }

    return (
      <View style={ChangeNameStyles.container}>

        <ImageBackground
          source={require('../../Images/LoginBackground.png')} // Replace with your image path
          style={ChangeNameStyles.imageBackground}
          resizeMode="cover" // You can adjust the resizeMode property as needed
        >
        
        <View style = {{flexDirection:'row', marginTop:50, marginBottom:10}}>
          <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 30,
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft:10
                }}
              >
                <Text><Ionicons name="chevron-back-sharp" size={30} color="black" /></Text>
          </TouchableOpacity>

          <Text style={ChangeNameStyles.title}>Change Name</Text>
        </View>

        <Text style={ChangeNameStyles.subTitle}>Enter your name</Text>

        {invalidName !== null && ( // Checking if the variable is not null
          <Text style = {{color:'red',fontSize:12,fontWeight:'600', textAlign:'center'}}>{invalidName}</Text>
        )}
        <TextInput
          style={ChangeNameStyles.input}
          placeholder="Name"
          placeholderTextColor={'#626262'}
          value={name}
          onChangeText={setName}
        />

        <TouchableOpacity style = {ChangeNameStyles.recover} onPress={() => {handleSubmit(this.props.navigation)}}>
          <Text style = {{fontSize:20, fontWeight:'600', textAlign:'center', color:'#FFFFFF'}}>Update</Text>
        </TouchableOpacity>
  
        </ImageBackground>
      </View>
    );
  };

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
      width: '100%', // You can adjust width and height as needed
      height: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color:'#000000',
    alignSelf:'center',
    textAlign:'center',
    flex:1,
    marginRight:55

  },
  subTitle: {
    fontSize: 20,
    marginBottom: 40,
    color:'#494949',
    fontWeight:'600',
    textAlign:'center'
  },
  input: {
    width: '80%',
    height: 50,
    paddingLeft: 20,
    marginVertical: 30,
    borderRadius:30,
    alignSelf:'center',
    backgroundColor:'#F1F4FF'
  },
  alreadyHaveAccount: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
    fontWeight:'600',
    color:'#494949'
  },
  recover: {
    width: '80%',
    height: 50,
    backgroundColor:'#23C2DF',
    marginTop:10,
    marginBottom: 10,
    borderRadius:30,
    alignSelf:'center',
    justifyContent:'center'
  },
  continueWith:{
    textAlign:'center',
    fontSize:14,
    color:'#23C2DF',
    fontWeight:'600',
    marginTop:30
  },
  icons:{
    alignItems:'center', 
    justifyContent:'center', 
    width:60, 
    height:50, 
    borderRadius: 10, 
    backgroundColor:'#ECECEC',
    marginHorizontal:10
  }
 
})