/*

ForgotPassword.js 

  -> Handles reset of the users password

*/




/******************** Imports Section ********************/ 

import React, { useState } from 'react';
import { resetPassword } from '../../config/firebase-config';
import { NetworkContext, showNetworkError } from '../../config/network-config';
import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity, ImageBackground } from 'react-native';




/*********************** Classes *************************/

/* 

  Forgot password screen of the app
  Allows the user to reset their password via email

*/

export class ForgotPasswordScreen extends React.Component{
  
  forgotPasswordScreen = () => {
    
    const [email, setEmail] = useState('');
    const [invalidEmail, setInvalidEmail] = useState('');
  
    const handleSubmit = async (navigation, isConnected) => {
        
      if(isConnected){
        if(!email){
            setInvalidEmail('Please input your email');
        }
        else{
          const result = await resetPassword(email);
          if(result == 'success'){
            console.log('Reset email sent!');
          }
          else if(result == 'auth/invalid-email'){
            setInvalidEmail('Please input a valid email');
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
        <View style={ForgotPasswordStyles.container}>

          <ImageBackground
            source={require('../../Images/LoginBackground.png')} // Replace with your image path
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

            <TouchableOpacity style = {ForgotPasswordStyles.recover} onPress={() => {handleSubmit(this.props.navigation, value)}}>
              <Text style = {ForgotPasswordStyles.recoverText}>Recover</Text>
            </TouchableOpacity>
      
            <Pressable onPress={() => {this.props.navigation.reset({ index: 0,routes: [{ name: 'Login' }]})}}>
              <Text style={ForgotPasswordStyles.alreadyHaveAccount}>Already have an account</Text>
            </Pressable>
          </ImageBackground>
        </View>
      )}
      </NetworkContext.Consumer>
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
    marginBottom: 10,
    marginTop:80,
    color:'#23C2DF',
    alignSelf:'center',
    fontFamily:'Poppins-Bold'
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 40,
    color:'#494949',
    textAlign:'center',
    fontFamily:'Poppins-Medium'
  },
  input: {
    width: '80%',
    height: 50,
    paddingLeft: 20,
    marginVertical: 30,
    borderRadius:30,
    alignSelf:'center',
    backgroundColor:'#F1F4FF',
    fontFamily:'Poppins-Light'
  },
  alreadyHaveAccount: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
    color:'#494949',
    fontFamily:'Poppins-Medium'
  },
  recover: {
    width: '80%',
    height: 50,
    backgroundColor:'#23C2DF',
    marginTop:10,
    marginBottom: 10,
    borderRadius:30,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center'
  },
  recoverText:{
    fontSize:20,
    fontWeight:'600',
    textAlign:'center',
    color:'#FFFFFF',
    fontFamily:'Poppins-Medium'
  }
})