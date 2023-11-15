import React from 'react'
import {
    UserCircleOutline,
    LeftOutline,
    FolderOutline
  } from 'antd-mobile-icons'
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from './userContext';

export default function Footer(){
  let navigate = useNavigate();
  const {state} = React.useContext(UserContext);
    return (
        <footer className="footer">
          <button className="button-solid" onClick={() => {
            if(window.history.state && window.history.state.idx > 0){
              return navigate(-1)
            }else {
              navigate('/', { replace: true });
            }}
          }><LeftOutline fontSize={24} style={{marginRight: '30%'}}/></button>
          <Link to="/" style={{ color: 'black', textDecoration: 'none' }}><FolderOutline /></Link>
          <Link to= {state.user.email? "/admin" : "/login"} style={{ color: 'black', textDecoration: 'none' }}><UserCircleOutline style={{marginLeft: '30%'}}/></Link>
        </footer>
    );
}

