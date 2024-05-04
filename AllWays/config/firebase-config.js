/*

firebase-config.js 
  
  -> Has all functions related to Firebase
  -> All screens if needed call functions from this file

*/




/******************** Imports Section ********************/ 

import { useState, useEffect } from "react";
import { initializeApp, getApp } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, setDoc, doc, addDoc, collection, query, where, getDocs, deleteDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { initializeAuth, getAuth, getReactNativePersistence, signOut, sendPasswordResetEmail, updateProfile, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider, sendEmailVerification, verifyBeforeUpdateEmail } from 'firebase/auth';




/******************** Global Variables *******************/ 

// Define config for Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDgn7Iudefpu_5lHWg5Jb-TMk6ZN5MsLcs",
    authDomain: "allways-2e097.firebaseapp.com",
    databaseURL: "https://allways-2e097-default-rtdb.firebaseio.com",
    projectId: "allways-2e097",
    storageBucket: "allways-2e097.appspot.com",
    messagingSenderId: "217423999985",
    appId: "1:217423999985:web:1ae32a99df35e588594a50",
    measurementId: "G-RQJXTFMB3L"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth for that app immediately
initializeAuth(app, {persistence: getReactNativePersistence(ReactNativeAsyncStorage)});

// Initialize DB reference
const db = getFirestore(app);




/*********************** Functions ***********************/ 

// Update User Profile
async function updateUser(name){
  try{
    await updateProfile( getAuth().currentUser, {displayName: name});
    console.log('Profile updated successfully.');
    return 'success';
  }
  catch(error){
    console.log('Error updating user name : ' + error);
    return error.code;
  };
}

// Update User Email
async function updateUserEmail(userEmail){
  try{
    await updateEmail(getAuth().currentUser, userEmail);
    console.log('Profile updated successfully.');
    return 'success';
  }catch(error){
    console.log('WW: ' + error);
    if(error.code == 'auth/invalid-email'){
      console.log('Error updating user email : ' + error);
      return error.code;
    }
    if(error.code == 'auth/email-already-in-use'){
      console.log('Error updating user email : ' + error);
      return error.code;
    }
    if(error.code == 'auth/requires-recent-login'){
      console.log('Error updating user email : ' + error);
      return error.code;
    }
    if(error.code == 'auth/operation-not-allowed'){
      console.log('Error updating user email : ' + error);
      return error.code;
    }
    else{
      console.log(error);
    }
  };
}

// Change User Password
async function changePassword(oldPassword, newPassword){
  try {
    const result = await reauthenticateUser(oldPassword);
    if(result == 'success'){
      await updatePassword(getAuth().currentUser, newPassword);
      console.log('Password updated successfully.');
      return 'success';
    }
    else{
      console.log(result);
      return result;
    }
  } catch (error) {
    console.log('An error has occurred : ' + error.code);
    return error.code;
  }
}

// Insert Route in DB
async function insertRoute(route, imageRoute, city, startDate, endDate){

  // Add a new document with a generated id.
  try {
    const docRef = await addDoc(collection(db, "routes"), {
      city: city,
      startDate: startDate,
      endDate: endDate,
      route: route,
      imageUrl: imageRoute,
      userId: getAuth().currentUser.uid
    });

    return docRef.id;

  } catch (e) {
    console.error("Error adding document: ", e);
    throw Error(error.message);
  }
}

// Reset User Password
async function resetPassword(email){

  var sendEmail = email != '' ? email : getAuth().currentUser.email;
  
  try{
    await sendPasswordResetEmail(getAuth(), sendEmail);
    return 'success';
  }
  catch(error){
    console.error('Error sending password reset email:', error.code);
    return error.code;
  };
}

// Delete Selected Route
async function deleteRoute(routeId){

  try{
    await deleteDoc(doc(db, "routes", routeId));
  }
  catch(error){
    console.log('Error deleting route: ' + error.message);
    throw Error(error.message);
  }

}

// Get User Saved Routes Real Time
async function updateSavedRoutes() {
  const [data, setData] = useState([]);

    useEffect(() => {

      try{
        const q = query(collection(db, "routes"), where("userId", "==", getAuth().currentUser.uid));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const updatedData = [];
    
          querySnapshot.forEach((doc) => {
            updatedData.push({
              id: doc.id,
              ...doc.data(),
            });
          });
    
          setData(updatedData);
        });

        return () => {
          // Cleanup function to unsubscribe when the component unmounts
          unsubscribe();
        };
      }
      catch(error){
        console.log('Error getting user routes: ' + error.message);
        throw Error(error.message);
      }
    }, ['routes', 'userId', getAuth().currentUser.uid]);

    return data;
  
};

// Delete user routes
async function deleteRoutes(){

  try{
    const q = query(collection(db, "routes"), where("userId", "==", getAuth().currentUser.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
  
      deleteRoute(doc.id)
      
    });
  }
  catch(error){
    console.log('Error deleting user routes: ' + error.message);
    throw Error(error.message);
  }

}

// Delete User
async function deleteUser(){

  let user = getAuth().currentUser;
  try{

    //Remove every route related to the user
    await deleteRoutes();

    //Remove user
    user.delete();
  }
  catch(error){
    console.log('Error deleting user: ' + error.message);
    throw Error(error.message);
  }
}

// Reauthenticate User
async function reauthenticateUser(password){

  const credential = EmailAuthProvider.credential(getAuth().currentUser.email, password);

  try{
    await reauthenticateWithCredential(getAuth().currentUser, credential);
    console.log('User authenticated successfully.');
    return 'success';
  }
  catch(error){
    console.log('An error has occurred : ' + error);
    return error.code;
  };
}

// Send Validation Email
async function sendValidationEmail(){
  
  try{
    const auth = getAuth();

    // Send email
    await sendEmailVerification(auth.currentUser);
   
  }
  catch(error){
    console.log('Error sending verification email: ' + error.message);
    throw Error(error.message);
  }  
}

// Send Validation Email Before Updating To New Email
async function verifyBeforeUpdate(email){
  try{
    await verifyBeforeUpdateEmail(getAuth().currentUser, email);
    console.log('Verification Email Sent to '+ email + " -> User : " + getAuth().currentUser.email);
    return 'success';
  }catch(error){
    console.log(error);
    return error.code;
  } 
}

// Update Route In DB After New Images Are Loaded
async function updateRoute(id, route){
  
  // Add a new document with a generated id.
  try {

    // Get reference
    const docRef = doc(db, "routes", id);

    // Perform the update
    await updateDoc(docRef, {route: route});
    console.log('Route updated successfully');

  }
  catch (error) {
    console.error("Error updating route: ", error.message);
    throw Error(error.message);
  }
}

// Export functions
export  {  
          getApp, 
          getAuth, 
          signOut, 
          deleteUser, 
          updateUser, 
          insertRoute,
          updateRoute, 
          deleteRoute, 
          resetPassword, 
          changePassword, 
          updateUserEmail, 
          updateSavedRoutes, 
          reauthenticateUser, 
          verifyBeforeUpdate,
          sendValidationEmail,
        }