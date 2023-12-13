import React, {useState, useEffect } from 'react';
import { List } from 'antd-mobile';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs} from "firebase/firestore";
import { Link } from "react-router-dom";

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
 
const Video = () => {
  const [list, setList] = useState([]);
  useEffect(()=>{
    async function getVideoList(){
      const arr = [];
      const querySnapshot = await getDocs(collection(db, "video"));
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if(!arr.includes(doc.get('name'))){
          arr.push(doc.get('name'));
      }
      });
      arr.sort();
      setList(arr);
    }
    getVideoList();
  }, [])
  return (
  <div style={{ height: window.innerHeight }}>
    {<List header='Videos'>
        {list.map((item, index) => (
          <Link
          to="/VideoDisplay" style={{ color: 'black', textDecoration: 'none' }}
          state={{
            pagename: item
          }}>
          <List.Item key={index} onClick={()=>{}}>{item}</List.Item>
          </Link>
        ))}
    </List>}
  </div>
  );
};
 
export default Video;
