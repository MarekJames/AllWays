import React, { useState } from 'react';
import { Switch, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import  Ionicons  from '@expo/vector-icons/Ionicons';

export class SettingsScreen extends React.Component{

    Settings = () => {
        const [isNotification, setNotification] = useState('');
        const [isUpdate, setUpdate] = useState('');
        const [isDark, setDark] = useState('');
       
        const toggleNotification = () => setNotification(previousState => !previousState);
        const toggleUpdate = () => setUpdate(previousState => !previousState);
        const toggleDark = () => setDark(previousState => !previousState);

        return (
            <View style={styles.container}>
                
                {/*Image and Settings text */}
                <View style={styles.profileContainer}>
                    <Image source={require('../Images/Profile.png')} style={styles.profileImage} />
                    <Text style = {styles.userName}>Settings</Text>
                </View>

                {/*Account settings */}
                <View style={styles.optionsContainer}>

                    <View style={{alignItems:'center', flexDirection:'row',marginTop:20, marginBottom:15}}>
                        <Ionicons name={"people-sharp"} size={30} color="#309CFF" />
                        <Text style ={styles.settingsSections}>Account</Text>
                    </View>

                    <TouchableOpacity style={styles.optionItem}>
                        <Text style={styles.optionName}>Edit Profile</Text>
                    </TouchableOpacity>
                
                    <TouchableOpacity style={styles.optionItem}>
                        <Text style={styles.optionName}>Change Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionItem}>
                        <Text style={styles.optionName}>Privacy</Text>
                    </TouchableOpacity>

                </View>

                {/*Notification Settings*/}
                <View style={styles.optionsContainer}>
                    
                    <View style={{alignItems:'center', flexDirection:'row', marginTop:20, marginBottom:15}}>
                        <Ionicons name={"notifications-sharp"} size={30} color="#309CFF" />
                        <Text style ={styles.settingsSections}>Notifications</Text>
                    </View>

                    <View style={styles.optionSwitch}>
                        <Text style={styles.optionName}>Notifications</Text>
                        <Switch
                            trackColor={{false: '#F5F5F5', true: '#F5F5F5'}}
                            thumbColor={isNotification ? '#309FFF' : '#454545'}
                            ios_backgroundColor="#F5F5F5"
                            onValueChange={toggleNotification}
                            value={isNotification}
                        />
                    </View>

                    <View style={styles.optionSwitch}>
                        <Text style={styles.optionName}>Updates</Text>
                        <Switch
                            style = {{}}
                            trackColor={{false: '#F5F5F5', true: '#F5F5F5'}}
                            thumbColor={isUpdate ? '#309FFF' : '#454545'}
                            ios_backgroundColor="#F5F5F5"
                            onValueChange={toggleUpdate}
                            value={isUpdate}
                        />
                    </View>

                </View>

                {/*Other Settings */}
                <View style={styles.optionsContainer}>

                    <View style={{alignItems:'center', flexDirection:'row', marginTop:20, marginBottom:15}}>
                        <Ionicons name={"cog-sharp"} size={30} color="#309CFF"/>
                        <Text style ={styles.settingsSections}>Other</Text>
                    </View>

                    <View style={styles.optionSwitch}>
                       
                        <Text style={styles.optionName}>Dark Mode</Text>
                    
                        <Switch
                            style = {{marginLeft:10}}
                            trackColor={{false: '#F5F5F5', true: '#F5F5F5'}}
                            thumbColor={isDark ? '#309FFF' : '#454545'}
                            ios_backgroundColor="#F5F5F5"
                            onValueChange={toggleDark}
                            value={isDark}
                        />
                      
                    </View>

                    <TouchableOpacity style={styles.optionItem}>
                        <Text style={styles.optionName}>Language</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionItem}>
                        <Text style={styles.optionName}>Region</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    render() {  
        return (
            <this.Settings/>
        )    
    }
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:40,
      backgroundColor:'#fff'
    },
    profileContainer: {
      alignItems:'flex-start',
      margin: 20,
    },
    profileImage: {
      width: 50,
      height: 50,
      marginBottom: 20,
    },
    userName: {
      fontSize: 23,
      fontWeight: 500,
      color:'#309CFF'
    },
    optionsContainer: {
      marginTop:20,
      marginLeft:20
    },
    optionSwitch: {
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingRight:20
     
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical:8
        
      },
    optionIcon: {
      width: 45,
      height: 45,
      marginRight: 10,
      margin:10
    },
    optionName: {
      fontSize: 18,
      fontWeight:600,
      color:'#454545'
    },
    settingsSections:{
        color:'#309CFF',
        fontSize:20,
        fontWeight:500,
        justifyContent:'center',
        paddingHorizontal:20

    }
});

