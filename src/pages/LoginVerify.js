import React from 'react';
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

let admin = false;
const LoginVerify = () => {
  let navigate = useNavigate();
  const {state, dispatch} = React.useContext(UserContext);
  const checkUser = async () => {  
    const userList = [];
    const querySnapshot = await getDocs(collection(db, "user"));
    querySnapshot.forEach((doc) => {
        const user = {
            docID: doc.id,
            UID: doc.get("UID"),
            email: doc.get("email")
        }
        userList.push(user);
    }); 
    let currentUser;
    for(let i = 0; i< userList.length; i++){
      if (userList[i].UID === state.user.id){
        currentUser = userList[i];
      }
    }
    if(currentUser){
      if(currentUser.email === state.user.email){
        admin = true;
      }else{
        dispatch({type:'SET_USER',payload:{}});
        admin = false;
      }
    }else if(!currentUser){
      for(let i = 0; i< userList.length; i++){
        if (userList[i].email === state.user.email){
          currentUser = userList[i];
        }
      }
      if(currentUser && currentUser.UID === "null"){
        await updateDoc(doc(db, "user", currentUser.docID), { UID: state.user.id });
        admin = true;
      }else{
        dispatch({type:'SET_USER',payload:{}});
        admin = false;
      }
    }
    if(admin === false){
      deleteUser(currentUserInfo).then(() => {
        // User deleted.
      }).catch((error) => {
        // An error ocurred
        // ...
      });
      navigate("/");
    }
    else{
      navigate("/admin")
    }
    }
    checkUser();

    return (
      <div>
        <h1>Verifying your login</h1>
      </div>
    );
};
 
export default LoginVerify;
