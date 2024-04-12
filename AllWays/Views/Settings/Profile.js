import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import  Ionicons  from '@expo/vector-icons/Ionicons';
import UserAvatar from 'react-native-user-avatar';
import { getAuth } from 'firebase/auth';


// Set of options for settings
const optionsSettings = [
  { name: 'Account'},
];

// Set of options for general
const optionsGeneral = [
  { name: 'Help Center'},
  { name: 'Terms & Conditions'}
];

// Profile Screen
export class ProfileScreen extends React.Component{

    Profile = () => {

      var lastName; 
      var nameParts;
      var firstName;
      const { route } = this.props;
      const [fullName, setFullName] = useState('');
      const [userFullName, setUserFullName] = useState(getAuth().currentUser.displayName);
      const [userEmail, setEmail] = useState('');

      const handleLogout =  () => {
          getAuth().signOut();
      }

      useEffect(() => {
        var name = getAuth().currentUser.displayName;
        var email = getAuth().currentUser.email;

        if(route.params != undefined) { 
          const { userName } = route.params;
          const { email } = route.params;
          
          if(userName) setUserFullName(userName);
          if(email) setEmail(email);
        }
        else { 
          setUserFullName(name);
          setEmail(email);
        }

        nameParts = userFullName.split(" ");
        firstName = nameParts[0];
        lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
        setFullName(firstName + " " + lastName);
      }, []);

      return (
        
        <ImageBackground source = {require('../../Images/BackgroundHome.png')} style = {{ backgroundColor:'#fff',flex:1, width:'100%',height:'13%'}}>

            {/* Avatar Name and Email */}
            <View style={styles.profileContainer}>

              <UserAvatar borderRadius={100} size={100} name={fullName} bgColors={['#A0A0A0']}/>  
              <Text style={styles.userName}>{fullName}</Text>
              <Text style={styles.email}>{userEmail}</Text>

            </View>
            
            {/* First set of options - Settings*/}
            <View style={styles.optionsContainer}>
              <Text style={styles.optionTitle}>Settings</Text>

              {optionsSettings.map((option, index) => (
                <View key = {index}>
                  <TouchableOpacity onPress={()=> {

                      if(option.name ==  'Account'){this.props.navigation.navigate('AccountSettings')}
                      

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
                <View key = {index}>
                  <TouchableOpacity onPress={()=> {

                      if(option.name ==  'Help Center'){this.props.navigation.navigate('HelpCenter')}
                      if(option.name ==  'Terms & Conditions'){this.props.navigation.navigate('TermsConditions')}

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