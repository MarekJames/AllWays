/*

ForgotPassword.js 

  -> Handles reset of the users password

*/




/******************** Imports Section ********************/ 

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity, ImageBackground } from 'react-native';
import { resetPassword } from '../config/firebase-config';




/*********************** Classes *************************/

/* 

  Forgot password screen of the app
  Allows the user to reset their password via email

*/

export class ForgotPasswordScreen extends React.Component{
  
  forgotPasswordScreen = () => {
    
    const [email, setEmail] = useState('');
    const [invalidEmail, setInvalidEmail] = useState('');
  
    const handleSubmit = async () => {
        
        if(!email){
            setInvalidEmail('Please input your email');
        }
        else{
            resetPassword(email);
        }
    }

    return (
      <View style={ForgotPasswordStyles.container}>

        <ImageBackground
          source={require('../Images/LoginBackground.png')} // Replace with your image path
          style={ForgotPasswordStyles.imageBackground}
          resizeMode="cover" // You can adjust the resizeMode property as needed
        >

        <Text style={ForgotPasswordStyles.title}>Forgot Password</Text>

        <Text style={ForgotPasswordStyles.subTitle}>Enter your email</Text>

        {invalidEmail !== null && ( // Checking if the variable is not null
          <Text style = {{color:'red',fontSize:12,fontWeight:'600', textAlign:'center'}}>{invalidEmail}</Text>
        )}
        <TextInput
          style={ForgotPasswordStyles.input}
          placeholder="Email"
          placeholderTextColor={'#626262'}
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style = {ForgotPasswordStyles.recover} onPress={handleSubmit}>
          <Text style = {{fontSize:20, fontWeight:'600', textAlign:'center', color:'#FFFFFF'}}>Recover Password</Text>
        </TouchableOpacity>
  
        <Pressable onPress={() => {this.props.navigation.reset({ index: 0,routes: [{ name: 'Login' }]})}}>
          <Text style={ForgotPasswordStyles.alreadyHaveAccount}>Already have an account</Text>
        </Pressable>
      </ImageBackground>
      </View>
    );
  };

  render() {  
    return (
      <this.forgotPasswordScreen></this.forgotPasswordScreen>
    )    
  }
}





/********************* Stylesheets ***********************/

const ForgotPasswordStyles = StyleSheet.create ({
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
    marginBottom: 10,
    marginTop:80,
    color:'#23C2DF',
    alignSelf:'center'
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