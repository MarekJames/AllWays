/*

ChangePassword.js 

  -> Handles update of the users password

*/




/******************** Imports Section ********************/ 

import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NetworkContext, showNetworkError } from '../../config/network-config';
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
      if((confirmPassword && newPassword) && (confirmPassword != newPassword)){
        setInvalidConfirmPassword('Your password and password confirmation are not the same');
      }
      if(oldPassword && invalidOldPassword){
        setInvalidOldPassword('');
      } 
      if(newPassword && invalidNewPassword){
        setInvalidNewPassword('');
      }
      if(confirmPassword && invalidConfirmPassword && confirmPassword == newPassword){
        setInvalidConfirmPassword('');
      }
      if(oldPassword && newPassword && confirmPassword && (newPassword == confirmPassword)){
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
          const result = await changePassword(oldPassword, newPassword);
        
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
              const result = await reauthenticateUser(oldPassword);
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
    backgroundColor:'white'
  },
  modalView: { 
    margin:20, 
    top:'35%', 
    padding:20, 
    height:'30%', 
    borderWidth:1, 
    borderRadius:30, 
    borderColor:'#aaaaaa', 
    alignContent:'center', 
    justifyContent:'center', 
    backgroundColor:'#F1F4FF', 
  },
  headerView: {
    marginTop:50,
    marginBottom:10,
    flexDirection:'row',
  },
  imageBackground:{
    flex: 1,
    width: '100%',
    height: '100%',
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
  titleModal: {
    fontSize:30,
    color:'#000000',
    textAlign:'center',
    fontFamily:'Poppins-Bold',
  },
  subTitle: {
    fontSize:20,
    color:'#494949',
    marginBottom:40,
    textAlign:'center',
    fontFamily:'Poppins-Medium',
  },
  input: {
    width:'80%',
    height:50,
    borderRadius:30,
    paddingLeft: 20,
    marginVertical: 15,
    alignSelf:'center',
    backgroundColor:'#F1F4FF',
    fontFamily:'Poppins-Light',
  },
  recover: {
    height:50,
    width:'80%',
    marginTop:30,
    borderRadius:30,
    marginBottom:10,
    alignSelf:'center',
    justifyContent:'center',
    backgroundColor:'#23C2DF',
  },
  modalButton: {
    width:'35%',
    height:50,
    borderRadius:30,
    alignSelf:'center',
    justifyContent:'center',
    backgroundColor:'#23C2DF',
  },
  closeText: {
    fontSize:20,  
    color:'#FFFFFF',
    textAlign:'center', 
    fontFamily:'Poppins-Medium',
  },
  updateText:{
    fontSize:20,
    color:'#FFF',
    textAlign:'center',
    fontFamily:'Poppins-SemiBold',
  },
  backButton: {
    width:45,
    height:45,
    marginLeft:10,
    borderRadius:30,
    alignItems:'center',
    backgroundColor:'#fff',
    justifyContent:'center',
  },
  errorMessage: {
    color:'red', 
    fontSize:12,  
    textAlign:'center',
    fontFamily:'Poppins-Medium',
  },
})