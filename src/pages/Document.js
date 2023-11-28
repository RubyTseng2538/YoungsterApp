import React from 'react';
import { List } from 'antd-mobile';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs} from "firebase/firestore";

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

const groups = [];

  
 
const Documents = () => {
  const loadFiles = async () =>{
    const querySnapshot = await getDocs(collection(db, "document"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      groups.push(doc.name);
      console.log(doc.data(), doc.name);
    });
  }

    return (
    <div style={{ height: window.innerHeight }} onLoad={loadFiles}>
      {<List header='Documents'>
          {groups.map((item, index) => (
            <List.Item key={index}>{item}</List.Item>
          ))}
        {/* <List.Item prefix={<UnorderedListOutline />} onClick={() => {}}>
          账单
        </List.Item>
        <List.Item prefix={<PayCircleOutline />} onClick={() => {}}>
          总资产
        </List.Item>
        <List.Item prefix={<SetOutline />} onClick={() => {}}>
          设置
        </List.Item> */}
      </List>}
    </div>
    );
};
 
export default Documents;
