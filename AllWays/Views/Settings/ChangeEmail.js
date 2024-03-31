/*

ChangeEmail.js 

  -> Handles update of the users email

*/




/******************** Imports Section ********************/ 

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { updateUserEmail } from '../../config/firebase-config';
import { Ionicons } from '@expo/vector-icons';



/*********************** Classes *************************/

/* 

  Change email screen of the app
  Allows the user to update their email

*/

export class ChangeEmailScreen extends React.Component{
  
  changeEmailScreen = () => {
    
    const [email, setEmail] = useState('');
    const [invalidEmail, setInvalidEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [invalidConfirmEmail, setInvalidConfirmEmail] = useState('');
  
    const handleSubmit = async (navigator) => {
        
        if(!email){
            setInvalidEmail('Please input your email');
        }
        if(!confirmEmail){
            setInvalidConfirmEmail('Please input your email again');
        }
        if(email != confirmEmail){
            setConfirmEmail('The inserted emails don\'t match');
        }
        if(email && invalidEmail){
            setInvalidEmail('');
        }
        if(confirmEmail && invalidConfirmEmail){
            setInvalidConfirmEmail('');
        }
        if(email && confirmEmail && email == confirmEmail){
          console.log(email);
            const result = await updateUserEmail(email);
            if(result == 'success'){
              navigator.replace('Profile', {email : email});
            }
        }
    }

    return (
      <View style={ChangeEmailStyles.container}>

        <ImageBackground
          source={require('../../Images/LoginBackground.png')} // Replace with your image path
          style={ChangeEmailStyles.imageBackground}
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

          <Text style={ChangeEmailStyles.title}>Change Email</Text>
        </View>

        <Text style={ChangeEmailStyles.subTitle}>Enter your email</Text>

        {invalidEmail !== null && ( // Checking if the variable is not null
          <Text style = {{color:'red',fontSize:12,fontWeight:'600', textAlign:'center'}}>{invalidEmail}</Text>
        )}
        <TextInput
          style={ChangeEmailStyles.input}
          placeholder="Email"
          placeholderTextColor={'#626262'}
          value={email}
          onChangeText={setEmail}
        />

        {invalidConfirmEmail !== null && ( // Checking if the variable is not null
          <Text style = {{color:'red',fontSize:12,fontWeight:'600', textAlign:'center'}}>{invalidConfirmEmail}</Text>
        )}
        <TextInput
          style={ChangeEmailStyles.input}
          placeholder="Confirm Email"
          placeholderTextColor={'#626262'}
          value={confirmEmail}
          onChangeText={setConfirmEmail}
        />

        <TouchableOpacity style = {ChangeEmailStyles.recover} onPress={() => {handleSubmit(this.props.navigation)}}>
          <Text style = {{fontSize:20, fontWeight:'600', textAlign:'center', color:'#FFFFFF'}}>Update</Text>
        </TouchableOpacity>
  
        </ImageBackground>
      </View>
    );
  };

  render() {  
    return (
      <this.changeEmailScreen></this.changeEmailScreen>
    )    
  }
}





/********************* Stylesheets ***********************/

const ChangeEmailStyles = StyleSheet.create ({
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
    marginVertical: 20,
    borderRadius:30,
    alignSelf:'center',
    backgroundColor:'#F1F4FF'
  },
  recover: {
    width: '80%',
    height: 50,
    backgroundColor:'#23C2DF',
    marginTop:40,
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