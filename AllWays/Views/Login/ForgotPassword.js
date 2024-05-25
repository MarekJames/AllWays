/*

ForgotPassword.js 

  -> Handles reset of the users password

*/




/******************** Imports Section ********************/ 

import React, { useState } from 'react';
import { resetPassword } from '../../config/firebase-config';
import { NetworkContext, showNetworkError } from '../../config/network-config';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
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
    flex:1,
    alignItems:'center',
    backgroundColor:'white',
  },
  imageBackground:{
    flex:1,
    width:'100%',
    height:'100%',
  },
  title: {
    color:'#23C2DF',
    fontSize:scale(25),
    alignSelf:'center',
    fontFamily:'Poppins-Bold',
    marginTop:verticalScale(80),
    marginBottom:verticalScale(10),
  },
  subTitle: {
    color:'#494949',
    textAlign:'center',
    fontSize:scale(16),
    fontFamily:'Poppins-Medium',
    marginBottom:verticalScale(40),
  },
  input: {
    width:'80%',
    borderRadius:30,
    alignSelf:'center',
    height:verticalScale(40),
    backgroundColor:'#F1F4FF',
    fontFamily:'Poppins-Light',
    paddingLeft:verticalScale(20),
    marginVertical:verticalScale(30),
  },
  alreadyHaveAccount: {
    color:'#494949',
    textAlign:'center',
    fontSize:scale(13),
    fontFamily:'Poppins-Medium',
    marginTop:verticalScale(20),
  },
  recover: {
    width:'80%',
    borderRadius:30,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    height:verticalScale(45),
    backgroundColor:'#23C2DF',
    marginTop:verticalScale(10),
    marginBottom:verticalScale(10),
  },
  recoverText:{
    color:'#FFFFFF',
    fontSize:scale(16),
    textAlign:'center',
    fontFamily:'Poppins-Medium'
  }
})