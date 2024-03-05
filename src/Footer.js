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
  console.log(state.user, "footer");
  const direct = () => {
    if(state.user.id){
      navigate("/LoginVerify");
    }else{
      navigate("/login");
    }
  }
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
          <UserCircleOutline style={{marginLeft: '30%'}} onClick={direct}/>
        </footer>
    );
}

