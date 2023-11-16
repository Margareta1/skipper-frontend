import { Button, Form, Input, Select, Skeleton } from "antd"
import { AddProjectType } from "../../types/AddProjectType";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useGetAllEmployees } from "../../hooks/useGetAllEmployees";
import { useAddProject } from "../../hooks/useAddProject";

const AddProjectForm = () =>{
    const [form]=Form.useForm<AddProjectType>();
    const {data, isLoading} = useGetAllEmployees();
    const addProject = useAddProject();
    const onFinish = (values: AddProjectType) =>{
        addProject.mutate(values, {onSuccess:()=>{console.log("success")}});
    }
    return (isLoading ? <Skeleton /> : <Form labelCol={{span:6}} wrapperCol={{span:18}} onFinish={onFinish} form={form}>
        <Form.Item label="Name" name="name" rules={[{required:true, message:"Please enter the name of the project"}]}>
            <Input />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{required:true, message:"Please enter the description of the project"}]}>
            <Input />
        </Form.Item>
        <Form.Item label="Project lead" name="projectLeadId" rules={[{required:true, message:"Please enter the name of the project"}]}>
        <Select style={{ width: "200px" }}>
        {data.map((data: any) => (
          <Select.Option key={data.user.email} value={data.user.id}>
            {data.user.email}
          </Select.Option>
        ))}
      </Select>
        </Form.Item>
        <div style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"self-end"}}>
        <Form.List
              name="tagIds"
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item labelCol={{span:6}} wrapperCol={{span:18}}
                      key={field.key}
                      style={{ textAlignLast: "end", width:"100%" }}
                    >
                      <Form.Item labelCol={{span:6}} wrapperCol={{span:18}}
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        label="Tag"
                        style={{ width:"100%" }}
                      >
                        <Input style={{width:"100%", textAlignLast:"left"}} />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <AiOutlineMinusCircle
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item labelCol={{span:6}} wrapperCol={{span:18}}>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: "150px", alignSelf:"center" }}
                      icon={<AiOutlinePlusCircle />}
                    >
                      Add tag
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List></div>
            <Form.Item wrapperCol={{span:24}} style={{textAlignLast:"end"}}>

            <Button style={{alignSelf:"center"}} htmlType="submit" type="primary">Add project</Button>

            </Form.Item>

    </Form>)
}

export default AddProjectForm;