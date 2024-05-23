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
              Welcome to AllWays. By accessing or using our app, you agree to be bound by the following terms and conditions. Please read them carefully.

Acceptance of Terms
By using AllWays, you agree to comply with and be legally bound by these terms and conditions. If you do not agree to these terms, please do not use our app.
Changes to Terms
We reserve the right to modify these terms and conditions at any time. Any changes will be posted on this page, and your continued use of the app after such changes have been made will constitute your acceptance of the new terms.
Use of the App
Eligibility: You must be at least 13 years old to use our app. By using the app, you represent and warrant that you are at least 13 years old.
Account: You may be required to create an account to use certain features of the app. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
User Conduct: You agree not to use the app for any unlawful purpose or in any way that could harm, disable, overburden, or impair the app.
Route Plan Generation
Service Description: Our app generates route plans for specified dates and cities, with a list of activities and descriptions based on your input.
Accuracy: While we strive to provide accurate and up-to-date information, we do not guarantee the accuracy, completeness, or reliability of any route plans or activities suggested by the app.
Google Firebase
Backend Services: Our app uses Google Firebase for backend services, including data storage, authentication, and hosting. By using our app, you also agree to be bound by Google Firebase's terms of service and privacy policy.
Data Security: We implement industry-standard security measures to protect your data stored on Google Firebase. However, we cannot guarantee absolute security, and you acknowledge and accept the risks inherent in using cloud-based services.
Privacy Policy
Data Collection: We collect and store personal information necessary for the functionality of the app, including but not limited to your name, email address, and route plan preferences.
Data Use: We use your data to provide and improve our services, personalize your experience, and communicate with you. We do not sell or share your personal information with third parties without your consent, except as required by law.
Cookies: Our app may use cookies and similar technologies to enhance your experience and gather information about your usage patterns.
Intellectual Property
Ownership: All content and materials available on the app, including but not limited to text, graphics, logos, and software, are the property of AllWays or its licensors and are protected by applicable intellectual property laws.
License: We grant you a limited, non-exclusive, non-transferable, and revocable license to use the app for personal and non-commercial purposes.
Limitation of Liability
To the maximum extent permitted by law, AllWays and its affiliates, officers, employees, agents, and licensors shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of the app, including but not limited to any errors or omissions in the route plans or activities suggested by the app.
Governing Law
These terms and conditions shall be governed by and construed in accordance with the laws of Portugal, without regard to its conflict of law principles.
Contact Information
If you have any questions or concerns about these terms and conditions, please contact us at app.allways@gmail.com.
By using AllWays, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. Thank you for using our app!
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