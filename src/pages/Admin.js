import React from 'react';
import { List } from 'antd-mobile'
import {
    AddSquareOutline,
    EditSOutline,
    ExclamationCircleOutline
  } from 'antd-mobile-icons'
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { UserContext } from '../userContext';


const Admin = () => {
  const {state,dispatch} = React.useContext(UserContext);
  console.log(state.user.email);
  const singout = () =>{
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    if(state.user.email){
      dispatch({type:'SET_USER',payload:{}})
    }
  }
 
    return (
        <List header='Admin Page'>
        <Link to="/addpage" style={{ color: 'black', textDecoration: 'none' }}><List.Item prefix={<AddSquareOutline />} onClick={() => {}}>
          Add page
        </List.Item></Link>
        <Link to="/editpage" style={{ color: 'black', textDecoration: 'none' }}><List.Item prefix={<EditSOutline />} onClick={() => {}}>
          Edit page
        </List.Item></Link>
        <Link to="/" style={{ color: 'black', textDecoration: 'none' }}><List.Item prefix={<ExclamationCircleOutline />} onClick={singout}>
          Log out
          </List.Item></Link>
        </List>
    );
};
 
export default Admin;
