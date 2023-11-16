import { Button, Form, Input } from "antd"
import { AddUserType } from "../../types/AddUserType";
import { useAddUser } from "../../hooks/useAddUser";

const AddUserForm = () =>{
    const [form]=Form.useForm<AddUserType>();
    const addUser = useAddUser();
    const onFinish = (values: AddUserType) =>{
        addUser.mutate(values, {onSuccess:()=>{console.log("success")}});
    }
    return (<Form labelCol={{span:6}} wrapperCol={{span:18}} onFinish={onFinish} form={form}>
        <Form.Item label="Email" name="email" rules={[{required:true, message:"Please enter the email"}]}>
            <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{required:true, message:"Please enter the password"}]}>
            <Input.Password />
        </Form.Item>
       
            <Form.Item wrapperCol={{span:24}} style={{textAlignLast:"end"}}>

            <Button style={{alignSelf:"center"}} htmlType="submit" type="primary">Add user</Button>

            </Form.Item>

    </Form>)
}

export default AddUserForm;