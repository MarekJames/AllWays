/*

User.js 

  -> Handles the login
  -> Handles user creation

*/




/******************** Imports Section ********************/ 

import React, { useState } from 'react';
import { CheckBox } from 'react-native-elements';
import { getAuth, sendValidationEmail } from '../../config/firebase-config';
import { NetworkContext, showNetworkError } from '../../config/network-config';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity, ImageBackground} from 'react-native';




/*********************** Classes *************************/

/* 

  Login screen of the app
  Allows the user to input username/password

*/

export class LoginUserScreen extends React.Component{
  
  LoginScreen = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidEmail, setInvalidEmail] = useState('');
    const [invalidPassword, setInvalidPassword] = useState('');

    const signInGoogle = async () => {
      /* try {
        await GoogleSignin.configure({
          scopes: ['https://www.googleapis.com/auth/userinfo.email'],
        });
        const { idToken } = await GoogleSignin.signIn();
        firebase.auth().signInWithIdToken(idToken);
      } catch (error) {
        console.error('Google Sign-in error:', error);
      } */
    };
    
    const handleSubmit = async (navigation, isConnected) => {
      if(isConnected){
        if(email && password){
          await signInWithEmailAndPassword(getAuth(),email.trim(),password.trim())
            .then((response) => {
              this.props.navigation.push('Tabs');
            })
            .catch(error => {
              if(error.code == 'auth/invalid-email'){
                setInvalidEmail('Invalid email, try again');
                setInvalidPassword('');
              }
              else if(error.code == 'auth/invalid-credential'){
                setInvalidEmail('Invalid email or password, try again');
                setInvalidPassword('');
              }
              else if(error.code == 'auth/too-many-requests'){
                setInvalidEmail('');
                setInvalidPassword('Too many atempts, wait a few minutes and try again');
              }
              else{
                showNetworkError(navigation, 'Other');
              }
            })
        }
        else if(!email){
          setInvalidEmail('Please input a valid email');
          setInvalidPassword('');
        }
        else if(!password){
          setInvalidPassword('Please input a password');
          setInvalidEmail('');
        }
        else{
          showNetworkError(navigation, 'Other');
        }
      }
      else{
        showNetworkError(navigation, 'Network');
      }
    };

    return (
      <NetworkContext.Consumer>
      {(value) => (
        <View style={LoginUserStyles.container}>

          <ImageBackground
            source={require('../../Images/LoginBackground.png')} // Replace with your image path
            style={RegisterUserStyles.imageBackground}
            resizeMode="cover" // You can adjust the resizeMode property as needed
          >

          <Text style={LoginUserStyles.title}>Login here</Text>

          <Text style={LoginUserStyles.subTitle}>Welcome back you've been missed!</Text>

          {invalidEmail !== null && ( // Checking if the variable is not null
            <Text style = {{color:'red',fontSize:12,fontWeight:'600', textAlign:'center'}}>{invalidEmail}</Text>
          )}
          <TextInput
            style={LoginUserStyles.input}
            placeholder="Email"
            placeholderTextColor={'#626262'}
            value={email}
            onChangeText={setEmail}
          />

          {invalidPassword !== null && ( // Checking if the variable is not null
            <Text style = {{color:'red',fontSize:12,fontWeight:'600',textAlign:'center'}}>{invalidPassword}</Text>
          )}
          <TextInput
            style={LoginUserStyles.input}
            placeholder="Password"
            placeholderTextColor={'#626262'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity onPress={ () => {this.props.navigation.navigate('ForgotPassword')}}>
            <Text style={LoginUserStyles.forgotPassword}>Forgot your password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {LoginUserStyles.signIn} onPress={() => {handleSubmit(this.props.navigation, value)}}>
            <Text style = {LoginUserStyles.signInText}>Sign In</Text>
          </TouchableOpacity>
    
          <Pressable onPress={() => {this.props.navigation.reset({ index: 0,routes: [{ name: 'Register' }]})}}>
            <Text style={LoginUserStyles.createAccount}>Create new account</Text>
          </Pressable>
    
          {/* <Text style = {LoginUserStyles.continueWith}>Or continue with</Text>
    
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
              <TouchableOpacity style = {LoginUserStyles.icons} onPress = {signInGoogle}>
                  <Text><Ionicons name="logo-google" size={30} color="black" /></Text>
              </TouchableOpacity>
              <TouchableOpacity style = {LoginUserStyles.icons}>
                  <Text><Ionicons name="logo-facebook" size={30} color="black" /></Text>
              </TouchableOpacity>
              <TouchableOpacity style = {LoginUserStyles.icons}>
                  <Ionicons name="logo-instagram" size={30} color="black" />
              </TouchableOpacity>
          </View> */}
        </ImageBackground>
        </View>
      )}
      </NetworkContext.Consumer>
    );
  };

  render() {  
    return (
      <this.LoginScreen></this.LoginScreen>
    )    
  }
}

