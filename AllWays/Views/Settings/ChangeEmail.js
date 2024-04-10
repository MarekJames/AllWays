/*

ChangeEmail.js 

  -> Handles update of the users email

*/




/******************** Imports Section ********************/ 

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Modal, ActivityIndicator } from 'react-native';
import { updateUserEmail, getAuth, verifyBeforeUpdate, reauthenticateUser } from '../../config/firebase-config';
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
    const [password, setPassword] = useState('');
    const [invalidConfirmEmail, setInvalidConfirmEmail] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isRecentLogin, setIsRecentLogin] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const handleLogin = async () => {

      // Reauthenticate user with provided password
      const resultReauthenticate = await reauthenticateUser(password);
      
      // If success close modal
      if(resultReauthenticate == 'success'){
        setIsModalVisible(!isModalVisible);
        setIsRecentLogin(!isRecentLogin);
      }
    }

    const handleComplete = async () => {
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
        }
      }
      else{
        console.log(user.email + ":" + user.emailVerified);
      }
    }

    const handleVerifyEmailError = async (error) => {
      if(error == 'auth/requires-recent-login'){
        
        // Show modal
        setIsModalVisible(!isModalVisible);

        // Set recent login
        setIsRecentLogin(!isRecentLogin);
      }
    }

    const handleSubmit = async (navigator) => {
        
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
            const result = await updateUserEmail(email);
            if(result == 'success'){
              navigator.replace('Profile', {email : email});
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
              const resultVerify = await verifyBeforeUpdate(email);
              
              // If email is sent successfully
              if(resultVerify == 'success'){
                
                // Show modal 
                setIsModalVisible(true);
              }
              else{

                // Send to Error handler
                handleVerifyEmailError(resultVerify);
              }
            }
        }
    }

    return (
      <View style={ChangeEmailStyles.container}>

        <Modal
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={{ padding: 20 }}>

            {/* Show email validation OR Login reauthenticate */}
            {!isRecentLogin ? (
              <View>
                <Text>Please verify your new email</Text>
                <Text>An email has been sent to your new email. Verify it and click to complete.</Text>
                <ActivityIndicator>
                </ActivityIndicator>
                <TouchableOpacity 
                  style = {ChangeEmailStyles.recover}
                  onPress={() => {handleComplete()}}
                >
                  <Text style = {{fontSize:20, fontWeight:'600', textAlign:'center', color:'#FFFFFF'}}>Complete</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text>You have been logged for too long</Text>
                <Text>For sensitive operations it is required to reauthenticate.</Text>
                <Text>Please input your password</Text>
                <TextInput
                  style={ChangeEmailStyles.input}
                  placeholder="Password"
                  placeholderTextColor={'#626262'}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                <TouchableOpacity 
                  style = {ChangeEmailStyles.recover}
                  onPress={() => {handleLogin()}}
                >
                  <Text style = {{fontSize:20, fontWeight:'600', textAlign:'center', color:'#FFFFFF'}}>Login</Text>
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