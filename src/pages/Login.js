import React from 'react';
import { useNavigate} from "react-router-dom";
import GoogleButton from 'react-google-button';
import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider} from "firebase/auth";
import { UserContext } from '../userContext';

export default function Login(){
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const {state, dispatch} = React.useContext(UserContext);
    if(state.user.id){
        navigate("/LoginVerify");
    }

    const handleLogin = () => {
        signInWithRedirect(auth, provider);
        getRedirectResult(auth)
        .then((result) => {

            const credential = GoogleAuthProvider.credentialFromResult(result);
            // eslint-disable-next-line
            const token = credential.accessToken;

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
 