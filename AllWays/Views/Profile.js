import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import  Ionicons  from '@expo/vector-icons/Ionicons';
import {getAuth} from '../config/firebase-config';

const options = [
    { name: 'Favorites', icon: 'heart' },
    { name: 'Payment', icon: 'wallet-outline' },
    { name: 'Settings', icon: 'settings-outline' },
    { name: 'Log Out', icon: 'log-out-outline' },
  ];

export class ProfileScreen extends React.Component{

    Profile = () => {

        const userFullName = getAuth().currentUser.displayName;

        const handleLogout =  () => {
            getAuth().signOut();
        }

        return (
            <View style={styles.container}>
              <View style={styles.profileContainer}>
                <Image source={require('../Images/Profile.png')} style={styles.profileImage} />
                <Text style={styles.userName}>{userFullName}</Text>
              </View>
              <View style={styles.optionsContainer}>
                {options.map((option, index) => (
                  <TouchableOpacity onPress={()=> {

                      if(option.name ==  'Settings'){this.props.navigation.navigate('Settings')}
                      if(option.name ==  'Log Out'){handleLogout()}

                    }} style={styles.optionItem} key={index}>
                    <Ionicons style = {styles.optionIcon} name={option.icon} size = {30} color = '#309CFF' />
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
      fontWeight: '700',
      color:'#309CFF'
    },
    optionsContainer: {
      alignItems: 'flex-start',
      justifyContent:'center',
      margin:20
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    optionIcon: {
      marginRight: 10,
      margin:10
    },
    optionName: {
      fontSize: 18,
      fontWeight:'600'
    },
});