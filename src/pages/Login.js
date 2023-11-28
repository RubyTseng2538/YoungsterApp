import React from 'react';
// import { Button} from 'antd-mobile';
import { Link } from "react-router-dom";
import GoogleButton from 'react-google-button'
import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider  } from "firebase/auth";
import { UserContext } from '../userContext';


export default function Login(){
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    // eslint-disable-next-line
    const {state, dispatch} = React.useContext(UserContext);
    const handleLogin = () =>{
            // User is signed out
            signInWithRedirect(auth, provider);
            getRedirectResult(auth)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access Google APIs.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                // eslint-disable-next-line
                const token = credential.accessToken;
        
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                const loginUser = {
                    id: user.uid,
                    name: user.displayName,
                    email: user.email
                }
                dispatch({type:'SET_USER',payload:{loginUser}})
            }).catch((error) => {
                // Handle Errors here.
                // eslint-disable-next-line
                const errorCode = error.code;
                // eslint-disable-next-line
                const errorMessage = error.message;
                // The email of the user's account used.
                // eslint-disable-next-line
                const email = error.customData.email;
                // The AuthCredential type that was used.
                // eslint-disable-next-line
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
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
 