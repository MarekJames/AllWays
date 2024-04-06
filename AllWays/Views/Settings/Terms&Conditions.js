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
      <View>

          {/* Title and Back button */}
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
    flex: 1,
    alignItems: 'center',
    backgroundColor:'white'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color:'#000000',
    alignSelf:'center',
    textAlign:'center',
    flex:1,
    marginRight:55
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 30,
    color:'#494949',
    fontWeight:'600',
    marginLeft:25
  },
})