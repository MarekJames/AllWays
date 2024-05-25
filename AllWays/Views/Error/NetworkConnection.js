/*

NetworkConnection.js 

  -> Shows the network connection error

*/




/******************** Imports Section ********************/ 

import React from 'react';
import  Ionicons  from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';




/*********************** Classes *************************/

/* 

  Network Connection Screen

*/

export class NetworkConnectionScreen extends React.Component{
    
    render() {  

        // Handle back button
        const handleBack = (navigation) => {
            
            // Reset tab bar
            if(navigation.getParent() != undefined){
                navigation.getParent().setOptions({tabBarStyle: NetworkConnectionStyles.tab});
            }

            // Go back
            navigation.goBack()
        }

        return (
        <View style = {NetworkConnectionStyles.container}>

            {/* Back button */}
            <TouchableOpacity style={NetworkConnectionStyles.backButton} onPress={() => handleBack(this.props.navigation)}>
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

            </View>
        </View>
        )    
    }
}

const NetworkConnectionStyles = StyleSheet.create ({
    container: {
        flex:1,
        backgroundColor:'#767676',
        paddingHorizontal:scale(20),
        paddingVertical:verticalScale(40),
    },
    subContainer:{
        flex:1, 
        alignSelf:'center', 
        justifyContent:'center'
    },
    errorContainer:{
        borderRadius:100,
        width:scale(100),
        alignSelf:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        justifyContent:'center',
        margin:moderateScale(20),
        height:verticalScale(100),
    },
    errorText:{
        color:'#fff',
        textAlign:'center',
        fontSize:scale(16),
        fontFamily:'Poppins-Medium',
    },
    backButton:{
        width:scale(45),
        borderRadius:30,
        alignItems:'center',
        top:verticalScale(50),
        backgroundColor:'#fff',
        justifyContent:'center',
        height:verticalScale(45),
    },
    tab:{ 
        elevation:0, 
        borderTopWidth:2, 
        position:'absolute', 
        borderTopColor:'#fff',
        height:verticalScale(45),
    },
})