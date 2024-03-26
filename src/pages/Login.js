import React from 'react';
import GoogleButton from 'react-google-button';
import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider} from "firebase/auth";


export default function Login(){
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const handleLogin = () => {
        signInWithRedirect(auth, provider);
        getRedirectResult(auth)
        .then((result) => {

            const credential = GoogleAuthProvider.credentialFromResult(result);
            // eslint-disable-next-line
            const token = credential.accessToken;
            // eslint-disable-next-line
            const loginUser = {
                id: result.user.uid, // Using uid instead of id
                name: result.user.displayName,
                email: result.user.email
            }

        }).catch((error) => {
            console.error("Error signing in with Google:", error);
        });

    }

    

    return (
        <>
            <h1>Login</h1>
            <div className='google-button' onClick={handleLogin}><GoogleButton /></div>
        </>
    );
};
 