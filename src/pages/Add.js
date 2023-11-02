import React from 'react';
import {
  Form,
  Input,
  Button,
  Dialog,
  Selector,
} from 'antd-mobile';



 
export default function AddPage(){
    const onFinish = (values: any) => {
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
            <Input onChange={console.log} placeholder='please enter a name for the page' />
          </Form.Item>
          <Form.Item name='filetype' label='File Type'>
            <Selector
              columns={3}
              options={[
                { label: 'Document', value: 'document' },
                { label: 'Audio', value: 'audio' },
                { label: 'Video', value: 'video' },
              ]}
            />
          </Form.Item>
          <Form.Item
            name='file'
            label='Upload File'
            rules={[{ required: true, message: 'file cannot be empty' }]}
          >
            <Input onChange={console.log} placeholder='please upload the file' />
          </Form.Item>
        </Form>
      </>
    );
};
 

