import { Button, Form, Input, Select, Skeleton } from "antd";
import { useAddHiringPost } from "../../hooks/useAddHiringPost";
import { AddHiringPostType } from "../../types/AddHiringPostType";
import { useGetAllLevelsOfExperience } from "../../hooks/useGetAllLevelfOsExperience";
import { useEffect, useState } from "react";

interface AddHiringPostProps {
    projectId:string;
}

const AddHiringPost: React.FC<AddHiringPostProps> =(props) =>{
    const [form]=Form.useForm<AddHiringPostType>();
    const {data:levels, isLoading}=useGetAllLevelsOfExperience();
    const [lev, setLev]=useState<any>();
    const addPost = useAddHiringPost();
    const onFinish = (values: AddHiringPostType) =>{
        values.CompanyProjectId=props.projectId;
        values.Rgb="";
        values.UtilizationTypeId="331ec109-33e0-4c1f-99f4-0680211cec89";
        values.RequiredLanguages=[];
        values.GeneralSkills=[];
        addPost.mutate(values);
        form.resetFields();
    }

    useEffect(()=>{
      if(levels){
        setLev(levels);
      }
    },[levels])
    return ( isLoading ? <Skeleton/> :
        <Form
          name="addHiringPostForm"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item label="Position" name="Position" rules={[{ required: true, message: 'Please enter the position!' }]}>
            <Input />
          </Form.Item>
    
          <Form.Item label="Utilization Amount" name="UtilizationAmount" rules={[{ required: true, message: 'Please enter utilization amount!' }]}>
            <Input type="number" />
          </Form.Item>
    
          <Form.Item label="Employee Level of Experience" name="EmployeeLevelOfExperienceId" rules={[{ required: true, message: 'Please enter employee level of experience!' }]}>
            <Select>
                {lev?.map((level:any)=>{
                    return <Select.Option key={level.id} value={level.id}>{level.title}</Select.Option>
                })}
            </Select>
          </Form.Item>
    
          <Form.Item label="Expires At" name="ExpiresAt" rules={[{ required: true, message: 'Please select expiration date!' }]}>
            <Input type="date" />
          </Form.Item>
    
          <Form.Item label="Title" name="Title" rules={[{ required: true, message: 'Please enter the title!' }]}>
            <Input />
          </Form.Item>
    
          <Form.Item label="Budget" name="Budget" rules={[{ required: true, message: 'Please enter the budget!' }]}>
            <Input type="number" />
          </Form.Item>
    
          <Form.Item label="Preferred Start" name="PreferredStart" rules={[{ required: true, message: 'Please select preferred start date!' }]}>
          <Input type="date" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      );
}

export default AddHiringPost;