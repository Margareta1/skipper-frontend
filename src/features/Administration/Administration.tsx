import { Button, Form, Input, Modal, Popover, Select, Skeleton } from "antd";
import { useEffect, useState } from "react";
import AddProjectForm from "./AddProjectForm";
import AddSkillForm from "./AddSkillForm";
import AddUserForm from "./AddUserForm";
import AddLanguageForm from "./AddLanguageForm";
import AddLineForm from "./AddLineForm";
import { useGetAllLines } from "../../hooks/useGetAllLines";
import { useGetAppPreferences } from "../../hooks/useGetAppPreferences";
import { useUpdateAppPreferences } from "../../hooks/useUpdateAppPreferences";
import { CiCirclePlus } from "react-icons/ci";
import { useGetAllEmployees } from "../../hooks/useGetAllEmployees";
import { useAddEmployeeToLine } from "../../hooks/useAddEmployeeToLine";
import { AddEmployeeToLineType } from "../../types/AddEmployeeToLineType";
import { CreateSurveyType } from "../../types/CreateSurveyType";
import { useAddSurvey } from "../../hooks/useAddSurvey";
import { useGetAllSurveys } from "../../hooks/useGetAllSurveys";
import { useGetPersonalInfo } from "../../hooks/useGetPersonalInfo";
import SurveyStatistics from "../Feedback/SurveyStatistics";

