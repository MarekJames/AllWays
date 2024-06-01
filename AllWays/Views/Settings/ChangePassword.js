/*

ChangePassword.js 

  -> Handles update of the users password

*/




/******************** Imports Section ********************/ 

import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NetworkContext, showNetworkError } from '../../config/network-config';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { changePassword, reauthenticateUser } from '../../config/firebase-config';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert, Modal } from 'react-native';



/*********************** Classes *************************/

/* 

  Change password screen of the app
  Allows the user to update their password

*/
export class ChangePasswordScreen extends React.Component{
  
  changePasswordScreen = () => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [invalidOldPassword, setInvalidOldPassword] = useState('');
    const [invalidNewPassword, setInvalidNewPassword] = useState('');
    const [invalidConfirmPassword, setInvalidConfirmPassword] = useState('');

    // Validate inputs for new password
    function validateInputs(){
      if(!oldPassword){
        setInvalidOldPassword('Please input your old password');
      }
      if(!newPassword){
        setInvalidNewPassword('Please input your new password');
      }
      if(!confirmPassword){
        setInvalidConfirmPassword('Please input new password confirmation');
      }
      if((confirmPassword && newPassword) && (confirmPassword.trim() != newPassword.trim())){
        setInvalidConfirmPassword('Your password and password confirmation are not the same');
      }
      if(oldPassword && invalidOldPassword){
        setInvalidOldPassword('');
      } 
      if(newPassword && invalidNewPassword){
        setInvalidNewPassword('');
      }
      if(confirmPassword && invalidConfirmPassword && confirmPassword.trim() == newPassword.trim()){
        setInvalidConfirmPassword('');
      }
      if(oldPassword && newPassword && confirmPassword && (newPassword.trim() == confirmPassword.trim())){
          return true;
      }
      else{
        return false;
      }
    }

    // Handle update button press
    const handleSubmit = async (navigation, isConnected) => {
      if(validateInputs()){
        if(isConnected){
          const result = await changePassword(oldPassword.trim(), newPassword.trim());
        
          if(result == 'auth/invalid-credential'){
            setInvalidOldPassword('Incorrect password');
          }
          else if(result == 'auth/too-many-requests'){
            setInvalidOldPassword('Too many requests, try again later');
          }
          else if(result == 'auth/weak-password'){
            setInvalidConfirmPassword('Invalid password, should be at least 6 characters');
          }
          else if(result == 'auth/requires-recent-login'){
            if(isConnected){ 
              const result = await reauthenticateUser(oldPassword.trim());
              if(result == 'auth/too-many-requests'){
                setInvalidOldPassword('Too many requests, try again later');
              }
              else if (result == 'success'){
                handleSubmit(navigation, isConnected);
              }
              else{
                showNetworkError(navigation, result);
              }
            }
            else{
              showNetworkError(navigation, 'Network');
            }
          }
          else if( result == 'success'){
            setIsOpen(!isOpen);
          }
          else{
            showNetworkError(navigation, result);
          }
        }
        else{
          showNetworkError(navigation, 'Network');
        }
      }
    }
    
