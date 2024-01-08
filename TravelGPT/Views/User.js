/*

User.js 

  -> Handles the login
  -> Handles user creation

*/




/******************** Imports Section ********************/ 

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable, TouchableOpacity } from 'react-native';

import { initializeApp } from "firebase/app";
import {getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithIdToken} from 'firebase/auth';
import {firebaseConfig} from '../firebase-config';
import { Ionicons } from '@expo/vector-icons';

/******************* Global Variables ********************/




/*********************** Classes *************************/

/* 

  Login screen of the app
  Allows the user to input username/password

*/
export class LoginUserScreen extends React.Component{
  
  LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });

    const handleSubmit = async () => {
      await signInWithEmailAndPassword(auth,email,password)
        .then(() => {
          console.log('Signed In');
          this.props.navigation.navigate('Plans');
        })
        .catch(error => {
          console.log(error);
        })
    };

    const signInGoogle = async () => {
      
    };

    return (
      <View style={LoginUserStyles.container}>
        <Text style={LoginUserStyles.title}>Login here</Text>

        <Text style={LoginUserStyles.subTitle}>Welcome back you've been missed!</Text>
  
        <TextInput
          style={LoginUserStyles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
  
        <TextInput
          style={LoginUserStyles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={LoginUserStyles.forgotPassword}>Forgot your password?</Text>
  
        <TouchableOpacity style = {LoginUserStyles.signIn} onPress={handleSubmit}>
          <Text style = {{fontSize:20, fontWeight:600, textAlign:'center', color:'#FFFFFF'}}>Sign In</Text>
        </TouchableOpacity>
  
  
        
        <Pressable onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={LoginUserStyles.createAccount}>Create new account</Text>
        </Pressable>
  
        <Text style = {LoginUserStyles.continueWith}>Or continue with</Text>
  
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 15 }}>
          <TouchableOpacity style = {{padding:10}}>
            <Text><Ionicons name={"logo-google"} size={30} color="black" /> {/* Replace 'ios-heart' with the desired Ionicons name */}</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {{padding:10}}>
            <Text><Ionicons name={"logo-facebook"} size={30} color="black" /> {/* Replace 'ios-star' with the desired Ionicons name */}</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {{padding:10}}>
            <Text><Ionicons name={"logo-apple"} size={30} color="black" /> {/* Replace 'ios-settings' with the desired Ionicons name */}</Text>
          </TouchableOpacity>
        </View>

      </View>
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
    
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
    
    const handleSubmit = async () => {
      if(( email && password) && (password == confirmPassword)){
       
          await createUserWithEmailAndPassword(auth,email,password)
          .then(() =>{
            console.log('Account Created!');
            this.props.navigation.navigate('Login');
          })
          .catch(error => { console.log(error)})
      }
    };
  
    return (
      <View style={RegisterUserStyles.container}>
        <Text style={RegisterUserStyles.title}>Create Account</Text>
  
        <Text style={RegisterUserStyles.subTitle}>Create an account so you can explore all the existing jobs</Text>

        <TextInput
          style={RegisterUserStyles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={RegisterUserStyles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
  
        <TextInput
          style={RegisterUserStyles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
  
        <TextInput
          style={RegisterUserStyles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
  
        <TouchableOpacity 
          style = {RegisterUserStyles.signUp}
          onPress={handleSubmit}
        >
          <Text style = {{fontSize:20, fontWeight:600, textAlign:'center', color:'#FFFFFF'}}>Sign Up</Text>
        </TouchableOpacity>
  
        <Pressable onPress = {() => {this.props.navigation.navigate('Login')}}>
          <Text style={RegisterUserStyles.alreadyHaveAccount}>Already have an account</Text>
        </Pressable>

        <Text style = {RegisterUserStyles.continueWith}>Or continue with</Text>
  
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 15 }}>
          <TouchableOpacity style = {{padding:10}}>
            <Text><Ionicons name={"logo-google"} size={30} color="black" /> {/* Replace 'ios-heart' with the desired Ionicons name */}</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {{padding:10}}>
            <Text><Ionicons name={"logo-facebook"} size={30} color="black" /> {/* Replace 'ios-star' with the desired Ionicons name */}</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {{padding:10}}>
            <Text><Ionicons name={"logo-apple"} size={30} color="black" /> {/* Replace 'ios-settings' with the desired Ionicons name */}</Text>
          </TouchableOpacity>
        </View>

      </View>
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
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:100,
    color:'#1F41BB'
  },
  subTitle:{
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 70,
    color:'#000000',
    textAlign:'center',
    width:'50%'
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#1F41BB',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius:10
  },
  forgotPassword: {
    textAlign: 'right',
    marginBottom: 20,
    marginTop: 20,
    fontSize: 14,
    fontWeight: 600,
    color:'#1F41BB'
  },
  createAccount: {
    marginTop: 5,
    textAlign: 'center',
    fontSize:14,
    fontWeight: 600,
  },
  socialLogin: {
    marginTop: 20,
  },
  continueWith: {
    textAlign:'center',
    fontSize:14,
    color:'#1F41BB',
    fontWeight:600,
    marginTop:50
  },
  signIn: {
    width: '80%',
    height: 50,
    backgroundColor:'#4E55FF',
    padding: 10,
    marginBottom: 20,
    borderRadius:10
  },
})

const RegisterUserStyles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:100,
    color:'#1F41BB'
  },
  subTitle: {
    fontSize: 14,
    marginBottom: 60,
    color:'#000000',
    textAlign:'center'
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#1F41BB',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius:10
  },
  alreadyHaveAccount: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
    color:'#000000'
  },
  signUp: {
    width: '80%',
    height: 50,
    backgroundColor:'#4E55FF',
    padding: 10,
    marginBottom: 20,
    borderRadius:10
  },
  continueWith:{
    textAlign:'center',
    fontSize:14,
    color:'#1F41BB',
    fontWeight:600,
    marginTop:30
  }
 
})