import { Button, Form, Input } from "antd"
import { useAddSkill } from "../../hooks/useAddSkill";
import { AddSkillType } from "../../types/AddSkillType";

interface AddSkillFormProps {
    onSuccess: ()=>void,
}

const AddSkillForm: React.FC<AddSkillFormProps> = ({onSuccess}) =>{
    const [form]=Form.useForm<AddSkillType>();
    const addSkill = useAddSkill();
    const onFinish = (values: AddSkillType) =>{
        addSkill.mutate(values, {onSuccess:()=>{onSuccess()}});
    }
    return (<Form labelCol={{span:6}} wrapperCol={{span:18}} onFinish={onFinish} form={form}>
        <Form.Item label="Name" name="name" rules={[{required:true, message:"Please enter the skill"}]}>
            <Input />
        </Form.Item>
         <Form.Item wrapperCol={{span:24}} style={{textAlignLast:"end"}}>
            <Button style={{alignSelf:"center"}} htmlType="submit" type="primary">Add skill</Button>
         </Form.Item>

    </Form>)
}

export default AddSkillForm;