/* 

  User registration screen
  Allows the user to create a new account
           
*/
export class RegisterUserScreen extends React.Component{
  
  RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [invalidEmail, setInvalidEmail] = useState ('');
    const [invalidPassword, setInvalidPassword] = useState ('');
    const [invalidName, setInvalidName] = useState ('');
    const [invalidConfirmPassword, setInvalidConfirmPassword] = useState ('');
    const [checkTerms, setCheckTerms] = useState ('');

    const [isChecked, setIsChecked] = React.useState(false);

    const handleSubmit = async (navigation, isConnected) => {
      if(isConnected){
        if(( name && email && password && confirmPassword) && (password == confirmPassword) && isChecked){
        
            await createUserWithEmailAndPassword(getAuth(),email.trim(),password.trim())
            .then((response) =>{

              updateProfile(response.user, {
                displayName: name,
              }).then(() => {
                // Additional information updated successfully
                this.props.navigation.navigate('Tabs', {userUID: response.user.uid});

              }).catch((error) => {
                console.error('Error updating user profile:', error.message);
                showNetworkError(navigation, error.message);
              });

              // Send verification email to user
              sendValidationEmail();
            })
            .catch(error => {
              if(error.code == 'auth/invalid-email'){
                setInvalidEmail('Invalid email, try again');
                setInvalidPassword('');
                setInvalidName('');
                setInvalidConfirmPassword('');
                setCheckTerms('');
              }

              else if(error.code == 'auth/weak-password'){
                setInvalidPassword('Invalid password, should be at least 6 characters')
                setInvalidEmail('');
                setInvalidName('');
                setInvalidConfirmPassword('');
                setCheckTerms('');
              }
              else if(error.code == 'auth/email-already-in-use'){
                setInvalidEmail('This email already exists')
                setInvalidConfirmPassword('')
                setInvalidName('');
                setInvalidPassword('');
                setCheckTerms('');
              }
              else{
                showNetworkError(navigation, 'Other');
              }
            })
        }
        else if(!name){
          setInvalidName('Please input your name');
          setInvalidConfirmPassword('');
          setInvalidEmail('');
          setInvalidPassword('');
          setCheckTerms('');
        }
        else if(!email){
          setInvalidEmail('Please input your email')
          setInvalidConfirmPassword('');
          setInvalidName('');
          setInvalidPassword('');
          setCheckTerms('');
        }
        else if(!password){
          setInvalidPassword('Please input your password')
          setInvalidEmail('')
          setInvalidConfirmPassword('');
          setInvalidName('');
          setCheckTerms('');
    
        }
        else if(!confirmPassword){
          setInvalidConfirmPassword('Please input your password confirmation')
          setInvalidEmail('')
          setInvalidName('');
          setInvalidPassword('');
          setCheckTerms('');
        }
        else if(password!=confirmPassword){
          setInvalidConfirmPassword('Your password and password confirmation are not the same')
          setInvalidEmail('')
          setInvalidName('');
          setInvalidPassword('');
          setCheckTerms('');
        }
        else if(!isChecked){
          setInvalidConfirmPassword('')
          setInvalidEmail('')
          setInvalidName('');
          setInvalidPassword('');
          setCheckTerms('Please accept the Terms & Conditions')
        }
      }
      else{
        showNetworkError(navigation, 'Network');
      }
    };

