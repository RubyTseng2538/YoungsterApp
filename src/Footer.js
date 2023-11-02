import React from 'react'
import {
    UserCircleOutline,
    LeftOutline,
    FolderOutline
  } from 'antd-mobile-icons'
import { Link, useNavigate } from "react-router-dom";

export default function Footer(){
  let navigate = useNavigate();
    return (
        <footer className="footer">
          <button class="button-solid" onClick={() => {
            if(window.history.state && window.history.state.idx > 0){
              return navigate(-1)
            }else {
              navigate('/', { replace: true });
            }}
          }><LeftOutline fontSize={24} /></button>
          <Link to="/" style={{ color: 'black', textDecoration: 'none' }}><FolderOutline style={{marginRight: '30%'}}/></Link>
          <Link to="/login" style={{ color: 'black', textDecoration: 'none' }}><UserCircleOutline style={{margineLeft: '30%'}}/></Link>
        </footer>
    );
}

