import React from 'react'
import { List} from 'antd-mobile'
import {
    FileOutline,
    // SoundOutline,
    VideoOutline,
  } from 'antd-mobile-icons'
import { useNavigate } from "react-router-dom";

export default function Navigation(){
  let navigate = useNavigate();
    return (
      <div>
        <List header='Materials'>
        <List.Item prefix={<FileOutline />} onClick={() => {navigate('/documents')}} data-testid="documents">
          Documents
        </List.Item>
        {/* <List.Item prefix={<SoundOutline />} onClick={() => {navigate('/audio')}}>
          Audios
        </List.Item> */}
        <List.Item prefix={<VideoOutline />} onClick={() => {navigate('/video')}} data-testid="video">
          Videos
        </List.Item>
        </List>
      </div>
    );
}