import React from 'react';
import { List } from 'antd-mobile'
import {
    AddSquareOutline,
    EditSOutline,
    ExclamationCircleOutline
  } from 'antd-mobile-icons'
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { UserContext } from '../userContext';


const Admin = () => {
  const {state,dispatch} = React.useContext(UserContext);
  let navigate = useNavigate();
  const singout = () =>{
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    if(state.user){
      dispatch({type:'SET_USER',payload:{}})
    }
    navigate('/');
  }
    return (
      <div>
        <List header='Admin Page'>
        <List.Item prefix={<AddSquareOutline />} onClick={() => {navigate('/addpage')}}>
          Add page
        </List.Item>
        <List.Item prefix={<EditSOutline />} onClick={() => {navigate('/editpage')}}>
          Edit page
        </List.Item>
        <List.Item prefix={<ExclamationCircleOutline />} onClick={singout}>
          Log out
          </List.Item>
        </List>
      </div>
    );
};
 
export default Admin;
