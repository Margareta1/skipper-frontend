import { Button, Form, Input, Modal, Select, Skeleton, Space } from "antd";
import { useGetAllLines } from "../../hooks/useGetAllLines";
import { useGetPersonalInfo } from "../../hooks/useGetPersonalInfo";
import jsPDF from "jspdf";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import EditEmployee from "./EditEmployee";
import { useGetSkillsMatrixes } from "../../hooks/useGetSkillMatrixes";
import { useAddSkillsMatrix } from "../../hooks/useAddSkillsMatrix";
import { AddSkillsMatrixType } from "../../types/AddSkillsMatrixType";
import { useGetAllEmployees } from "../../hooks/useGetAllEmployees";
import { useNavigate } from "react-router";

const LineOverview: React.FC = () => {
  const { data: allLines, isLoading: isLoadingAllLines } = useGetAllLines();
  const { data: personalInfo, isLoading: isLoadingPersonalInfo } =
  useGetPersonalInfo();
  const { data: skillsM, isLoading: isLoadingSkillsM } = useGetSkillsMatrixes();
  const addSkillsMatrix = useAddSkillsMatrix();
  const { data:allEmployees, isLoading:isLoadingAllEmployees } = useGetAllEmployees();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const generatePDF = () => {
    const report = new jsPDF("portrait", "pt", "a4");
    const content = document.getElementById("report");

    if (content) {
      report.html(content, {
        callback: () => {
          report.save("employees-report.pdf");
        },
      });
    }
  };


  const onSubmit = (values: AddSkillsMatrixType) => {
    values.Rgb="";
    addSkillsMatrix.mutate(values, {onSuccess:()=>{
      form.resetFields();
    }})
  };

  const [openModals, setOpenModals] = useState<Record<string, boolean>>({}); // State to track open modals

  const handleOpenModal = (employeeEmail: string) => {
    setOpenModals((prevOpenModals) => ({
      ...prevOpenModals,
      [employeeEmail]: true,
    }));
  };

  const handleCloseModal = (employeeEmail: string) => {
    setOpenModals((prevOpenModals) => ({
      ...prevOpenModals,
      [employeeEmail]: false,
    }));
  };

  const handleSeeSkillsMatrix = (id:string) =>{
    navigate(`/skillsmatrix/${id}`)
  }

  return isLoadingAllLines || isLoadingPersonalInfo || isLoadingAllEmployees || isLoadingSkillsM ? (
    <Skeleton />
  ) : (
    <div className="dashboard-main-div">
      <h2 style={{ fontWeight: "900" }}>LINE MANAGEMENT</h2>
      <div
        style={{
          alignItems: "center",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      ></div>
      <div className="administration-inner-div" id="report">
        <h4 style={{ textAlign: "center" }}>EMPLOYEES</h4>
        <div className="line-container">
          {allLines.map((x: any) => {
            if (x.lineManager.email === personalInfo.email) {
              return (
                <div key={x.lineManager.email}>
                  {x.employees.map((y: any) => {
                    return (
                      <div key={y.email}>
                        {y.email}
                        <Button
                          style={{ margin: "10px" }}
                          shape="round"
                          onClick={() => handleOpenModal(y.email)}
                        >
                          <FaEdit />
                        </Button>

                        <Modal
                          title={`Edit ${y.email}'s information`}
                          open={openModals[y.email]}
                          onOk={() => handleCloseModal(y.email)}
                          onCancel={() => handleCloseModal(y.email)}
                        >
                          <EditEmployee id={y.id} username={y.userName} />
                        </Modal>
                      </div>
                    );
                  })}
                </div>
              );
            }
          })}
        </div>
        <Button onClick={generatePDF}>Export employees</Button>
      </div>
      <div className="administration-inner-div">
        <h4 style={{ textAlign: "center" }}>SKILLS MATRIXES</h4>
        <Button onClick={showModal}>Create new</Button>
        <Modal
          title="Create skills matrix"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[<Button onClick={handleCancel}>Cancel</Button>]}
        >
          <Form
            form={form}
            onFinish={onSubmit}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
          >
            <Form.List name="skills">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <div
                      key={field.key}
                      style={{
                        display: "flex",
                        marginBottom: 8,
                        flexDirection: "column",
                      }}
                    >
                      <Form.Item
                        label={`Skill #${index + 1}`}
                        name={[field.name, "SkillTitle"]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter skill title",
                          },
                        ]}
                      >
                        <Input placeholder="Skill Title" />
                      </Form.Item>
                      <Form.Item
                        label="Range From"
                        name={[field.name, "RangeFrom"]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter range from",
                          },
                        ]}
                      >
                        <Input type="number" placeholder="Range From" />
                      </Form.Item>
                      <Form.Item
                        label="Range To"
                        name={[field.name, "RangeTo"]}
                        rules={[
                          { required: true, message: "Please enter range to" },
                        ]}
                      >
                        <Input type="number" placeholder="Range To" />
                      </Form.Item>
                      <Form.Item
                        label="Order Key"
                        name={[field.name, "OrderKey"]}
                        rules={[
                          { required: true, message: "Please enter order key" },
                        ]}
                      >
                        <Input type="number" placeholder="Order Key" />
                      </Form.Item>
                      <Form.Item
                        label="Skill Description"
                        name={[field.name, "SkillDescription"]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter skill description",
                          },
                        ]}
                      >
                        <Input.TextArea placeholder="Skill Description" />
                      </Form.Item>
                      <Button type="link" onClick={() => remove(field.name)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: "60%" }}
                    >
                      Add Skill
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item
              label="Assignees"
              name="assigneesIds"
              rules={[{ required: true, message: "Please select assignees" }]}
            >
              <Select
              mode="multiple"
                      style={{
                        width: "100%",
                        textAlign: "center",
                        textAlignLast: "start",
                      }}
                    >
                      {allEmployees.map((data: any) => (
                        <Select.Option

                          key={data.user.email}
                          value={data.user.id}
                        >
                          {data.user.email}
                        </Select.Option>
                      ))}
                    </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }} style={{ textAlignLast: "end" }}>
              <Button
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <div className="line-container">
        {skillsM.map((x:any)=>{
          return <div className="single-skills-matrix-p">
            {x.id} - <Button onClick={()=>{handleSeeSkillsMatrix(x.id)}}>See inputs</Button>
          </div>
        })}
          
        </div>
      </div>
    </div>
  );
};

export default LineOverview;
