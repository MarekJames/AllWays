/*

ChangeEmail.js 

  -> Handles update of the users email

*/




/******************** Imports Section ********************/ 

import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NetworkContext, showNetworkError } from '../../config/network-config';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { updateUserEmail, getAuth, verifyBeforeUpdate, reauthenticateUser } from '../../config/firebase-config';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Modal, ActivityIndicator, Dimensions } from 'react-native';




/******************* Global Variables ********************/

const width = Dimensions.get('window').width   // Get width of the user screen
const height = Dimensions.get('window').height // Get height of the user screen




/*********************** Classes *************************/

/* 

  Change email screen of the app
  Allows the user to update their email

*/
export class ChangeEmailScreen extends React.Component{
  
  changeEmailScreen = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidEmail, setInvalidEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [isRecentLogin, setIsRecentLogin] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [invalidConfirmEmail, setInvalidConfirmEmail] = useState('');
   
    // Handles Reauthentication
    const handleLogin = async (navigation, isConnected) => {

      if(isConnected){
        // Reauthenticate user with provided password
        const resultReauthenticate = await reauthenticateUser(password);
        
        // If success close modal
        if(resultReauthenticate == 'success'){
          setIsModalVisible(!isModalVisible);
          setIsRecentLogin(!isRecentLogin);
        }
        else{
          showNetworkError(navigation, resultReauthenticate);
        }
      }
      else{
        showNetworkError(navigation, 'Network');
      }
    }

    // Handle Success
    const handleComplete = async (navigation, isConnected) => {
      
      if(isConnected){
        // Check user
        await getAuth().currentUser.reload();
        const user = getAuth().currentUser;
        // Check email verified

        if(user.email == email && user.emailVerified){
          console.log(user.email + ":" + user.emailVerified);
        
          // Log user out
          try {
            await getAuth().signOut();
          }
          catch(error){
            console.log('Error Sign Out: ' + error);
            showNetworkError(navigation, error.message);
          }
        }
        else{
          console.log(user.email + ":" + user.emailVerified);
        }
      }
      else{
        showNetworkError(navigation, 'Network');
      }
    }

    // Handle Verify Email
    const handleVerifyEmailError = async (navigation, error) => {
      if(error == 'auth/requires-recent-login'){
        
        // Show modal
        setIsModalVisible(!isModalVisible);

        // Set recent login
        setIsRecentLogin(!isRecentLogin);
      }
      else{
        showNetworkError(navigation, error);
      }
    }

    // Handle Submit
    const handleSubmit = async (navigation, isConnected) => {
        
        if(!email){
            setInvalidEmail('Please input your email');
        }
        if(!confirmEmail){
            setInvalidConfirmEmail('Please input your email again');
        }
        if(email != confirmEmail){
            setInvalidConfirmEmail('The inserted emails don\'t match');
        }
        if(email && invalidEmail){
            setInvalidEmail('');
        }
        if(confirmEmail && invalidConfirmEmail){
            setInvalidConfirmEmail('');
        }
        if(email && confirmEmail && email == confirmEmail){
          if(isConnected){
            const result = await updateUserEmail(email.trim());
            if(result == 'success'){
              navigation.replace('Profile', {email : email.trim()});
            }
            if(result == 'auth/invalid-email'){
              setInvalidEmail('Invalid email, try again');
              console.log(result);
            }
            if(result == 'auth/email-already-in-use'){
              setInvalidEmail('Email already in use, try again');
              console.log(result);
            }
            if(result == 'auth/requires-recent-login'){
              console.log(result);
            }
            if(result == 'auth/operation-not-allowed'){
              
              // Send verify email to new email
              const resultVerify = await verifyBeforeUpdate(email.trim());
              
              // If email is sent successfully
              if(resultVerify == 'success'){
                
                // Show modal 
                setIsModalVisible(true);
              }
              else{

                // Send to Error handler
                handleVerifyEmailError(navigation, resultVerify);
              }
            }
            else{
              showNetworkError(navigation, result);
            }
          }
          else{
            showNetworkError(navigation, 'Network');
          }
        }
    }

