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
    
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [invalidOldPassword, setInvalidOldPassword] = useState('');
    const [invalidNewPassword, setInvalidNewPassword] = useState('');
    const [invalidConfirmPassword, setInvalidConfirmPassword] = useState('');
    const [isOpen, setIsOpen] = useState(false);

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
    
    const modalContent = (
      <View style={{ height:'30%', top:'35%', justifyContent: 'center', alignContent:'center', backgroundColor: '#F1F4FF', margin: 20, borderRadius:30, borderColor:'#aaaaaa', borderWidth:1, padding: 20 }}>
        <Text style = {ChangePasswordStyles.titleModal}>Success</Text>
        <Text style = {ChangePasswordStyles.subTitle}>Your password was updated successfully</Text>
        <TouchableOpacity style = {ChangePasswordStyles.modalButton} onPress={() => {this.props.navigation.navigate('AccountSettings')}}>
          <Text style = {{fontSize:20, fontWeight:'600', textAlign:'center', color:'#FFFFFF'}}>Close</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <NetworkContext.Consumer>
      {(value) => (
        <View style={ChangePasswordStyles.container}>

          <ImageBackground
            source={require('../../Images/LoginBackground.png')} // Replace with your image path
            style={ChangePasswordStyles.imageBackground}
            resizeMode="cover" // You can adjust the resizeMode property as needed
          >
          
          <View style = {{flexDirection:'row', marginTop:50, marginBottom:10}}>
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
            <Text style={ChangePasswordStyles.title}>Change Password</Text>
          </View>

          <Text style={ChangePasswordStyles.subTitle}>Enter your new password</Text>

          {invalidOldPassword !== null && ( // Checking if the variable is not null
            <Text style = {{color:'red', fontSize:12, fontWeight:'600', textAlign:'center'}}>{invalidOldPassword}</Text>
          )}
          <TextInput
            style={ChangePasswordStyles.input}
            placeholder="Old Password"
            placeholderTextColor={'#626262'}
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry
          />

          {invalidNewPassword !== null && ( // Checking if the variable is not null
            <Text style = {{color:'red',fontSize:12,fontWeight:'600', textAlign:'center'}}>{invalidNewPassword}</Text>
          )}
          <TextInput
            style={ChangePasswordStyles.input}
            placeholder="New Password"
            placeholderTextColor={'#626262'}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />

          {invalidConfirmPassword !== null && ( // Checking if the variable is not null
            <Text style = {{color:'red',fontSize:12,fontWeight:'600', textAlign:'center'}}>{invalidConfirmPassword}</Text>
          )}
          <TextInput
            style={ChangePasswordStyles.input}
            placeholder="Confirm Password"
            placeholderTextColor={'#626262'}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

        <Modal
          animationType="slide" // Optional: Choose an animation type (e.g., 'slide', 'fade')
          transparent={true} // Optional: Set to true for a transparent background
          visible={isOpen}
          onRequestClose={()=>{setIsOpen(!isOpen)}}
        >
          {modalContent}
        </Modal>

          <TouchableOpacity style = {ChangePasswordStyles.recover} onPress={() => {handleSubmit(this.props.navigation, value)}}>
            <Text style = {{fontSize:20, fontWeight:'600', textAlign:'center', color:'#FFFFFF'}}>Update</Text>
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
    flex: 1,
    alignItems: 'center',
    backgroundColor:'white'
  },
  imageBackground:{
      flex: 1,
      width: '100%', // You can adjust width and height as needed
      height: '100%',
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
  titleModal: {
    fontSize: 30,
    fontWeight: 'bold',
    color:'#000000',
    textAlign:'center',
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 40,
    color:'#494949',
    fontWeight:'600',
    textAlign:'center'
  },
  input: {
    width: '80%',
    height: 50,
    paddingLeft: 20,
    marginVertical: 15,
    borderRadius:30,
    alignSelf:'center',
    backgroundColor:'#F1F4FF'
  },
  alreadyHaveAccount: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
    fontWeight:'600',
    color:'#494949'
  },
  recover: {
    width: '80%',
    height: 50,
    backgroundColor:'#23C2DF',
    marginTop:30,
    marginBottom: 10,
    borderRadius:30,
    alignSelf:'center',
    justifyContent:'center'
  },
  modalButton: {
    width:'35%',
    height: 50,
    backgroundColor:'#23C2DF',
    borderRadius:30,
    alignSelf:'center',
    justifyContent:'center'
  },
  continueWith:{
    textAlign:'center',
    fontSize:14,
    color:'#23C2DF',
    fontWeight:'600',
    marginTop:30
  },
  icons:{
    alignItems:'center', 
    justifyContent:'center', 
    width:60, 
    height:50, 
    borderRadius: 10, 
    backgroundColor:'#ECECEC',
    marginHorizontal:10
  }
 
})