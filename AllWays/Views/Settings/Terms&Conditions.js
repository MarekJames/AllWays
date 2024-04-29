/*

Terms&Conditions.js 

  -> Shows the terms and conditions

*/




/******************** Imports Section ********************/ 

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import  Ionicons  from '@expo/vector-icons/Ionicons';




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
    backgroundColor:'#FFF'
  },
  titleContainer:{
    marginTop:50, 
    marginBottom:50,
    flexDirection:'row',
  },
  title: {
    flex:1,
    fontSize:30,
    marginRight:55,
    color:'#000000',
    alignSelf:'center',
    textAlign:'center',
    fontFamily:'Poppins-Bold',
  },
  subTitle: {
    fontSize:20,
    marginLeft:25,
    marginBottom:30,
    color:'#494949',
    fontFamily:'Poppins-Medium',
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