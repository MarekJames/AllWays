import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import  Ionicons  from '@expo/vector-icons/Ionicons';
import UserAvatar from 'react-native-user-avatar';

import {getAuth} from '../config/firebase-config';

// Set of options for settings
const optionsSettings = [
  { name: 'Account'},
  { name: 'Notifications'},
];

// Set of options for general
const optionsGeneral = [
  { name: 'Help Center'},
  { name: 'Terms & Conditions'}
];

// Profile Screen
export class ProfileScreen extends React.Component{

    Profile = () => {

        const userFullName = getAuth().currentUser.displayName;
        const userEmail = getAuth().currentUser.email;

        const handleLogout =  () => {
            getAuth().signOut();
        }

        return (
          
          <ImageBackground source = {require('../Images/BackgroundProfile.png')} style = {{ backgroundColor:'#fff',flex:1, width:'100%',height:'13%'}}>

              {/* Avatar Name and Email */}
              <View style={styles.profileContainer}>

                <UserAvatar borderRadius={100} size={100} name={userFullName} bgColors={['#A0A0A0']}/>  
                <Text style={styles.userName}>{userFullName}</Text>
                <Text style={styles.email}>{userEmail}</Text>
  
              </View>
              
              {/* First set of options - Settings*/}
              <View style={styles.optionsContainer}>
                <Text style={styles.optionTitle}>Settings</Text>

                {optionsSettings.map((option, index) => (
                  <View index = {index}>
                    <TouchableOpacity onPress={()=> {

                        if(option.name ==  'Account'){}
                        if(option.name ==  'Notifications'){}

                      }} style={styles.optionItem} key={index}>
                      <Text style={styles.optionName}>{option.name}</Text>
                      <Ionicons size={20} color={'#9F9F9F'} name = {'chevron-forward-sharp'}/>
                    </TouchableOpacity>
                    <View style={{ height: 1, backgroundColor: '#C2C2C2', marginVertical:5}} />
                  </View>
                ))}
              </View>

              {/* Second set of options - General*/}
              <View style={styles.optionsContainer}>

                <Text style={styles.optionTitle}>General</Text>

                {optionsGeneral.map((option, index) => (
                  <View index = {index}>
                    <TouchableOpacity onPress={()=> {

                        if(option.name ==  'Help Center'){}
                        if(option.name ==  'Terms & Conditions'){}

                      }} style={styles.optionItem} key={index}>
                      <Text style={styles.optionName}>{option.name}</Text>
                      <Ionicons size={20} color={'#9F9F9F'} name = {'chevron-forward-sharp'}/>
                    </TouchableOpacity>
                    <View style={{ height: 1, backgroundColor: '#C2C2C2', marginVertical:5}} />
                    
                  </View>
                ))}
                
              </View>

              {/* Logout */}
              <View style = {{position:'absolute', width:'90%', bottom:'10%', marginHorizontal:20}}>
                <TouchableOpacity onPress={handleLogout} style={styles.optionItem}>
                  <Text style={{fontSize:16, fontWeight:'400', color:'#EA0000'}}>Logout</Text>
                  <Ionicons size={20} color={'#9F9F9F'} name = {'chevron-forward-sharp'}/>
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: '#C2C2C2', marginVertical:5}} />
              </View>

          </ImageBackground>
       
        );
    };

    render() {  
        return (
            <this.Profile/>
        )    
    }
    
}

// StyleSheet for the profile screen
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:20
    },
    profileContainer: {
     alignItems:'center',
     top:'7%',
     marginBottom:30
    },
    profileImage: {
      width: 140,
      height: 140,
      marginRight: 20,
      resizeMode:'contain'
    },
    userName: {
      fontSize: 32,
      fontWeight: '700',
      color:'#000000',
      marginVertical:15
    },
    email: {
      fontSize: 16,
      fontWeight: '500',
      color:'#000000',
      marginBottom:30
    },
    optionsContainer: {
      justifyContent:'center',
      marginHorizontal:20
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
      marginVertical: 10,
    },
    optionIcon: {
      marginRight: 10,
      margin:10
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