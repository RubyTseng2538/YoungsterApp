import React from 'react';
// import { Button} from 'antd-mobile';
import { Link } from "react-router-dom";
import GoogleButton from 'react-google-button'
import { getAuth, onAuthStateChanged, signInWithRedirect, getRedirectResult, GoogleAuthProvider  } from "firebase/auth";
import { UserContext } from '../userContext';


export default function Login(){
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const {state,dispatch} = React.useContext(UserContext);
    const handleLogin = () =>{
        if(state.user.email){
            dispatch({type:'SET_USER',payload:{}})
        }else{
            onAuthStateChanged(auth, (user) => {
                if (user) {
                  // User is signed in, see docs for a list of available properties
                  // https://firebase.google.com/docs/reference/js/auth.user
                  const uid = user.uid;
                  // ...
                } else {
                  // User is signed out
                  signInWithRedirect(auth, provider);
                    getRedirectResult(auth)
                    .then((result) => {
                        // This gives you a Google Access Token. You can use it to access Google APIs.
                        const credential = GoogleAuthProvider.credentialFromResult(result);
                        const token = credential.accessToken;
                
                        // The signed-in user info.
                        const user = result.user;
                        // IdP data available using getAdditionalUserInfo(result)
                        // ...
                    }).catch((error) => {
                        // Handle Errors here.
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // The email of the user's account used.
                        const email = error.customData.email;
                        // The AuthCredential type that was used.
                        const credential = GoogleAuthProvider.credentialFromError(error);
                        // ...
                    });
                        }
                    const loginUser = {
                        id: user.uid,
                        name: user.displayName,
                        email: user.email
                    }
                    dispatch({type:'SET_USER',payload:{loginUser}})
              });

        }
    }
    return (
        <>
            <h1>Login</h1>
            <Link to="/admin" style={{ color: 'black', textDecoration: 'none' }}>
                <div className='google-button' onClick={handleLogin}><GoogleButton /></div>
            </Link>
        </>
    );
};
 