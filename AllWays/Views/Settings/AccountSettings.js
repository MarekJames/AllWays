/*

AccountSettings.js 
  
  -> Shows the account settings

*/




/******************** Imports Section ********************/ 

import React from 'react';
import { deleteUser } from 'firebase/auth';
import  Ionicons  from '@expo/vector-icons/Ionicons';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { NetworkContext, showNetworkError } from '../../config/network-config';




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
    flex: 1,
    backgroundColor:"#fff",
  },
  deleteContainer:{
    width:width*0.9,
    bottom:height*0.1,
    marginHorizontal:20,
    position:'absolute',
  },
  profileContainer:{
    marginTop:50,
    marginBottom:40,
    flexDirection:'row',
  },
  userName:{
    flex:1,
    fontSize:32,
    marginRight:55,
    color:'#000000',
    textAlign:'center',
    fontFamily:'Poppins-SemiBold'
  },
  email:{
    fontSize:16,
    marginBottom:30,
    color:'#454545',
    fontFamily:'Poppins-Medium',
  },
  optionsContainer:{
    marginHorizontal:20,
    justifyContent:'center',
  },
  optionItem:{
    marginVertical:15,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  optionIcon:{
    margin:10,
    marginRight:10,
  },
  optionName:{
    fontSize:16,
    fontFamily:'Poppins-Medium',
  },
  optionTitle:{
    fontSize: 20,
    marginVertical:20,
    fontFamily:'Poppins-SemiBold',
  },
  separator:{
    height:1,
    marginVertical:5,
    backgroundColor:'#C2C2C2',
  },
  backButton:{
    width: 45,
    height: 45,
    marginLeft:10,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  deleteText:{
    fontSize:16,
    color:'#EA0000',
    fontFamily:'Poppins-Medium',
  }
});