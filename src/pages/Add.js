import React from 'react';
import {
  Form,
  Input,
  Button,
  Dialog,
  Selector,
} from 'antd-mobile';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";


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
 
export default function AddPage(){
  const db = getFirestore(app);
  // eslint-disable-next-line
  let fileValue;

    const onFinish = async (values: any) => {
      const date = new Date();
      const documentData = {
        name: values.pagename,
        type: values.filetype[0],
        link: values.filelink,
        last_edit_time: date,
      }
      console.log(values.file);
      if(values.file){
        // eslint-disable-next-line
        const filename = values.file.replace(/^.*[\\\/]/, '');
        const storage = getStorage();
        const storageRef = ref(storage, filename);
        // eslint-disable-next-line
        const fileUpload = await uploadBytes(storageRef, values.file);
        documentData.link = filename;
      }
      
      // console.log(st);
      // console.log(values.filetype[0], values.pagename[0], file);
      await addDoc(collection(db, values.filetype[0]), documentData);

        Dialog.alert({
          content: <pre>{JSON.stringify(values, null, 2)}</pre>,
        })
      }
    return (
        <>
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
          <Form.Header>Add Page</Form.Header>
          <Form.Item
            name='pagename'
            label='Page name'
            rules={[{ required: true, message: 'page name cannot be empty' }]}
          >
            <Input placeholder='please enter a page name' />
          </Form.Item>
          <Form.Item name='filetype' label='File Type'>
            <Selector
              columns={3}
              initialValue={'document'}
              options={[
                { label: 'Doc', value: 'document' },
                { label: 'Audio', value: 'audio' },
                { label: 'Video', value: 'video' },
              ]}
              onChange={(arr) => console.log(fileValue = arr[0])}
            />
          </Form.Item>
          <Form.Item
            name='file'
            label='Upload File'
          >
            <input type="file" name='file' style={{marginRight: "80%"}}></input>
          </Form.Item>
          <Form.Item
            name='filelink'
            label='Link to the video'
          >
            <Input placeholder='please enter the link to the video' />
          </Form.Item>
        </Form>
      </>
    );
};
 



