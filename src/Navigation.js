import React from 'react'
import { List } from 'antd-mobile'
import {
    FileOutline,
    SoundOutline,
    VideoOutline,
  } from 'antd-mobile-icons'
import { Link } from "react-router-dom";

export default function Navigation(){
    return (
        <List header='Materials'>
        <Link to="/documents" style={{ color: 'black', textDecoration: 'none' }}><List.Item prefix={<FileOutline />} onClick={() => {}}>
          Documents
        </List.Item></Link>
        <Link to="/audio" style={{ color: 'black', textDecoration: 'none' }}><List.Item prefix={<SoundOutline />} onClick={() => {}}>
          Audios
        </List.Item></Link>
        <Link to="/video" style={{ color: 'black', textDecoration: 'none' }}><List.Item prefix={<VideoOutline />} onClick={() => {}}>
          Videos
        </List.Item></Link>
        </List>
    );
}