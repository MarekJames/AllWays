/*

Profile.js 

  -> Shows profile of the user and settings

*/




/******************** Imports Section ********************/ 

import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import UserAvatar from 'react-native-user-avatar';
import  Ionicons  from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';




/******************** Global Variables *******************/ 

// Set of options for settings
const optionsSettings = [
  { name: 'Account'},
];

// Set of options for general
const optionsGeneral = [
  { name: 'Help Center'},
  { name: 'Terms & Conditions'}
];




/************************ Classes ************************/ 

// Profile Screen
export class ProfileScreen extends React.Component{

  // Function that shows the profile screen
  Profile = () => {

    // Variables to store name, email and error messages
    var lastName; 
    var nameParts;
    var firstName;
    const [userEmail, setEmail] = useState('');
    const [fullName, setFullName] = useState('');

    // Handle Logout button
    const handleLogout =  () => {

      // Call sign out function
      getAuth().signOut();
    }

    // Runs when the screen is focused (is shown)
    useFocusEffect(
      React.useCallback(() => {

        // Get user
        var user = getAuth().currentUser;

        // Reload to get latest values
        user.reload();

        // Get user name and email
        var name = getAuth().currentUser.displayName;
        var email = getAuth().currentUser.email;

        // Parse name into first and last name
        nameParts = name.split(" ");
        firstName = nameParts[0];
        lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
        
        // Set values
        setEmail(email);
        setFullName(firstName + " " + lastName);
      }, [])
    );

    return (
      <ImageBackground source = {require('../../Images/BackgroundHome.png')} style = {{ backgroundColor:'#fff',flex:1, width:'100%',height:'13%'}}>

          {/* Avatar Name and Email */}
          <View style={ProfileScreenStyles.profileContainer}>
            <UserAvatar borderRadius={100} size={100} name={fullName} bgColors={['#A0A0A0']}/>  
            <Text style={ProfileScreenStyles.userName}>{fullName}</Text>
            <Text style={ProfileScreenStyles.email}>{userEmail}</Text>
          </View>
          
          {/* First set of options - Settings*/}
          <View style={ProfileScreenStyles.optionsContainer}>
            <Text style={ProfileScreenStyles.optionTitle}>Settings</Text>
            {optionsSettings.map((option, index) => (
              <View key = {index}>
                <TouchableOpacity onPress={()=> {
                    if(option.name ==  'Account'){
                      this.props.navigation.navigate('AccountSettings')
                    }
                  }} style={ProfileScreenStyles.optionItem} key={index}>
                  <Text style={ProfileScreenStyles.optionName}>{option.name}</Text>
                  <Ionicons size={20} color={'#9F9F9F'} name = {'chevron-forward-sharp'}/>
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: '#C2C2C2', marginVertical:5}} />
              </View>
            ))}
          </View>

          {/* Second set of options - General*/}
          <View style={ProfileScreenStyles.optionsContainer}>
            <Text style={ProfileScreenStyles.optionTitle}>General</Text>
            {optionsGeneral.map((option, index) => (
              <View key = {index}>
                <TouchableOpacity onPress={()=> {
                    if(option.name ==  'Help Center'){
                      this.props.navigation.navigate('HelpCenter')
                    }
                    if(option.name ==  'Terms & Conditions'){
                      this.props.navigation.navigate('TermsConditions')
                    }
                  }} style={ProfileScreenStyles.optionItem} key={index}>
                  <Text style={ProfileScreenStyles.optionName}>{option.name}</Text>
                  <Ionicons size={20} color={'#9F9F9F'} name = {'chevron-forward-sharp'}/>
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: '#C2C2C2', marginVertical:5}} />
              </View>
            ))}
            
          </View>

          {/* Logout */}
          <View style = {{position:'absolute', width:'90%', bottom:'10%', marginHorizontal:20}}>
            <TouchableOpacity onPress={handleLogout} style={ProfileScreenStyles.optionItem}>
              <Text style={{fontSize:16, fontWeight:'400', color:'#EA0000'}}>Logout</Text>
              <Ionicons size={20} color={'#9F9F9F'} name = {'chevron-forward-sharp'}/>
            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor: '#C2C2C2', marginVertical:5}} />
          </View>

      </ImageBackground>
    );
  };

  // Render screen
  render() {  
    return (
        <this.Profile/>
    )    
  }   
}




/********************* Stylesheets ***********************/ 

// StyleSheet for the profile screen
const ProfileScreenStyles = StyleSheet.create({
  profileContainer: {
    top:'7%',
    marginBottom:30,
    alignItems:'center'
  },
  userName: {
    fontSize: 32,
    color:'#000000',
    fontWeight: '700',
    marginVertical:15
  },
  email: {
    fontSize: 16,
    color:'#000000',
    marginBottom:30,
    fontWeight: '500'
  },
  optionsContainer: {
    marginHorizontal:20,
    justifyContent:'center'
  },
  optionItem: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  optionName: {
    fontSize: 16,
    fontWeight:'400'
  },
  optionTitle: {
    fontSize: 20,
    fontWeight:'700',
    marginVertical:20
  }
});