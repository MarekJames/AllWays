/*

HelpCenter.js 

  -> Handles questions from users

*/




/******************** Imports Section ********************/ 

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
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
    flex:1,
    alignItems:'center',
    backgroundColor:'white',
  },
  subContainer:{
    flexDirection:'row',
    marginTop:verticalScale(50),
    marginBottom:verticalScale(50),
  },
  imageBackground:{
    flex:1,
    width:width,
    height:height,
  },
  title: {
    flex:1,
    color:'#000',
    fontSize:scale(25),
    alignSelf:'center',
    textAlign:'center',
    marginRight:scale(55),
    fontFamily:'Poppins-Bold',
  },
  subTitle: {
    color:'#494949',
    marginBottom:30,
    fontSize:scale(16),
    marginLeft:scale(25),
    fontFamily:'Poppins-Medium',
  },
  email: {
    color:'#2100E8',
    textAlign:'left',
    fontSize:scale(16),
    marginLeft:scale(25),
    fontFamily:'Poppins-Medium',
    textDecorationLine:'underline',
  },
  backButton:{
    width:scale(45),
    borderRadius:30,
    alignItems:'center',
    marginLeft:scale(10),
    backgroundColor:'#fff',
    justifyContent:'center',
    height:verticalScale(45),
  }
})