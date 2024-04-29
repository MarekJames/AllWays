/*

HelpCenter.js 

  -> Handles questions from users

*/




/******************** Imports Section ********************/ 

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Linking, Dimensions } from 'react-native';




/******************* Global Variables ********************/

const width = Dimensions.get('window').width   // Get width of the user screen
const height = Dimensions.get('window').height // Get height of the user screen




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
        
        <View style = {HelpCenterStyles.subContainer}>
          <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={HelpCenterStyles.backButton}
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
    alignItems:'center',
    backgroundColor:'white',
  },
  subContainer:{
    marginTop:50,
    marginBottom:50,
    flexDirection:'row',
  },
  imageBackground:{
    flex: 1,
    width:width,
    height:height,
  },
  title: {
    flex:1,
    fontSize:30,
    color:'#000',
    marginRight:55,
    alignSelf:'center',
    textAlign:'center',
    fontFamily:'Poppins-Bold',
  },
  subTitle: {
    fontSize:20,
    marginLeft:25,
    color:'#494949',
    marginBottom:30,
    fontFamily:'Poppins-Medium',
  },
  email: {
    fontSize:20,
    marginLeft:25,
    color:'#2100E8',
    textAlign:'left',
    fontFamily:'Poppins-Medium',
    textDecorationLine:'underline',
  },
  backButton:{
    width:45,
    height:45,
    marginLeft:10,
    borderRadius:30,
    alignItems:'center',
    backgroundColor:'#fff',
    justifyContent:'center',
  }
})