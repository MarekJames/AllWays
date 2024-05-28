/*

AccountSettings.js 
  
  -> Shows the account settings

*/




/******************** Imports Section ********************/ 

import React from 'react';
import { deleteUser } from 'firebase/auth';
import  Ionicons  from '@expo/vector-icons/Ionicons';
import { NetworkContext, showNetworkError } from '../../config/network-config';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';




/******************* Global Variables ********************/

const width = Dimensions.get('window').width   // Get width of the user screen
const height = Dimensions.get('window').height // Get height of the user screen

const optionsSettings = [
  { name: 'Change Account Name'},
  { name: 'Change Email'},
  { name: 'Change Password'},
];




/*********************** Classes *************************/

/*

  AccountSettingsScreen class
  Shows the account settings

*/
export class AccountSettingsScreen extends React.Component{

  AccountSettings = () => {

    const handleDelete =  async (navigation, isConnected) => {
      try{
        if(isConnected){
          await deleteUser();
        }
        else{
          showNetworkError(navigation, 'Network');
        }
      }
      catch(error){
        showNetworkError(navigation, error.message);
      }
    }

    return (
      <NetworkContext.Consumer>
      {(value) => (
        <View style = {AccountSettingsStyles.container}>

          {/* Title and back button */}
          <View style={AccountSettingsStyles.profileContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={AccountSettingsStyles.backButton}>
              <Text><Ionicons name="chevron-back-sharp" size={30} color="black" /></Text>
            </TouchableOpacity>
            <Text style={AccountSettingsStyles.userName}>Account</Text>
          </View>
          
          {/* First set of options - Settings*/}
          <View style={AccountSettingsStyles.optionsContainer}>
            <Text style={AccountSettingsStyles.optionTitle}>Settings</Text>
            
            <View style={AccountSettingsStyles.separator} />

            {optionsSettings.map((option, index) => (
              <View key = {index}>
                <TouchableOpacity onPress={()=> {

                    if(option.name ==  'Change Account Name'){this.props.navigation.navigate('ChangeName')}
                    if(option.name ==  'Change Email'){this.props.navigation.navigate('ChangeEmail')}
                    if(option.name ==  'Change Password'){this.props.navigation.navigate('ChangePassword')}

                  }} style={AccountSettingsStyles.optionItem} key={index}>
                  <Text style={AccountSettingsStyles.optionName}>{option.name}</Text>
                  <Ionicons size={20} color={'#9F9F9F'} name = {'chevron-forward-sharp'}/>
                </TouchableOpacity>
                <View style={AccountSettingsStyles.separator} />
              </View>
            ))}
          </View>

          {/* Delete */}
          <View style = {AccountSettingsStyles.deleteContainer}>
            <TouchableOpacity onPress={() => {handleDelete(this.props.navigation, value)}} style={AccountSettingsStyles.optionItem}>
              <Text style={AccountSettingsStyles.deleteText}>Delete Account</Text>
              <Ionicons size={20} color={'#9F9F9F'} name = {'chevron-forward-sharp'}/>
            </TouchableOpacity>
            <View style={AccountSettingsStyles.separator} />
          </View>
        </View>
      )}
      </NetworkContext.Consumer>
      );
    };

    render() {  
      return (
          <this.AccountSettings/>
      )    
    }
    
}




/********************* Stylesheets ***********************/

const AccountSettingsStyles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
  },
  deleteContainer:{
    width:width*0.9,
    bottom:height*0.1,
    position:'absolute',
    marginHorizontal:scale(20),
  },
  profileContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:scale(40),
    marginTop:verticalScale(50),
  },
  userName:{
    flex:1,
    color:'#000000',
    textAlign:'center',
    fontSize:scale(25),
    marginRight:scale(55),
    fontFamily:'Poppins-SemiBold',
  },
  optionsContainer:{
    justifyContent:'center',
    marginHorizontal:scale(20),
  },
  optionItem:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginVertical:verticalScale(15),
  },
  optionIcon:{
    marginRight:scale(10),
    margin:moderateScale(10),
  },
  optionName:{
    fontSize:scale(13),
    fontFamily:'Poppins-Medium',
  },
  optionTitle:{
    fontSize:scale(16),
    fontFamily:'Poppins-SemiBold',
    marginVertical:verticalScale(20),
  },
  separator:{
    height:1,
    backgroundColor:'#C2C2C2',
    marginVertical:verticalScale(5),
  },
  backButton:{
    borderRadius:30,
    alignItems:'center',
    marginLeft:scale(10),
    backgroundColor:'#fff',
    width:moderateScale(45),
    justifyContent:'center',
    height:moderateScale(45),
  },
  deleteText:{
    color:'#EA0000',
    fontSize:scale(13),
    fontFamily:'Poppins-Medium',
  }
});