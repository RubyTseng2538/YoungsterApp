import React, { useState, useEffect } from 'react'
import { Cascader, Button, Space,  Form,
    Input,
    Dialog} from 'antd-mobile'
  
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc, query, where, deleteDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";

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


 
const EditPage = () => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState([]);
  const [docu, setDoc] = useState([]);
  const [video, setVid] = useState([]);
  const [audio, setAud] = useState([]);
  let options = [];
  useEffect(()=>{
    async function getDocumentList(){
      const arr1 = [];
      const querySnapshot = await getDocs(collection(db, "document"));
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots   
          arr1.push({
            label :doc.get('name'),
            value :doc.get('name')});
      });
      arr1.sort();
      setDoc(arr1);
    }
    getDocumentList();
    async function getAudioList(){
      const arr2 = [];
      const querySnapshot = await getDocs(collection(db, "audio"));
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
          arr2.push({
            label :doc.get('name'),
            value :doc.get('name')});
      });
      arr2.sort();
      setAud(arr2);
    }
    getAudioList();
    async function getVideoList(){
      const arr3 = [];
      const querySnapshot = await getDocs(collection(db, "video"));
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
          arr3.push({
            label :doc.get('name'),
            value :doc.get('name')});
      });
      arr3.sort();
      setVid(arr3);
    }
    getVideoList();
  }
  , []);
  
  if(document.length !==0 && audio.length !== 0 && video.length !== 0){
    options = [
      {
        label: 'document',
        value: 'document',
        children: docu
      },
      // {
      //   label: 'audio',
      //   value: 'audio',
      //   children: audio
      // },
      {
        label: 'video',
        value: 'video',
        children: video
      }
    ]
  }
  const onFinish = async (values: any) => {
    console.log(values)
    let docRef = collection(db, value[0]);
    const page = query(docRef, where("name", "==", value[1]));
    const querySnapshot = await getDocs(page);
    let docId;
    let oldLink;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      docId = doc.id;
      oldLink = doc.get('link')
  });
    const date = new Date();
    let name = values.pagename;
    const fileData = document.getElementById("fileData").files[0];
    let link = values.filelink;
    if(name){
      await updateDoc(doc(db, value[0], docId), {name: name, last_edit_time: date});
    }
    if(fileData){
      const filename = fileData.name;
      const storage = getStorage();
      const fileRef = ref(storage, oldLink);
      deleteObject(fileRef);
      const storageRef = ref(storage, filename);
      // eslint-disable-next-line
      const fileUpload = await uploadBytes(storageRef, fileData);
      await updateDoc(doc(db, value[0], docId), {link: filename, last_edit_time: date});
    }
    if(link){
      await updateDoc(doc(db, value[0], docId), {link: link, last_edit_time:date});
    }
      Dialog.alert({
        content: <pre>{value[1]} is Edited!</pre>,
      })
    }
  const onDelete = async() =>{
    let docRef = collection(db, value[0]);
    const page = query(docRef, where("name", "==", value[1]));
    const querySnapshot = await getDocs(page);
    let docId;
    let oldLink;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      docId = doc.id;
      oldLink = doc.get('link')
    });
    if(value[0] === 'document'){
      const storage = getStorage();
      const fileRef = ref(storage, oldLink);
      deleteObject(fileRef);
    }
    await deleteDoc(doc(db, value[0], docId));
    Dialog.alert({
      content: <pre>{value[1]} is Deleted!</pre>,
    })
  }
  return (
      <div>
        <Form
          name='form'
          layout='horizontal'
          onFinish={onFinish}
          footer={
            <Button block type='submit' color='primary' size='large'>
              Submit
            </Button>
          }
        >
          <Form.Header>Edit Page</Form.Header>
          <Space align='center'>
            <Button
              onClick={() => {
                setVisible(true)
              }}
            >
              Choose the file you want to change
            </Button>
            <Cascader
              options={options}
              visible={visible}
              onClose={() => {
                setVisible(false)
              }}
              value={value}
              onConfirm={setValue}
              cancelText = 'Cancel'
              confirmText = 'Confirm'
              placeholder='Options'
            >
              {items => {
                if (items.every(item => item === null)) {
                  return 'no file selected'
                } else {
                  return items.map(item => item?.label ?? 'no file selected').join('-')
                }
              }}
            </Cascader>
          </Space>
          <Form.Item
            name='pagename'
            label='Change page name'
          >
            <Input placeholder='please enter a name for the page' />
          </Form.Item>
          <Form.Item
              name='file'
              label='Upload File'
            >
      <input type="file" name='file' id='fileData' style={{marginRight: "80%"}}></input>
          </Form.Item>
          <Form.Item
              name='filelink'
              label='Link to the video'
            >
              <Input placeholder='please enter the link to the video' />
            </Form.Item>
        </Form>
        <Button block type='submit' onClick={onDelete} color='danger' size='large'>
          Delete File
        </Button>
      </div>
  );
};
 
export default EditPage;

