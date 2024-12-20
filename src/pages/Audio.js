import React, {useState, useEffect } from 'react';
import { List } from 'antd-mobile';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyDwCZ_ulcO61Ic0aQlNjnhR8oR9jaVzxTk",
  authDomain: "youngster-p.firebaseapp.com",
  projectId: "youngster-p",
  storageBucket: "youngster-p.appspot.com",
  messagingSenderId: "254927360049",
  appId: "1:254927360049:web:25c1be08ea17eaaea34510",
  measurementId: "G-VVEG3FZSCG"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
 
const Audio = () => {   
  const [list, setList] = useState([]);
  useEffect(()=>{
    async function getAudioList(){
      const arr = [];
      const querySnapshot = await getDocs(collection(db, "audio"));
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
     
          arr.push(doc.get('name'));
      });
      arr.sort();
      setList(arr);
    }
    getAudioList();
  }, []) 
  let navigate = useNavigate();
        return (
        <div style={{ height: window.innerHeight }}>
          {<List header='Audio'>
          {list.map((item, index) => (
            <List.Item key={index} onClick={()=>{
              navigate('/AudioDisplay', {state: {pagename: item}})
            }}>{item}</List.Item>
          ))}
          </List>}
        </div>
        );
};
 
export default Audio;
