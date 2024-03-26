import React, { useState } from 'react';
import {useNavigate } from "react-router-dom";
import { UserContext } from '../userContext';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc} from "firebase/firestore";
import { getAuth, deleteUser, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwCZ_ulcO61Ic0aQlNjnhR8oR9jaVzxTk",
  authDomain: "youngster-p.firebaseapp.com",
  projectId: "youngster-p",
  storageBucket: "youngster-p.appspot.com",
  messagingSenderId: "254927360049",
  appId: "1:254927360049:web:25c1be08ea17eaaea34510",
  measurementId: "G-VVEG3FZSCG"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
let currentUserInfo = auth.currentUser;
onAuthStateChanged(auth, (user)=>{
  if(user){
    currentUserInfo = user;
  }
});


async function LoginVerify(userData){
  let admin = false;
  const q = query(collection(db, "user"), where("UID", "==", currentUserInfo.uid));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  return admin;
}
 
export default LoginVerify;
