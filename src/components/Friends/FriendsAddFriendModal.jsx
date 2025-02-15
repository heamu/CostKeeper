/* eslint-disable react/prop-types */
import { Modal,Form,Input,Button } from "antd"



 function FriendsAddFriendModal({openAddFriendModal,setOpenAddFriendModal,onAddFriendFormFinish}) {
    const [form] = Form.useForm();
    return (
        <div>
        <Modal
      style={{ fontWeight: 600 }}
      title="Add Friend"
      open={openAddFriendModal}
      onCancel={()=>{setOpenAddFriendModal(false)}}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
            onAddFriendFormFinish(values);
          form.resetFields();
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the friend",
            },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>
        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">
             create a friend
          </Button>
        </Form.Item>
      </Form>
    </Modal> 
        </div>
    )
}

export default FriendsAddFriendModal
