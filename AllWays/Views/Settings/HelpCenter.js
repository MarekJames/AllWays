/*

HelpCenter.js 

  -> Handles questions from users

*/




/******************** Imports Section ********************/ 

import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';




/*********************** Classes *************************/

/* 

  Allow users to sends us questions

*/

export class HelpCenterScreen extends React.Component{
  
  helpCenterScreen = () => {
     
    const handleEmailPress = () => {
      const email = 'app.allways@gmail.com';
      const subject = '<Your subject here>';
      const body = '<Your question/suggestion here>';
    
      const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
      Linking.openURL(mailtoLink);
    };

    return (
      <View style={HelpCenterStyles.container}>

        <ImageBackground
          source={require('../../Images/LoginBackground.png')} // Replace with your image path
          style={HelpCenterStyles.imageBackground}
          resizeMode="cover" // You can adjust the resizeMode property as needed
        >
        
        <View style = {{flexDirection:'row', marginTop:50, marginBottom:50}}>
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

          <Text style={HelpCenterStyles.title}>Help Center</Text>
        </View>

        <Text style={HelpCenterStyles.subTitle}>Send Us A Question / Suggestion</Text>

        <TouchableOpacity onPress={handleEmailPress}>
          <Text style={HelpCenterStyles.email}>app.allways@gmail.com</Text>
        </TouchableOpacity>

        </ImageBackground>
      </View>
    );
  };

  render() {  
    return (
      <this.helpCenterScreen></this.helpCenterScreen>
    )    
  }
}





/********************* Stylesheets ***********************/

const HelpCenterStyles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'white'
  },
  imageBackground:{
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    flex:1,
    fontSize: 30,
    marginRight:55,
    color:'#000000',
    alignSelf:'center',
    textAlign:'center',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 20,
    marginLeft:25,
    color:'#494949',
    marginBottom: 30,
    fontWeight:'600',
  },
  email: {
    fontSize: 20,
    marginLeft:25,
    color:'#2100E8',
    fontWeight:'600',
    textAlign:'left',
    textDecorationLine:'underline'
  },
})