/*

HelpCenter.js 

  -> Handles questions from users

*/




/******************** Imports Section ********************/ 

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Textarea } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



/*********************** Classes *************************/

/* 

  Allow users to sends us questions

*/

export class HelpCenterScreen extends React.Component{
  
  helpCenterScreen = () => {
    
    const [name, setName] = useState('');
    const [invalidName, setInvalidName] = useState('');
    const [message, setMessage] = useState('');
    const [invalidMessage, setInvalidMessage] = useState('');
  
    const handleSubmit = async () => {
        
        if(!name){
            setInvalidName('Please input your name');
        }
        if(!message){
            setInvalidMessage('Please write your question');
        }
        if(name && invalidName){
            setInvalidName('');
        }
        if(message && invalidMessage){
            setInvalidMessage('');
        }
        else{
        
        }
    }

    return (
      <View style={HelpCenterStyles.container}>

        <ImageBackground
          source={require('../../Images/LoginBackground.png')} // Replace with your image path
          style={HelpCenterStyles.imageBackground}
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

          <Text style={HelpCenterStyles.title}>Help Center</Text>
        </View>

        <Text style={HelpCenterStyles.subTitle}>Send us a question</Text>

        {invalidName !== null && ( // Checking if the variable is not null
          <Text style = {{color:'red',fontSize:12,fontWeight:'600', textAlign:'center'}}>{invalidName}</Text>
        )}
        <TextInput
          style={HelpCenterStyles.input}
          placeholder="Name"
          placeholderTextColor={'#626262'}
          value={name}
          onChangeText={setName}
        />

        {invalidMessage !== null && ( // Checking if the variable is not null
          <Text style = {{color:'red',fontSize:12,fontWeight:'600', textAlign:'center'}}>{invalidMessage}</Text>
        )}
        <TextInput
          style={HelpCenterStyles.inputTextArea}
          placeholder="Write yout message here..."
          placeholderTextColor={'#626262'}
          multiline={true}
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity style = {HelpCenterStyles.recover} onPress={handleSubmit}>
          <Text style = {{fontSize:20, fontWeight:'600', textAlign:'center', color:'#FFFFFF'}}>Send</Text>
        </TouchableOpacity>
  
        </ImageBackground>
      </View>
    );
  };

  render() {  
    return (
      <this.helpCenterScreen></this.helpCenterScreen>
    )    
  }
}





/********************* Stylesheets ***********************/

const HelpCenterStyles = StyleSheet.create ({
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
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius:30,
    alignSelf:'center',
    backgroundColor:'#F1F4FF'
  },
  inputTextArea: {
    width: '80%',
    padding: 20,
    marginVertical: 10,
    borderRadius:30,
    alignSelf:'center',
    backgroundColor:'#F1F4FF',
    height:'40%',
    textAlignVertical: 'top'
    
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
    marginTop:10,
    marginBottom: 10,
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