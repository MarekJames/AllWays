/*

Terms&Conditions.js 

  -> Shows the terms and conditions

*/




/******************** Imports Section ********************/ 

import React from 'react';
import  Ionicons  from '@expo/vector-icons/Ionicons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';




/*********************** Classes *************************/

/* 

  Terms and Conditions Screen

*/

export class TermsConditionsScreen extends React.Component{
  render() {  
    return (
      <View style = {TermsConditionsStyles.container}>

          {/* Title and Back button */}
          <View style = {TermsConditionsStyles.titleContainer}>
            <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                  style={TermsConditionsStyles.backButton}
                >
                  <Text><Ionicons name="chevron-back-sharp" size={30} color="black" /></Text>
            </TouchableOpacity>
            <Text style = {TermsConditionsStyles.title}>Terms & Conditions</Text>
          </View>

          {/* Scroll View with terms & conditions */}
          <ScrollView style = {{alignSelf:'center'}}>
              <Text>
                  Text Here
              </Text>
          </ScrollView>
      </View>
    )    
  }
}

const TermsConditionsStyles = StyleSheet.create ({
  container: {
    flex:1,
    alignItems:'center',
    backgroundColor:'#FFF',
  },
  titleContainer:{
    flexDirection:'row',
    marginTop:verticalScale(50), 
    marginBottom:verticalScale(50),
  },
  title: {
    flex:1,
    color:'#000000',
    alignSelf:'center',
    textAlign:'center',
    fontSize:scale(30),
    marginRight:scale(55),
    fontFamily:'Poppins-Bold',
  },
  subTitle: {
    color:'#494949',
    fontSize:scale(20),
    marginLeft:scale(25),
    fontFamily:'Poppins-Medium',
    marginBottom:verticalScale(30),
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