    return (
      <NetworkContext.Consumer>
      {(value) => (
      
        <View style={RegisterUserStyles.container}>
          <ImageBackground
            source={require('../../Images/LoginBackground.png')}
            style={RegisterUserStyles.imageBackground}
            resizeMode="cover" // You can adjust the resizeMode property as needed
          >
          <Text style={RegisterUserStyles.title}>Create Account</Text>
    
          <Text style={RegisterUserStyles.subTitle}>So you can explore this beautiful world!</Text>

          {invalidName !== null && ( // Checking if the variable is not null
            <Text style = {{color:'red',fontSize:12,fontWeight:'600',textAlign:'center'}}>{invalidName}</Text>
          )}
          <TextInput
            style={RegisterUserStyles.input}
            placeholderTextColor={'#626262'}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />

          {invalidEmail !== null && ( // Checking if the variable is not null
            <Text style = {{color:'red',fontSize:12,fontWeight:'600',textAlign:'center'}}>{invalidEmail}</Text>
          )}
          <TextInput
            style={RegisterUserStyles.input}
            placeholder="Email"
            placeholderTextColor={'#626262'}
            value={email}
            onChangeText={setEmail}
          />
        
          {invalidPassword !== null && ( // Checking if the variable is not null
            <Text style = {{color:'red',fontSize:12,fontWeight:'600',textAlign:'center'}}>{invalidPassword}</Text>
          )}
          <TextInput
            style={RegisterUserStyles.input}
            placeholder="Password"
            placeholderTextColor={'#626262'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {invalidConfirmPassword !== null && ( // Checking if the variable is not null
            <Text style = {{color:'red',fontSize:12,fontWeight:'600',textAlign:'center'}}>{invalidConfirmPassword}</Text>
          )}
          <TextInput
            style={RegisterUserStyles.input}
            placeholder="Confirm Password"
            placeholderTextColor={'#626262'}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {checkTerms !== null && ( // Checking if the variable is not null
            <Text style = {{color:'red',fontSize:12,fontWeight:'600',textAlign:'center'}}>{checkTerms}</Text>
          )}

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'flex-start', marginHorizontal:scale(20)}}>
              <CheckBox
                checked={isChecked}
                onPress={() => setIsChecked(!isChecked)}
              />
              <TouchableOpacity onPress={() => this.props.navigation.navigate('TermsConditions')}>
                <Text style={{ color: '#626262', textDecorationLine: 'underline' }}>I agree to the Terms & Conditions</Text>
              </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style = {RegisterUserStyles.signUp}
            onPress={() => {handleSubmit(this.props.navigation, value)}}
          >
            <Text style = {RegisterUserStyles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
    
          <Pressable onPress={() => {this.props.navigation.reset({ index: 0,routes: [{ name: 'Login' }]})}}>
            <Text style={RegisterUserStyles.alreadyHaveAccount}>Already have an account</Text>
          </Pressable>

          {/* <Text style = {RegisterUserStyles.continueWith}>Or continue with</Text>
    
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
              <TouchableOpacity style = {RegisterUserStyles.icons}>
                  <Text><Ionicons name="logo-google" size={30} color="black" /></Text>
              </TouchableOpacity>
              <TouchableOpacity style = {RegisterUserStyles.icons}>
                  <Text><Ionicons name="logo-facebook" size={30} color="black" /></Text>
              </TouchableOpacity>
              <TouchableOpacity style = {RegisterUserStyles.icons}>
                  <Ionicons name="logo-instagram" size={30} color="black" />
              </TouchableOpacity>
          </View> */}
          
          </ImageBackground>
        </View>
      )}
      </NetworkContext.Consumer>
    );
  };

  render() {  
    return (
      <this.RegisterScreen></this.RegisterScreen>
    )    
  }
}




/********************* Stylesheets ***********************/

