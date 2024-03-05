import React from 'react';
import { Link } from "react-router-dom";
import GoogleButton from 'react-google-button'
import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider} from "firebase/auth";
import { UserContext } from '../userContext';

export default function Login(){
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const {state, dispatch} = React.useContext(UserContext);


    const handleLogin = async () => {
        signInWithRedirect(auth, provider);
        getRedirectResult(auth)
        .then(async (result) => {
    
            const loginUser = {
                id: result.user.uid, // Using uid instead of id
                name: result.user.displayName,
                email: result.user.email
            }
    
            dispatch({type: 'SET_USER', payload: {loginUser}});
            console.log(state.user, "login");
        }).catch((error) => {
            console.error("Error signing in with Google:", error);
        });

    }
    

    return (
        <>
            <h1>Login</h1>
            <Link to={state.user.id ? "/LoginVerify" : "/"} style={{ color: 'black', textDecoration: 'none' }}>
                <div className='google-button' onClick={handleLogin}><GoogleButton /></div>
            </Link>
        </>
    );
};
 