    return (
      <NetworkContext.Consumer>
      {(value) => (
        <View style={ChangeEmailStyles.container}>
          <Modal
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style = {ChangeEmailStyles.subContainer}>

              {/* Show email validation OR Login reauthenticate */}
              {!isRecentLogin ? (
                <View>
                  <Text style = {ChangeEmailStyles.errorTitle}>Please verify your new email</Text>
                  <Text style = {ChangeEmailStyles.errorSubtitle}>An email has been sent to your new email</Text>
                  <Text style = {ChangeEmailStyles.errorSubtitle}>Verify it and click complete.</Text>
                  
                  <ActivityIndicator style = {{margin:30}}>
                  </ActivityIndicator>
                  <TouchableOpacity 
                    style = {ChangeEmailStyles.modalButtom}
                    onPress={() => {handleComplete(this.props.navigation, value)}}
                  >
                    <Text style = {ChangeEmailStyles.updateText}>Complete</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <Text style = {ChangeEmailStyles.errorTitle}>You have been logged for too long</Text>
                  <Text style = {ChangeEmailStyles.errorSubtitle}>For sensitive operations it is required to reauthenticate</Text>
                  <Text style = {ChangeEmailStyles.errorSubtitle}>Please input your password</Text>
                  <TextInput
                    style={ChangeEmailStyles.modalInput}
                    placeholder="Password"
                    placeholderTextColor={'#626262'}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                  <TouchableOpacity 
                    style = {ChangeEmailStyles.modalButtom}
                    onPress={() => {handleLogin(this.props.navigation, value)}}
                  >
                    <Text style = {ChangeEmailStyles.updateText}>Login</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Modal>

          <ImageBackground
            source={require('../../Images/LoginBackground.png')} // Replace with your image path
            style={ChangeEmailStyles.imageBackground}
            resizeMode="cover" // You can adjust the resizeMode property as needed
          >
          
          <View style = {ChangeEmailStyles.containerHeader}>
            <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                  style={ChangeEmailStyles.backButton}
                >
                  <Text><Ionicons name="chevron-back-sharp" size={30} color="black" /></Text>
            </TouchableOpacity>

            <Text style={ChangeEmailStyles.title}>Change Email</Text>
          </View>

          <Text style={ChangeEmailStyles.subTitle}>Enter your email</Text>

          {invalidEmail !== null && ( // Checking if the variable is not null
            <Text style = {ChangeEmailStyles.invalidInput}>{invalidEmail}</Text>
          )}
          <TextInput
            style={ChangeEmailStyles.input}
            placeholder="Email"
            placeholderTextColor={'#626262'}
            value={email}
            onChangeText={setEmail}
          />

          {invalidConfirmEmail !== null && ( // Checking if the variable is not null
            <Text style = {ChangeEmailStyles.invalidInput}>{invalidConfirmEmail}</Text>
          )}
          <TextInput
            style={ChangeEmailStyles.input}
            placeholder="Confirm Email"
            placeholderTextColor={'#626262'}
            value={confirmEmail}
            onChangeText={setConfirmEmail}
          />

          <TouchableOpacity style = {ChangeEmailStyles.recover} onPress={() => {handleSubmit(this.props.navigation, value)}}>
            <Text style = {ChangeEmailStyles.updateText}>Update</Text>
          </TouchableOpacity>
    
          </ImageBackground>
        </View>
      )}
      </NetworkContext.Consumer>
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
    flex:1,
    alignItems:'center',
    backgroundColor:'white'
  },
  subContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:moderateScale(20),
  },
  containerHeader:{
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
    color:'#000',
    fontSize:scale(25),
    alignSelf:'center',
    textAlign:'center',
    marginRight:scale(55),
    fontFamily:'Poppins-Bold',
  },
  subTitle: {
    color:'#494949',
    fontSize:scale(16),
    textAlign:'center',
    fontFamily:'Poppins-Medium',
    marginBottom:verticalScale(40),
  },
  input: {
    width:width*0.8,
    borderRadius:30,
    alignSelf:'center',
    paddingLeft:scale(20),
    height:verticalScale(40),
    backgroundColor:'#F1F4FF',
    fontFamily:'Poppins-Light',
    marginVertical:verticalScale(10),
  },
  recover: {
    width:width*0.8,
    borderRadius:30,
    alignSelf:'center',
    justifyContent:'center',
    height:verticalScale(45),
    backgroundColor:'#23C2DF',
    marginTop:verticalScale(40),
    marginBottom:verticalScale(10),
  },
  modalButtom:{
    width:width*0.8,
    borderRadius:30,
    alignSelf:'center',
    justifyContent:'center',
    height:verticalScale(40),
    backgroundColor:'#23C2DF',
    marginTop:verticalScale(40),
    marginBottom:verticalScale(10),
  },
  modalInput: {
    width:width*0.8,
    borderRadius:30,
    alignSelf:'center',
    height:verticalScale(40),
    backgroundColor:'#F1F4FF',
    fontFamily:'Poppins-Medium',
    paddingLeft:verticalScale(20),
    marginVertical:verticalScale(20),
  },
  updateText:{
    color:'#FFF',
    fontSize:scale(16),
    textAlign:'center', 
    fontFamily:'Poppins-SemiBold',
  },
  invalidInput:{
    color:'red',
    fontSize:scale(12),
    textAlign:'center',
    fontFamily:'Poppins-Medium',
  },
  backButton:{
    borderRadius:30,
    alignItems:'center',
    marginLeft:scale(10),
    backgroundColor:'#fff',
    width:moderateScale(45),
    justifyContent:'center',
    height:moderateScale(45),
  },
  errorTitle:{
    fontSize:scale(16),
    textAlign:'center',
    margin:moderateScale(40), 
    fontFamily:'Poppins-Bold',
  },
  errorSubtitle:{
    fontSize:scale(13),
    textAlign:'center',
    fontFamily:'Poppins-Medium',
  },
})