    // Show model with success message
    const modalContent = (
      <View style={ChangePasswordStyles.modalView}>
        <Text style = {ChangePasswordStyles.titleModal}>Success</Text>
        <Text style = {ChangePasswordStyles.subTitle}>Your password was updated successfully</Text>
        <TouchableOpacity style = {ChangePasswordStyles.modalButton} onPress={() => {this.props.navigation.navigate('Profile')}}>
          <Text style = {ChangePasswordStyles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <NetworkContext.Consumer>
      {(value) => (
        <View style={ChangePasswordStyles.container}>

          {/* Backgroung Image */}
          <ImageBackground
            source={require('../../Images/LoginBackground.png')} // Replace with your image path
            style={ChangePasswordStyles.imageBackground}
            resizeMode="cover" // You can adjust the resizeMode property as needed
          >
            
          {/* Header */}
          <View style = {ChangePasswordStyles.headerView}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={ChangePasswordStyles.backButton}>
              <Text><Ionicons name="chevron-back-sharp" size={30} color="black" /></Text>
            </TouchableOpacity>
            <Text style={ChangePasswordStyles.title}>Change Password</Text>
          </View>

          {/* Subtitle */}
          <Text style={ChangePasswordStyles.subTitle}>Enter your new password</Text>

          {/* Error Message */}
          {invalidOldPassword !== null && ( // Checking if the variable is not null
            <Text style = {ChangePasswordStyles.errorMessage}>{invalidOldPassword}</Text>
          )}

          {/* Input Text Old Password */}
          <TextInput
            style={ChangePasswordStyles.input}
            placeholder="Old Password"
            placeholderTextColor={'#626262'}
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry
          />

          {/* Error Message */}
          {invalidNewPassword !== null && ( // Checking if the variable is not null
            <Text style = {ChangePasswordStyles.errorMessage}>{invalidNewPassword}</Text>
          )}

          {/* Input Text New Password */}
          <TextInput
            style={ChangePasswordStyles.input}
            placeholder="New Password"
            placeholderTextColor={'#626262'}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          
          {/* Error Message */}
          {invalidConfirmPassword !== null && ( // Checking if the variable is not null
            <Text style = {ChangePasswordStyles.errorMessage}>{invalidConfirmPassword}</Text>
          )}

          {/* Input Text Confirm Password */}
          <TextInput
            style={ChangePasswordStyles.input}
            placeholder="Confirm Password"
            placeholderTextColor={'#626262'}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {/* Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isOpen}
            onRequestClose={()=>{setIsOpen(!isOpen)}}
          >
            {modalContent}
          </Modal>
          
          {/* Update Password Button */}
          <TouchableOpacity style = {ChangePasswordStyles.recover} onPress={() => {handleSubmit(this.props.navigation, value)}}>
            <Text style = {ChangePasswordStyles.updateText}>Update</Text>
          </TouchableOpacity>
    
          </ImageBackground>
        </View>
      )}
      </NetworkContext.Consumer>
    );
  };

  render() {  
    return (
      <this.changePasswordScreen></this.changePasswordScreen>
    )    
  }
}




/********************* Stylesheets ***********************/

const ChangePasswordStyles = StyleSheet.create ({
  container: {
    flex:1,
    alignItems:'center',
    backgroundColor:'white',
  },
  modalView: { 
    top:'35%', 
    height:'30%', 
    borderWidth:1, 
    borderRadius:30, 
    margin:scale(20), 
    borderColor:'#aaaaaa', 
    alignContent:'center', 
    justifyContent:'center', 
    padding:moderateScale(20), 
    backgroundColor:'#F1F4FF', 
  },
  headerView: {
    flexDirection:'row',
    marginTop:verticalScale(50),
    marginBottom:verticalScale(10),
  },
  imageBackground:{
    flex:1,
    width:'100%',
    height:'100%',
  },
  title: {
    flex:1,
    color:'#000000',
    fontSize:scale(25),
    alignSelf:'center',
    textAlign:'center',
    marginRight:scale(55),
    fontFamily:'Poppins-Bold',
  },
  titleModal: {
    color:'#000000',
    textAlign:'center',
    fontSize:scale(25),
    fontFamily:'Poppins-Bold',
  },
  subTitle: {
    color:'#494949',
    textAlign:'center',
    fontSize:scale(16),
    fontFamily:'Poppins-Medium',
    marginBottom:verticalScale(40),
  },
  input: {
    width:'80%',
    borderRadius:30,
    alignSelf:'center',
    paddingLeft:scale(20),
    height:verticalScale(40),
    backgroundColor:'#F1F4FF',
    fontFamily:'Poppins-Light',
    marginVertical:verticalScale(10),
  },
  recover: {
    width:'80%',
    borderRadius:30,
    alignSelf:'center',
    justifyContent:'center',
    height:verticalScale(45),
    backgroundColor:'#23C2DF',
    marginTop:verticalScale(30),
    marginBottom:verticalScale(10),
  },
  modalButton: {
    width:'35%',
    borderRadius:30,
    alignSelf:'center',
    justifyContent:'center',
    height:verticalScale(45),
    backgroundColor:'#23C2DF',
  },
  closeText: {
    color:'#FFFFFF',
    fontSize:scale(16),  
    textAlign:'center', 
    fontFamily:'Poppins-Medium',
  },
  updateText:{
    color:'#FFF',
    fontSize:scale(16),
    textAlign:'center',
    fontFamily:'Poppins-SemiBold',
  },
  backButton: {
    borderRadius:30,
    alignItems:'center',
    marginLeft:scale(10),
    backgroundColor:'#fff',
    width:moderateScale(45),
    justifyContent:'center',
    height:moderateScale(45),
  },
  errorMessage: {
    color:'red', 
    fontSize:scale(12),  
    textAlign:'center',
    fontFamily:'Poppins-Medium',
  },
})