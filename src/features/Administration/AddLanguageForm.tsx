import { Button, Form, Input } from "antd"
import { AddLanguageType } from "../../types/AddLanguageType";
import { useAddLanguage } from "../../hooks/useAddLanguage";

const AddLanguageForm = () =>{
    const [form]=Form.useForm<AddLanguageType>();
    const addLanguage = useAddLanguage();
    const onFinish = (values: AddLanguageType) =>{
        addLanguage.mutate(values, {onSuccess:()=>{console.log("success")}});
    }
    return (<Form labelCol={{span:6}} wrapperCol={{span:18}} onFinish={onFinish} form={form}>
        <Form.Item label="Name" name="name" rules={[{required:true, message:"Please enter the language"}]}>
            <Input />
        </Form.Item>
         <Form.Item wrapperCol={{span:24}} style={{textAlignLast:"end"}}>
            <Button style={{alignSelf:"center"}} htmlType="submit" type="primary">Add language</Button>
         </Form.Item>

    </Form>)
}

export default AddLanguageForm;