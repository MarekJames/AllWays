/*

User.js 

  -> Handles the login
  -> Handles user creation

*/




/******************** Imports Section ********************/ 

import React, { useState} from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity, ImageBackground } from 'react-native';

 import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
 import { getAuth } from '../config/firebase-config';
import  Ionicons  from '@expo/vector-icons/Ionicons';
//import { GoogleSignin } from '@react-native-google-signin/google-signin';

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
    
    const [invalidEmail, setInvalidEmail] = useState('');
    const [invalidPassword, setInvalidPassword] = useState('');

    const signInGoogle = async () => {
    //   try {
    //     await GoogleSignin.configure({
    //       scopes: ['https://www.googleapis.com/auth/userinfo.email'],
    //     });
    //     const { idToken } = await GoogleSignin.signIn();
    //     firebase.auth().signInWithIdToken(idToken);
    //     setIsLoggedIn(true);
    //   } catch (error) {
    //     console.error('Google Sign-in error:', error);
    //   }
    };
    
    const handleSubmit = async () => {
      if(email && password){
        await signInWithEmailAndPassword(getAuth(),email,password)
          .then((response) => {
            console.log('Signed In : ' + response.user.uid);
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
              alert('Something went wrong, please try again')
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
        alert('Something went wrong, please try again');
      }
    };

    const handleFacebookLogin = async () => {
     
      // LoginManager.logInWithPermissions(["public_profile"]).then(
      //   function(result) {
      //     if (result.isCancelled) {
      //       console.log("Login cancelled");
      //     } else {
      //       console.log(
      //         "Login success with permissions: " +
      //           result.grantedPermissions.toString()
      //       );
      //     }
      //   },
      //   function(error) {
      //     console.log("Login fail with error: " + error);
      //   }
      // );
    }

    return (
      <View style={LoginUserStyles.container}>

        <ImageBackground
          source={require('../Images/LoginBackground.png')} // Replace with your image path
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

        <Text style={LoginUserStyles.forgotPassword}>Forgot your password?</Text>
  
        <TouchableOpacity style = {LoginUserStyles.signIn} onPress={handleSubmit}>
          <Text style = {{fontSize:20, fontWeight:'600', textAlign:'center', color:'#FFFFFF'}}>Sign In</Text>
        </TouchableOpacity>
  
  
        
        <Pressable onPress={() => {this.props.navigation.reset({ index: 0,routes: [{ name: 'Register' }]})}}>
          <Text style={LoginUserStyles.createAccount}>Create new account</Text>
        </Pressable>
  
        <Text style = {LoginUserStyles.continueWith}>Or continue with</Text>
  
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <TouchableOpacity style = {LoginUserStyles.icons} onPress = {signInGoogle}>
            <Text><Ionicons name={"logo-google"} size={30} color="black" /> </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress = {handleFacebookLogin} style = {LoginUserStyles.icons}>
            <Text><Ionicons name={"logo-facebook"} size={30} color="black" /></Text>
          </TouchableOpacity>
          <TouchableOpacity style = {LoginUserStyles.icons} >
            <Text><Ionicons name={"logo-instagram"} size={30} color="black" /></Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
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
    
    const [invalidEmail, setInvalidEmail] = useState ('');
    const [invalidPassword, setInvalidPassword] = useState ('');
    const [invalidName, setInvalidName] = useState ('');
    const [invalidConfirmPassword, setInvalidConfirmPassword] = useState ('');

    const handleSubmit = async () => {
      if(( name && email && password && confirmPassword) && (password == confirmPassword)){
       
          await createUserWithEmailAndPassword(getAuth(),email,password)
          .then((response) =>{
            console.log("User uid: " + response.user.uid);

            updateProfile(response.user, {
              displayName: name,
            }).then(() => {
              // Additional information updated successfully
              console.log('User created successfully with additional information');
              this.props.navigation.navigate('Tabs', {userUID: response.user.uid});

            }).catch((error) => {
              // Handle errors related to updating user profile
              console.error('Error updating user profile:', error.message);
            });
          })
          .catch(error => {
            if(error.code == 'auth/invalid-email'){
              setInvalidEmail('Invalid email, try again');
              setInvalidPassword('');
              setInvalidName('');
              setInvalidConfirmPassword('');
            }

            else if(error.code == 'auth/weak-password'){
              setInvalidPassword('Invalid password, should be at least 6 characters')
              setInvalidEmail('');
              setInvalidName('');
              setInvalidConfirmPassword('');
            }
            else if(error.code == 'auth/email-already-in-use'){
              setInvalidEmail('This email already exists')
              setInvalidConfirmPassword('')
              setInvalidName('');
              setInvalidPassword('');
            }
            else alert(error);
          })
      }
      else if(!name){
        setInvalidName('Please input your name');
        setInvalidConfirmPassword('');
        setInvalidEmail('');
        setInvalidPassword('');
      }
      else if(!email){
        setInvalidEmail('Please input your email')
        setInvalidConfirmPassword('');
        setInvalidName('');
        setInvalidPassword('');
      }
      else if(!password){
        setInvalidPassword('Please input your password')
        setInvalidEmail('')
        setInvalidConfirmPassword('');
        setInvalidName('');
  
      }
      else if(!confirmPassword){
        setInvalidConfirmPassword('Please input your password confirmation')
        setInvalidEmail('')
        setInvalidName('');
        setInvalidPassword('');
      }
      else if(password!=confirmPassword){
        setInvalidConfirmPassword('Your password and password confirmation are not the same')
        setInvalidEmail('')
        setInvalidName('');
        setInvalidPassword('');
      }
    };

    return (
      <View style={RegisterUserStyles.container}>
       <ImageBackground
          source={require('../Images/LoginBackground.png')} // Replace with your image path
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
  
        <TouchableOpacity 
          style = {RegisterUserStyles.signUp}
          onPress={handleSubmit}
        >
          <Text style = {{fontSize:20, fontWeight:'600', textAlign:'center', color:'#FFFFFF'}}>Sign Up</Text>
        </TouchableOpacity>
  
        <Pressable onPress={() => {this.props.navigation.reset({ index: 0,routes: [{ name: 'Login' }]})}}>
          <Text style={RegisterUserStyles.alreadyHaveAccount}>Already have an account</Text>
        </Pressable>

        <Text style = {RegisterUserStyles.continueWith}>Or continue with</Text>
  
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
        </View>
        </ImageBackground>
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
    backgroundColor:'white'
  },
  imageBackground:{
    flex:1,
    width: '100%', // You can adjust width and height as needed
    height: '100%',
},
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:100,
    color:'#23C2DF',
    alignSelf:'center'
  },
  subTitle:{
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 70,
    color:'#494949',
    textAlign:'center',
    width:'50%',
    alignSelf:'center'
  },
  input: {
    width: '80%',
    height: 50,
    paddingLeft: 20,
    marginBottom: 20,
    borderRadius:30,
    alignSelf:'center',
    backgroundColor:'#F1F4FF'
  },
  forgotPassword: {
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
    fontSize: 14,
    fontWeight: '600',
    color:'#23C2DF'
  },
  createAccount: {
    marginTop: 5,
    textAlign: 'center',
    fontSize:14,
    color:'#494949',
    fontWeight: '600',
  },
  socialLogin: {
    marginTop: 20,
  },
  continueWith: {
    textAlign:'center',
    fontSize:14,
    color:'#23C2DF',
    fontWeight:'600',
    marginTop:50
  },
  signIn: {
    width: '80%',
    height: 50,
    backgroundColor:'#23C2DF',
    padding: 10,
    marginBottom: 20,
    borderRadius:30,
    alignSelf:'center'
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

const RegisterUserStyles = StyleSheet.create ({
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
    marginBottom: 20,
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
  signUp: {
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