const Administration: React.FC = () => {
  const [seeAddProject, setSeeAddProject] = useState(false);
  const [seeAddSkill, setSeeAddSkill] = useState(false);
  const [seeAddUser, setSeeAddUser] = useState(false);
  const [seeAddLanguage, setSeeAddLanguage] = useState(false);
  const [seeAddLine, setSeeAddLine] = useState(false);
  const [seeAddEmployeeToLine, setSeeAddEmployeeToLine] = useState(false);
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
  const [form] = Form.useForm<CreateSurveyType>();

  const addSurvey = useAddSurvey();
  const updateAppPreferences = useUpdateAppPreferences();
  const addEmployeeToLine = useAddEmployeeToLine();
  const { data: appPref, isLoading: isLoadingAppPref } = useGetAppPreferences();
  const { data: employees, isLoading: isLoadingEmployees } =
  useGetAllEmployees();
  const { data: allEmpoyees, isLoading: isLoadingAllEmployees } =
  useGetAllEmployees();
  const { data: allSurveys, isLoading: isLoadingAllSurveys } =
  useGetAllSurveys();
  const { data, isLoading } = useGetAllLines();
  const { data: personal, isLoading: isLoadingPersonal } = useGetPersonalInfo();
  const [appPreferences, setAppPreferences] = useState<any>();
  const [empl, setEmpl] = useState<any>();
  const [allEmpl, setAllEmpl] = useState<any>();
  const [allSur, setAllSur] = useState<any>();
  const [allLines, setAllLines] = useState<any>();
  const [pers, setPers] = useState<any>();

  useEffect(()=>{
    if(appPref){
      setAppPreferences(appPref);
    }
    if(employees){
      setEmpl(employees);
    }
    if(allEmpoyees){
      setAllEmpl(allEmpoyees);
    }
    if(allSurveys){
      setAllSur(allSurveys)
    }
    if(data){
      setAllLines(data);
    }
    if(personal){
      setPers(personal)
    }

  }, [appPref, employees, allEmpoyees, allSurveys, data, personal])
  

  const getFormatedDate = (input: string) => {
    const dateObject = new Date(input);
    const formattedDateString = dateObject.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formattedDateString;
  };

  const showAddProject = () => {
    setSeeAddProject(true);
  };

  const handleOkAddProject = () => {
    setSeeAddProject(false);
  };

  const handleCancelAddProject = () => {
    setSeeAddProject(false);
  };

  const showAddSkill = () => {
    setSeeAddSkill(true);
  };

  const handleOkAddSkill = () => {
    setSeeAddSkill(false);
  };

  const handleCancelAddSkill = () => {
    setSeeAddSkill(false);
  };
  const showAddUser = () => {
    setSeeAddUser(true);
  };

  const handleOkAddUser = () => {
    setSeeAddUser(false);
  };

  const handleCancelAddUser = () => {
    setSeeAddUser(false);
  };
  const showAddLanguage = () => {
    setSeeAddLanguage(true);
  };

  const handleOkAddLanguage = () => {
    setSeeAddLanguage(false);
  };

  const handleCancelAddLanguage = () => {
    setSeeAddLanguage(false);
  };
  const showAddLine = () => {
    setSeeAddLine(true);
  };

  const handleOkAddLine = () => {
    setSeeAddLine(false);
  };

  const handleCancelAddLine = () => {
    setSeeAddLine(false);
  };

  const showAddEmployeeToLine = () => {
    setSeeAddEmployeeToLine(true);
  };

  const handleOkAddEmployeeToLine = () => {
    setSeeAddEmployeeToLine(false);
  };

  const handleCancelAddEmployeeToLine = () => {
    setSeeAddEmployeeToLine(false);
  };

  const handleUpdate = (value: string, prop: string) => {
    updateAppPreferences.mutate({ ...appPreferences, [prop]: value });
  };

  const handleAddEmployee = (value: any, lineManager: string) => {
    const newValue: AddEmployeeToLineType = {
      EmployeeUsername: value,
      ManagerUsername: lineManager,
    };
    addEmployeeToLine.mutate(newValue, {onSuccess:()=>{
      setSeeAddEmployeeToLine(false);
    }});
  };

  const showSurveyModal = () => {
    setIsSurveyModalOpen(true);
  };

  const handleSurveyOk = () => {
    setIsSurveyModalOpen(false);
  };

  const handleSurveyCancel = () => {
    setIsSurveyModalOpen(false);
  };

  const handleCreateSurvey = (values: CreateSurveyType) => {
    addSurvey.mutate(values, {
      onSuccess: () => {
        form.resetFields();
        setSeeAddProject(false);
      },
    });
  };

  return isLoading ||
    isLoadingAppPref ||
    isLoadingEmployees ||
    isLoadingAllEmployees ||
    isLoadingAllSurveys || 
    isLoadingPersonal ? (
    <Skeleton />
  ) : (
    <div className="dashboard-main-div">
      <h2>Administration</h2>

      <div className="administration-inner-div">
        <div className="admin-buttons-div">
          <div className="admin-button" onClick={showAddProject}>
            ADD PROJECT
          </div>
          <div className="admin-button" onClick={showAddSkill}>
            ADD SKILL
          </div>
          <div className="admin-button" onClick={showAddUser}>
            ADD USER
          </div>
          <div className="admin-button" onClick={showAddLanguage}>
            ADD LANGUAGE
          </div>
          <div className="admin-button" onClick={showAddLine}>
            ADD LINE
          </div>
          <Modal
            title="Add project"
            open={seeAddProject}
            onOk={handleOkAddProject}
            onCancel={handleCancelAddProject}
            width={"80%"}
            footer={[<Button onClick={handleCancelAddProject}>Cancel</Button>]}
          >
            <AddProjectForm onSuccess={handleOkAddProject} />
          </Modal>
          <Modal
            title="Add skill"
            open={seeAddSkill}
            onOk={handleOkAddSkill}
            onCancel={handleCancelAddSkill}
            width={"80%"}
            footer={[<Button onClick={handleCancelAddSkill}>Cancel</Button>]}
          >
            <AddSkillForm onSuccess={handleOkAddSkill} />
          </Modal>
          <Modal
            title="Add user"
            open={seeAddUser}
            onOk={handleOkAddUser}
            onCancel={handleCancelAddUser}
            width={"80%"}
            footer={[<Button onClick={handleCancelAddUser}>Cancel</Button>]}
          >
            <AddUserForm onSuccess={handleOkAddUser} />
          </Modal>
          <Modal
            title="Add language"
            open={seeAddLanguage}
            onOk={handleOkAddLanguage}
            onCancel={handleCancelAddLanguage}
            width={"80%"}
            footer={[<Button onClick={handleCancelAddLanguage}>Cancel</Button>]}
          >
            <AddLanguageForm onSuccess={handleOkAddLanguage} />
          </Modal>
          <Modal
            title="Add line"
            open={seeAddLine}
            onOk={handleOkAddLine}
            onCancel={handleCancelAddLine}
            width={"80%"}
            footer={[<Button onClick={handleCancelAddLine}>Cancel</Button>]}
          >
            <AddLineForm onSuccess={handleOkAddLine} />
          </Modal>
        </div>
      </div>

      <div className="administration-inner-div">
        <div className="admin-line">
          <h4 style={{ textAlign: "center" }}>LINES</h4>
          {allLines.map((x: any) => {
            return (
              <div className="line-container">
                <p>
                  <span className="font-weight-900">Manager:</span>{" "}
                  {x.lineManager.email}
                </p>
                <p>
                  <span className="font-weight-900">Employees:</span>{" "}
                  {x.employees.map((y: any) => (
                    <span className="employee-span"> {y.email}</span>
                  ))}{" "}
                </p>
                <Button
                  onClick={showAddEmployeeToLine}
                  style={{ fontSize: "larger" }}
                >
                  <CiCirclePlus />
                </Button>
                <Modal
                  title="Choose employee"
                  open={seeAddEmployeeToLine}
                  onOk={handleOkAddEmployeeToLine}
                  onCancel={handleCancelAddEmployeeToLine}
                  width={"500px"}
                  footer={[
                    <Button onClick={handleCancelAddEmployeeToLine}>
                      Cancel
                    </Button>,
                  ]}
                >
                  <Select
                    style={{ width: "400px" }}
                    placeholder={"Select employee"}
                    onChange={(e: any) => {
                      handleAddEmployee(e, x.lineManager.email);
                    }}
                  >
                    {empl?.map((data: any) => (
                      <Select.Option
                        key={data.user.email}
                        value={data.user.email}
                      >
                        {data.user.email}
                      </Select.Option>
                    ))}
                  </Select>
                </Modal>
              </div>
            );
          })}
        </div>
      </div>

      <div className="administration-inner-div">
        <div className="admin-app-pref">
          <h4 style={{ textAlign: "center" }}>APP PREFERENCES</h4>
          <p className="admin-app-pref-p">
            <span className="font-weight-900">Company name:</span>
            <Input
              defaultValue={appPreferences?.companyName}
              onChange={(val: any) => {
                handleUpdate(val.target.value, "companyName");
              }}
            />
          </p>
          <p className="admin-app-pref-p">
            <span className="font-weight-900">RGB:</span>{" "}
            <Input defaultValue={appPreferences.rgb} />
          </p>
        </div>
      </div>

      <div className="administration-inner-div">
        <h3 style={{ textAlign: "center" }}>FEEDBACK</h3>
        <Button
          type="primary"
          style={{ width: "150px", marginLeft: "2rem" }}
          onClick={showSurveyModal}
        >
          Create survey
        </Button>
        <Modal
          title="Create survey"
          open={isSurveyModalOpen}
          onOk={handleSurveyOk}
          onCancel={handleSurveyCancel}
          style={{ width: "70%" }}
          footer={[<Button onClick={handleSurveyCancel}>Cancel</Button>]}
        >
          <Form onFinish={handleCreateSurvey} form={form}>
            <Form.Item
              label="Start Date"
              name="StartDate"
              rules={[{ required: true, message: "Please select start date!" }]}
            >
              <Input type="date" />
            </Form.Item>

            <Form.Item
              label="End Date"
              name="EndDate"
              rules={[{ required: true, message: "Please select end date!" }]}
            >
              <Input type="date" />
            </Form.Item>

            <Form.Item
              label="Questions"
              name="Questions"
              rules={[
                {
                  required: true,
                  message: "Please add at least one question!",
                },
              ]}
            >
              <Form.List name="Questions">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key}>
                        <Form.Item
                          {...restField}
                          label="Question Label"
                          name={[name, "Label"]}
                          rules={[
                            {
                              required: true,
                              message: "Please enter question label!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          label="Order Key"
                          name={[name, "OrderKey"]}
                          rules={[
                            {
                              required: true,
                              message: "Please enter order key!",
                            },
                          ]}
                        >
                          <Input type="number" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          label="Placeholder"
                          name={[name, "Placeholder"]}
                          rules={[
                            {
                              required: true,
                              message: "Please enter placeholder!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Button type="default" onClick={() => remove(name)}>
                          Remove Question
                        </Button>
                      </div>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: "100%" }}
                      >
                        Add Question
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>

            <Form.Item
              label="Assignees Usernames"
              name="AssigneesUsernames"
              rules={[
                {
                  required: true,
                  message: "Please enter at least one assignee username!",
                },
              ]}
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Enter assignee usernames"
              >
                {allEmpl?.map((data: any) => (
                  <Select.Option
                    key={data.user.userName}
                    value={data.user.userName}
                  >
                    {data.user.userName}
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
              <Form.Item
                wrapperCol={{ span: 24 }}
                style={{ textAlignLast: "end" }}
              >
                <Button
                  style={{ alignSelf: "center" }}
                  htmlType="submit"
                  type="primary"
                >
                  Create
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>

        {allSur?.surveysWithAssignees?.map((x:any)=>{
          if(x.survey.creatorId==pers?.id){
            return <div className="line-container">
              <span className="font-weight-900">{}</span>: {getFormatedDate(x.survey.startDate)} - {getFormatedDate(x.survey.endDate)}  
              <Popover content={<SurveyStatistics Id={x.survey.id} />} title="Survey statistics">
    <Button style={{margin:"10px"}} type="primary">Show statistics</Button>
  </Popover>
            </div>
          }
          else{
            return;
          }

        })}
      </div>


    </div>
  );
};

export default Administration;
