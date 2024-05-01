/*

NetworkConnection.js 

  -> Shows the network connection error

*/




/******************** Imports Section ********************/ 

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import  Ionicons  from '@expo/vector-icons/Ionicons';




/*********************** Classes *************************/

/* 

  Network Connection Screen

*/

export class NetworkConnectionScreen extends React.Component{
    
    render() {  

        const handleRetry = (navigation) => {
            
            // Handle Retry
            
            // Reset tab bar
            if(navigation.getParent() != undefined){
                navigation.getParent().setOptions({tabBarStyle: NetworkConnectionStyles.tab});
            }
        }

        return (
        <View style = {NetworkConnectionStyles.container}>

            {/* Back button */}
            <TouchableOpacity style={NetworkConnectionStyles.backButton} onPress={() => this.props.navigation.goBack()}>
                <Ionicons name="chevron-back-sharp" size={30} color="#000" />
            </TouchableOpacity>
                
            {/* Error Message container */}
            <View style = {NetworkConnectionStyles.subContainer}>
                
                {/* Error message */}
                <View style = {NetworkConnectionStyles.errorContainer}>
                    <Ionicons name="wifi-outline" size={70} color="#23C2DF"/>
                </View>
                <Text style = {NetworkConnectionStyles.errorText}>No network connection</Text>
                <Text style = {NetworkConnectionStyles.errorText}>You appear to have lost</Text>
                <Text style = {NetworkConnectionStyles.errorText}>connectivity.</Text>
                <Text style = {NetworkConnectionStyles.errorText}>Please try again when you are</Text>
                <Text style = {NetworkConnectionStyles.errorText}>back online.</Text>

                {/* Retry button */}
                <TouchableOpacity onPress={() => {handleRetry(this.props.navigation)}}>
                    <Text style = {NetworkConnectionStyles.retryText}>Retry</Text>
                </TouchableOpacity>

            </View>
        </View>
        )    
    }
}

const NetworkConnectionStyles = StyleSheet.create ({
    container: {
        flex:1,
        paddingVertical:40,
        paddingHorizontal:20,
        backgroundColor:'#767676'
    },
    subContainer:{
        flex:1, 
        alignSelf:'center', 
        justifyContent:'center'
    },
    errorContainer:{
        width:100,
        height:100,
        margin:20,
        borderRadius:100,
        alignSelf:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        justifyContent:'center',
    },
    retryText:{
        margin:20,
        fontSize:24,
        color:'#23C2DF',
        textAlign:'center',
        fontFamily:'Poppins-Medium',
    },
    errorText:{
        fontSize:17,
        color:'#fff',
        textAlign:'center',
        fontFamily:'Poppins-Medium',
    },
    backButton:{
        top:50,
        width:45,
        height:45,
        borderRadius:30,
        alignItems:'center',
        backgroundColor:'#fff',
        justifyContent:'center',
    },
    tab:{ 
        height:45,
        elevation:0, 
        borderTopWidth: 2, 
        position:'absolute', 
        borderTopColor:'#fff',
    },
})