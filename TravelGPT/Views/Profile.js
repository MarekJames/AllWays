import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {firebaseConfig} from '../firebase-config';
import { initializeApp } from "firebase/app";
import {getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signOut } from "firebase/auth";


const options = [
    { name: 'Favorites', icon: require('../Images/Favorite.png') },
    { name: 'Payment', icon: require('../Images/Payment.png') },
    { name: 'Tell Your Friends', icon: require('../Images/TellYourFriends.png') },
    { name: 'Promotions', icon: require('../Images/Promotions.png') },
    { name: 'Settings', icon: require('../Images/Settings.png') },
    { name: 'Log Out', icon: require('../Images/Logout.png') },
  ];

export class ProfileScreen extends React.Component{

   
    Profile = () => {
        const handleLogout = async (option) => {
            if(option.name == 'Log Out'){
                
                const app = initializeApp(firebaseConfig);
                const auth = getAuth(app, {
                    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
                });

                signOut(auth).then(() => {
                  console.log('Log out successful');
                  this.props.navigation.navigate('Login');
                }).catch((error) => {
                  // An error happened.
                  alert(error.code);
                });
            }
        };

        return (
            <View style={styles.container}>
              <View style={styles.profileContainer}>
                <Image source={require('../Images/Profile.png')} style={styles.profileImage} />
                <Text style={styles.userName}>Hugo Abreu</Text>
              </View>
              <View style={styles.optionsContainer}>
                {options.map((option, index) => (
                  <TouchableOpacity onPress={()=> {handleLogout(option)}} style={styles.optionItem} key={index}>
                    <Image source={option.icon} style={styles.optionIcon} />
                    <Text style={styles.optionName}>{option.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
        );
    };

    render() {  
        return (
            <this.Profile/>
        )    
    }
    
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:20
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 20,
    },
    profileImage: {
      width: 140,
      height: 140,
      marginRight: 20,
    },
    userName: {
      fontSize: 33,
      fontWeight: 700,
      color:'#309CFF'
    },
    optionsContainer: {
      alignItems: 'flex-start',
      marginTop:20,
      marginLeft:10
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },
    optionIcon: {
      width: 45,
      height: 45,
      marginRight: 10,
      margin:10
    },
    optionName: {
      fontSize: 18,
      fontWeight:600
    },
  });

