/* eslint-disable react/prop-types */
import { Modal,Form,Input,Select,Button } from "antd"



function  FriendsAddTransactionModal({openModal,setopenModal,onTransacrtionFormFinish}) {
    const [form] = Form.useForm();
    return (
        <div>
            <Modal
      style={{ fontWeight: 600 }}
      title="Add Transaction"
      open={openModal}
      onCancel={()=>{setopenModal(false)}}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
            onTransacrtionFormFinish(values);
          form.resetFields();
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Description "
          name="descritption"
          rules={[
            {
              required: true,
              message: "Please input the description for the transaction!",
            },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please input the expense amount!" },
          ]}
        >
          <Input type="number" className="custom-input" />
        </Form.Item>
        <Form.Item
          label="Paid by"
          name="paidBy"
          style={{ fontWeight: 600 }}
          rules={[{ required: true, message: "Please select who paid the bill!" }]}
        >
          <Select className="select-input-2">
            <Select.Option value="you">you</Select.Option>
            <Select.Option value="friend">Friend</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">
            Add Transaction
          </Button>
        </Form.Item>
      </Form>
    </Modal>
        </div>
    )
}

export default FriendsAddTransactionModal