const LoginUserStyles = StyleSheet.create ({
  container: {
    flex:1,
    alignItems:'center',
    backgroundColor:'white'
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
    marginBottom:verticalScale(20),
  },
  subTitle:{
    width:'50%',
    color:'#494949',
    textAlign:'center',
    alignSelf:'center',
    fontSize:scale(16),
    fontFamily:'Poppins-SemiBold',
    marginBottom:verticalScale(70),
  },
  input: {
    width:'80%',
    borderRadius:30,
    alignSelf:'center',
    height:verticalScale(40),
    backgroundColor:'#F1F4FF',
    fontFamily:'Poppins-Light',
    paddingLeft:scale(20),
    marginBottom:verticalScale(10),
  },
  forgotPassword: {
    color:'#23C2DF',
    fontSize:scale(13),
    textAlign:'center',
    marginTop:moderateScale(10),
    fontFamily:'Poppins-SemiBold',
    marginBottom:moderateScale(20),
  },
  forgotPasswordModal:{
    top:'32.5%',
    width:'90%',
    height:'35%',
    borderWidth:1,
    borderRadius:30,
    alignSelf:'center',
    alignItems:'center',
    borderColor:'#23C2DF',
    justifyContent:'center',
    backgroundColor:'rgba(220, 220, 220, 0.95)',
  },
  createAccount: {
    color:'#494949',
    textAlign:'center',
    fontSize:scale(13),
    marginTop:moderateScale(5),
    fontFamily:'Poppins-SemiBold',
  },
  socialLogin: {
    marginTop:moderateScale(20),
  },
  continueWith: {
    color:'#23C2DF',
    textAlign:'center',
    fontSize:scale(13),
    marginTop:moderateScale(50),
    fontFamily:'Poppins-SemiBold',
  },
  signIn: {
    width:'80%',
    borderRadius:30,
    alignSelf:'center',
    justifyContent:'center',
    height:verticalScale(45),
    backgroundColor:'#23C2DF',
    fontFamily:'Poppins-SemiBold',
    marginBottom:verticalScale(20),
  },
  icons:{
    width:scale(60), 
    borderRadius:10, 
    alignItems:'center', 
    justifyContent:'center', 
    height:verticalScale(45), 
    backgroundColor:'#ECECEC',
    marginHorizontal:scale(10),
  },
  signInText:{
    color:'#FFFFFF',
    fontSize:scale(16),
    textAlign:'center',
    fontFamily:'Poppins-Medium'
  }
})

const RegisterUserStyles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    backgroundColor:'white'
  },
  imageBackground:{
    flex:1,
    width:'100%',
    height:'100%',
  },
  title: {
    fontSize:scale(25),
    color:'#23C2DF',
    alignSelf:'center',
    fontFamily:'Poppins-Bold',
    marginTop:verticalScale(50),
    marginBottom:verticalScale(10),
  },
  subTitle: {
    color:'#494949',
    fontSize:scale(16),
    textAlign:'center',
    fontFamily:'Poppins-Medium',
    marginBottom:verticalScale(30),
    marginHorizontal:verticalScale(20),
  },
  input: {
    width:'80%',
    borderRadius:30,
    alignSelf:'center',
    paddingLeft:scale(20),
    height:verticalScale(40),
    backgroundColor:'#F1F4FF',
    fontFamily:'Poppins-Light',
    marginBottom:verticalScale(10),
  },
  alreadyHaveAccount: {
    color:'#494949',
    textAlign:'center',
    fontSize:scale(13),
    fontFamily:'Poppins-Medium',
    marginTop:verticalScale(20),
  },
  signUp: {
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
  continueWith:{
    marginTop:30,
    color:'#23C2DF',
    textAlign:'center',
    fontSize:scale(13),
  },
  icons:{
    width:scale(60), 
    borderRadius:10, 
    alignItems:'center', 
    justifyContent:'center', 
    height:verticalScale(40), 
    backgroundColor:'#ECECEC',
    marginHorizontal:verticalScale(10),
  },
  signUpText:{
    color:'#FFFFFF',
    fontSize:scale(16),
    textAlign:'center',
    fontFamily:'Poppins-Medium',
  }
})