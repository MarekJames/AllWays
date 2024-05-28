/*

InternalProblem.js 

  -> Shows the network connection error

*/




/******************** Imports Section ********************/ 

import React from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';




/*********************** Classes *************************/

/* 

  Network Connection Screen

*/

export class InternalProblemScreen extends React.Component{
    render() {

        // Handle back button
        const handleBack = (navigation) => {
            
            // Reset tab bar
            if(navigation.getParent() != undefined){
                navigation.getParent().setOptions({tabBarStyle: InternalProblemStyles.tab});
            }

            // Go back
            navigation.goBack()
        }

        return (
        <View style = {InternalProblemStyles.container}>

            {/* Back button */}
            <TouchableOpacity style={InternalProblemStyles.backButton} onPress={() => handleBack(this.props.navigation)}>
                <Ionicons name="chevron-back-sharp" size={30} color="black" />
            </TouchableOpacity>
                
            {/* Error Message container */}
            <View style = {InternalProblemStyles.subContainer}>
                
                {/* Error message */}
                <View style = {InternalProblemStyles.errorContainer}>
                    <MaterialCommunityIcons name="parachute-outline" size={70} color="#23C2DF"/>
                </View>
                <Text style = {InternalProblemStyles.errorText}>Oops! Something went wrong</Text>
                <Text style = {InternalProblemStyles.errorText}>Please check your connection</Text> 
                <Text style = {InternalProblemStyles.errorText}>while we check our systems and</Text> 
                <Text style = {InternalProblemStyles.errorText}>try again later.</Text>

            </View>
        </View>
        )    
    }
}

const InternalProblemStyles = StyleSheet.create ({
    container: {
        flex:1,
        paddingVertical:verticalScale(40),
        paddingHorizontal:verticalScale(20),
        backgroundColor:'#767676'
    },
    errorContainer:{
        width:scale(100),
        borderRadius:100,
        alignSelf:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        justifyContent:'center',
        margin:moderateScale(20),
        height:verticalScale(100),
    },
    subContainer:{
        flex:1, 
        alignSelf:'center', 
        justifyContent:'center'
    },
    errorText:{
        color:'#fff',
        fontSize:scale(16),
        textAlign:'center',
        fontFamily:'Poppins-Medium',
    },
    backButton:{
        borderRadius:30,
        alignItems:'center',
        top:verticalScale(50),
        backgroundColor:'#fff',
        width:moderateScale(45),
        justifyContent:'center',
        height:moderateScale(45),
    },
    tab:{ 
        elevation:0, 
        borderTopWidth:2, 
        position:'absolute', 
        borderTopColor:'#fff',
        height:verticalScale(45),
    },
})