/*

Terms&Conditions.js 

  -> Shows the terms and conditions

*/




/******************** Imports Section ********************/ 

import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import  Ionicons  from '@expo/vector-icons/Ionicons';




/*********************** Classes *************************/

/* 

  Terms and Conditions Screen

*/

export class TermsConditionsScreen extends React.Component{

    render() {  
      return (
        <View>
            {/* Back Buttom */}
            <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{
                width: 45,
                height: 45,
                borderRadius: 30,
                backgroundColor: 'lightgrey',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft:15,
                marginTop:40
                }}
            >
                <Ionicons name="arrow-back-outline" size={30} color="black" />
            </TouchableOpacity>

            {/* Scroll View with terms & conditions */}
            <ScrollView style = {{alignSelf:'center'}}>
                <Text>
                    Terms & Conditions
                </Text>
            </ScrollView>
        </View>
      )    
    }
  }