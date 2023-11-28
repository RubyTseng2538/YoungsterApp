import React, { useState } from 'react'
import { Cascader, Button, Space,  Form,
    Input,
    Dialog} from 'antd-mobile'
  
import { options} from './data.ts'
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


 
const EditPage = () => {
    const onFinish = (values: any) => {
        Dialog.alert({
          content: <pre>{JSON.stringify(values, null, 2)}</pre>,
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
          <RenderChildrenDemo/>
          <Form.Item
            name='pagename'
            label='Change page name'
            rules={[{ required: true, message: 'page name cannot be empty' }]}
          >
            <Input onChange={console.log} placeholder='please enter a name for the page' />
          </Form.Item>
          <Form.Item
            name='file'
            label='Upload New File'
          >
            <Input onChange={console.log} placeholder='please upload the file' />
          </Form.Item>
        </Form>
        <Button block type='submit' color='danger' size='large'>
          Delete File
        </Button>
        </div>
    );
};
 
export default EditPage;

function RenderChildrenDemo() {
  const loadFiles = async () =>{
    const querySnapshot = await getDocs(collection(db, "document"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }
   
    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState([])
    return (
      <Space align='center'>
        <Button
          onClick={() => {
            setVisible(true)
            loadFiles()
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
          onSelect={(val, extend) => {
            console.log('onSelect', val, extend.items)
          }}
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
    )
  }
