import { Button, Form, Input, Select, Skeleton } from "antd";
import { AddProjectType } from "../../types/AddProjectType";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useGetAllEmployees } from "../../hooks/useGetAllEmployees";
import { useAddProject } from "../../hooks/useAddProject";
import { AddLineType } from "../../types/AddLineType";
import { useAddLine } from "../../hooks/useAddLine";

const AddLineForm = () => {
  const [form] = Form.useForm<AddLineType>();
  const { data, isLoading } = useGetAllEmployees();
  const addLine = useAddLine();
  const onFinish = (values: AddLineType) => {
    addLine.mutate(values, {onSuccess:()=>{console.log("success")}});
  };
  return isLoading ? (
    <Skeleton />
  ) : (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={onFinish}
      form={form}
    >
      <Form.Item
        label="Line manager"
        name="lineManagerId"
        rules={[{ required: true, message: "Please enter the line manager" }]}
      >
        <Select style={{ width: "200px" }}>
          {data.map((data: any) => (
            <Select.Option key={data.user.email} value={data.user.id}>
              {data.user.email}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "self-end",
        }}
      >
        <Form.List name="employees">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  key={field.key}
                  style={{ textAlignLast: "end", width: "100%" }}
                >
                  <Form.Item
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    label="Employee"
                    style={{ width: "100%" }}
                  >
                    <Select
                      style={{
                        width: "100%",
                        textAlign: "center",
                        textAlignLast: "start",
                      }}
                    >
                      {data.map((data: any) => (
                        <Select.Option
                          key={data.user.email}
                          value={data.user.id}
                        >
                          {data.user.email}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  {fields.length > 1 ? (
                    <AiOutlineMinusCircle
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: "150px", alignSelf: "center" }}
                  icon={<AiOutlinePlusCircle />}
                >
                  Add employee
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
      <Form.Item wrapperCol={{ span: 24 }} style={{ textAlignLast: "end" }}>
        <Button
          style={{ alignSelf: "center" }}
          htmlType="submit"
          type="primary"
        >
          Add line
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddLineForm;
