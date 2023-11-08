import React from 'react';
import { List } from 'antd-mobile'
import {
    AddSquareOutline,
    EditSOutline,
  } from 'antd-mobile-icons'
import { Link } from "react-router-dom";
const Admin = () => {
 
    return (
        <List header='Admin Page'>
        <Link to="/addpage" style={{ color: 'black', textDecoration: 'none' }}><List.Item prefix={<AddSquareOutline />} onClick={() => {}}>
          Add page
        </List.Item></Link>
        <Link to="/editpage" style={{ color: 'black', textDecoration: 'none' }}><List.Item prefix={<EditSOutline />} onClick={() => {}}>
          Edit page
        </List.Item></Link>
        </List>
    );
};
 
export default Admin;
