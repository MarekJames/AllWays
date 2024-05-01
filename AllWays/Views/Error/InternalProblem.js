/*

InternalProblem.js 

  -> Shows the network connection error

*/




/******************** Imports Section ********************/ 

import React from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';




/*********************** Classes *************************/

/* 

  Network Connection Screen

*/

export class InternalProblemScreen extends React.Component{
    render() {

        const handleRetry = (navigation) => {
            
            // Handle retry

            // Reset tab bar
            if(navigation.getParent() != undefined){
                navigation.getParent().setOptions({tabBarStyle: InternalProblemStyles.tab});
            }
        }  

        return (
        <View style = {InternalProblemStyles.container}>

            {/* Back button */}
            <TouchableOpacity style={InternalProblemStyles.backButton} onPress={() => this.props.navigation.goBack()}>
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

                {/* Retry button */}
                <TouchableOpacity onPress={() => {handleRetry(this.props.navigation)}}>
                    <Text style = {InternalProblemStyles.retryText}>Retry</Text>
                </TouchableOpacity>

            </View>
        </View>
        )    
    }
}

const InternalProblemStyles = StyleSheet.create ({
    container: {
        flex:1,
        paddingVertical:40,
        paddingHorizontal:20,
        backgroundColor:'#767676'
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
    subContainer:{
        flex:1, 
        alignSelf:'center', 
        justifyContent:'center'
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