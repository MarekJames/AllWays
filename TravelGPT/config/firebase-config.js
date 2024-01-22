
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence, signOut } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, setDoc, doc, addDoc, collection, query, where, getDocs, deleteDoc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

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

// initialize Firebase App
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);

async function insertUser(uid, name){

  try {                  
    console.log(uid);
    const docRef = await setDoc(doc(db, "users", uid), {
      name: name,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

async function insertRoute(route, city, days){


  // Add a new document with a generated id.
  try {
    const docRef = await addDoc(collection(db, "routes"), {
      city: city,
      days: days,
      route: route,
      userId: getAuth().currentUser.uid
    });

    return docRef.id;

  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

async function getRoutes(){

  const q = query(collection(db, "routes"), where("userId", "==", getAuth().currentUser.uid));

  const querySnapshot = await getDocs(q);
  const savedRoutes = new Map();
  querySnapshot.forEach((doc) => {
 
    savedRoutes.set(doc.id, doc.data());
    
  });

  return savedRoutes;
}

async function deleteRoute(routeId){

  await deleteDoc(doc(db, "routes", routeId));

}

async function updateSavedRoutes() {
  const [data, setData] = useState([]);

    useEffect(() => {

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
    }, ['routes', 'userId', getAuth().currentUser.uid]);

    return data;
  
};

export { getApp, getAuth, signOut, insertUser, insertRoute, getRoutes, deleteRoute, updateSavedRoutes};