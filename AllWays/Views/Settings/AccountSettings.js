import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import  Ionicons  from '@expo/vector-icons/Ionicons';
import { deleteUser } from 'firebase/auth';

// Set of options for settings
const optionsSettings = [
  { name: 'Change Account Name'},
  { name: 'Change Email'},
  { name: 'Change Password'},
];


// Account Settings Screen Screen
export class AccountSettingsScreen extends React.Component{

    AccountSettings = () => {

        const handleDelete =  () => {
            deleteUser();
        }

        return (
          
          <View style = {{ backgroundColor:'#fff', flex:1}}>

              {/* Title and back button */}
              <View style={styles.profileContainer}>
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
                <Text style={styles.userName}>Account</Text>
              </View>
              
              {/* First set of options - Settings*/}
              <View style={styles.optionsContainer}>
                <Text style={styles.optionTitle}>Settings</Text>
                
                <View style={{ height: 1, backgroundColor: '#C2C2C2', marginVertical:5}} />

                {optionsSettings.map((option, index) => (
                  <View key = {index}>
                    <TouchableOpacity onPress={()=> {

                        if(option.name ==  'Change Account Name'){this.props.navigation.navigate('ChangeName')}
                        if(option.name ==  'Change Email'){this.props.navigation.navigate('ChangeEmail')}
                        if(option.name ==  'Change Password'){this.props.navigation.navigate('ChangePassword')}

                      }} style={styles.optionItem} key={index}>
                      <Text style={styles.optionName}>{option.name}</Text>
                      <Ionicons size={20} color={'#9F9F9F'} name = {'chevron-forward-sharp'}/>
                    </TouchableOpacity>
                    <View style={{ height: 1, backgroundColor: '#C2C2C2', marginVertical:5}} />
                  </View>
                ))}
              </View>

              {/* Delete */}
              <View style = {{position:'absolute', width:'90%', bottom:'10%', marginHorizontal:20}}>
                <TouchableOpacity onPress={handleDelete} style={styles.optionItem}>
                  <Text style={{fontSize:16, fontWeight:'400', color:'#EA0000'}}>Delete Account</Text>
                  <Ionicons size={20} color={'#9F9F9F'} name = {'chevron-forward-sharp'}/>
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: '#C2C2C2', marginVertical:5}} />
              </View>

          </View>
       
        );
    };

    render() {  
        return (
            <this.AccountSettings/>
        )    
    }
    
}

// StyleSheet for the profile screen
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:20
    },
    profileContainer: {
     flexDirection:'row',
     marginBottom:40,
     marginTop:50
    },
    userName: {
      flex:1,
      fontSize: 32,
      fontWeight: '700',
      color:'#000000',
      textAlign:'center',
      marginRight:55
    },
    email: {
      fontSize: 16,
      fontWeight: '500',
      color:'#000000',
      marginBottom:30
    },
    optionsContainer: {
      justifyContent:'center',
      marginHorizontal:20
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
      marginVertical: 15,
    },
    optionIcon: {
      marginRight: 10,
      margin:10
    },
    optionName: {
      fontSize: 16,
      fontWeight:'400'
    },
    optionTitle: {
      fontSize: 20,
      fontWeight:'700',
      marginVertical:20
    }
});