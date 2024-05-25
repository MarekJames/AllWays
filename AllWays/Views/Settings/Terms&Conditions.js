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
          <ScrollView style = {{alignSelf:'center', height:'90%', paddingHorizontal:moderateScale(25), marginBottom:verticalScale(45)}}>

              <Text style={TermsConditionsStyles.textTitle}>Welcome to AllWays. By accessing or using our app, you agree to be bound by the following terms and conditions. Please read them carefully.</Text>
              
              <Text style={TermsConditionsStyles.subTitle}>1. Acceptance of Terms</Text>
              <Text style={TermsConditionsStyles.text}>By using AllWays, you agree to comply with and be legally bound by these terms and conditions. If you do not agree to these terms, please do not use our app.</Text>
              
              <Text style={TermsConditionsStyles.subTitle}>2. Changes to Terms</Text>
              <Text style={TermsConditionsStyles.text}>We reserve the right to modify these terms and conditions at any time. Any changes will be posted on this page, and your continued use of the app after such changes have been made will constitute your acceptance of the new terms.</Text>
              
              <Text style={TermsConditionsStyles.subTitle}>3. Use of the App</Text>
              
              <Text style={TermsConditionsStyles.subsubTitle}>3.1. Eligibility</Text>
              <Text style={TermsConditionsStyles.text}>You must be at least 13 years old to use our app. By using the app, you represent and warrant that you are at least 13 years old.</Text>
              
              <Text style={TermsConditionsStyles.subsubTitle}>3.2. Account</Text>
              <Text style={TermsConditionsStyles.text}>You may be required to create an account to use certain features of the app. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</Text>
              
              <Text style={TermsConditionsStyles.subsubTitle}>3.3. User Conduct</Text>
              <Text style={TermsConditionsStyles.text}>You agree not to use the app for any unlawful purpose or in any way that could harm, disable, overburden, or impair the app.</Text>
              
              <Text style={TermsConditionsStyles.subTitle}>4. Route Plan Generation</Text>
              
              <Text style={TermsConditionsStyles.subsubTitle}>4.1 Service Description</Text>
              <Text style={TermsConditionsStyles.text}>Our app generates route plans for specified dates and cities, with a list of activities and descriptions based on your input.</Text>
              
              <Text style={TermsConditionsStyles.subsubTitle}>4.2. Accuracy</Text>
              <Text style={TermsConditionsStyles.text}t>While we strive to provide accurate and up-to-date information, we do not guarantee the accuracy, completeness, or reliability of any route plans or activities suggested by the app.</Text>
              
              <Text style={TermsConditionsStyles.subTitle}>5. Google Firebase</Text>
              
              <Text style={TermsConditionsStyles.subsubTitle}>5.1. Backend Services</Text>
              <Text style={TermsConditionsStyles.text}>Our app uses Google Firebase for backend services, including data storage, authentication, and hosting. By using our app, you also agree to be bound by Google Firebase's terms of service and privacy policy.</Text>
              
              <Text style={TermsConditionsStyles.subsubTitle}>5.2. Data Security</Text>
              <Text style={TermsConditionsStyles.text}>We implement industry-standard security measures to protect your data stored on Google Firebase. However, we cannot guarantee absolute security, and you acknowledge and accept the risks inherent in using cloud-based services.</Text>
              
              <Text style={TermsConditionsStyles.subTitle}>6. Privacy Policy</Text>
              
              <Text style={TermsConditionsStyles.subsubTitle}>6.1. Data Collection</Text>
              <Text style={TermsConditionsStyles.text}>We collect and store personal information necessary for the functionality of the app, including but not limited to your name, email address, and route plan preferences.</Text>
              
              <Text style={TermsConditionsStyles.subsubTitle}>6.2. Data Use</Text>
              <Text style={TermsConditionsStyles.text}>We use your data to provide and improve our services, personalize your experience, and communicate with you. We do not sell or share your personal information with third parties without your consent, except as required by law.</Text>
              
              <Text style={TermsConditionsStyles.subsubTitle}>6.3. Cookies</Text>
              <Text style={TermsConditionsStyles.text}>Our app may use cookies and similar technologies to enhance your experience and gather information about your usage patterns.</Text>
              
              <Text style={TermsConditionsStyles.subTitle}>7. Intellectual Property</Text>
              
              <Text style={TermsConditionsStyles.subsubTitle}>7.1. Ownership</Text>
              <Text style={TermsConditionsStyles.text}>All content and materials available on the app, including but not limited to text, graphics, logos, and software, are the property of AllWays or its licensors and are protected by applicable intellectual property laws.</Text>
              
              <Text style={TermsConditionsStyles.subsubTitle}>7.2. License</Text>
              <Text style={TermsConditionsStyles.text}>We grant you a limited, non-exclusive, non-transferable, and revocable license to use the app for personal and non-commercial purposes.</Text>
              
              <Text style={TermsConditionsStyles.subTitle}>8. Limitation of Liability</Text>
              <Text style={TermsConditionsStyles.text}>To the maximum extent permitted by law, AllWays and its affiliates, officers, employees, agents, and licensors shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of the app, including but not limited to any errors or omissions in the route plans or activities suggested by the app.</Text>
              
              <Text style={TermsConditionsStyles.subTitle}>9. Governing Law</Text>
              <Text style={TermsConditionsStyles.text}>These terms and conditions shall be governed by and construed in accordance with the laws of Portugal, without regard to its conflict of law principles.</Text>
              
              <Text style={TermsConditionsStyles.subTitle}>10. Contact Information</Text>
              <Text style={TermsConditionsStyles.text}>If you have any questions or concerns about these terms and conditions, please contact us at app.allways@gmail.com.</Text>
              
              <Text style={TermsConditionsStyles.textTitle}>By using AllWays, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. Thank you for using our app!</Text>
            
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
    height:'10%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop:verticalScale(50),
    marginBottom:verticalScale(10),
  },
  title: {
    flex:1,
    color:'#000000',
    alignSelf:'center',
    textAlign:'center',
    fontSize:scale(25),
    marginRight:scale(55),
    fontFamily:'Poppins-Bold',
  },
  subTitle: {
    color:'#494949',
    fontSize:scale(20),
    fontFamily:'Poppins-SemiBold',
    marginTop:verticalScale(10),
    marginBottom:verticalScale(5),
  },
  subsubTitle: {
    color:'#494949',
    fontSize:scale(15),
    fontFamily:'Poppins-Medium',
    marginTop:verticalScale(10),
    marginBottom:verticalScale(5),
  },
  backButton:{
    width:scale(45),
    borderRadius:30,
    alignItems:'center',
    marginLeft:scale(10),
    backgroundColor:'#fff',
    justifyContent:'center',
    height:verticalScale(45),
  },
  text:{
    color:'#494949',
    fontSize:scale(12),
    fontFamily:'Poppins-Light',
  },
  textTitle:{
    color:'#494949',
    fontSize:scale(15),
    fontFamily:'Poppins-Medium',
    marginTop:verticalScale(10),
  }
})