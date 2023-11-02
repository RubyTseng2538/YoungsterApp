import React, { useState } from 'react'
import { Cascader, Button, Space,  Form,
    Input,
    Dialog} from 'antd-mobile'
  
import { options} from './data.ts'

 
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
    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState([])
    return (
      <Space align='center'>
        <Button
          onClick={() => {
            setVisible(true)
          }}
        >
          选择
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
              return '未选择'
            } else {
              return items.map(item => item?.label ?? '未选择').join('-')
            }
          }}
        </Cascader>
      </Space>
    )
  }
