import { Button, Form, Input, Modal, Select } from "antd";
import { useAddGoal } from "../../hooks/useAddGoal";
import { useDeleteGoal } from "../../hooks/useDeleteGoal";
import { useGetEmployeeOverview } from "../../hooks/useGetEmployeeOverview";
import { useGetGoals } from "../../hooks/useGetGoals";
import { useGetPersonalInfo } from "../../hooks/useGetPersonalInfo";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import { AddGoalType } from "../../types/AddGoalType";
import { DeleteGoalType } from "../../types/DeleteGoalType";
import { useGetCV } from "../../hooks/useGetCVs";
import { AddCVItemType, DeleteCVItemType } from "../../types/CVType";
import { useAddCVItem } from "../../hooks/useAddCVItem";
import { useDeleteCVItem } from "../../hooks/useDeleteCVItem";
import { jsPDF } from "jspdf";
import { useGetAllAssignedSurveys } from "../../hooks/useGetAllAssignedSurveys";
import { useNavigate } from "react-router";
import { useGetAssignedSkillsMatrixes } from "../../hooks/useGetAssignedSkillsMatrixes";

const EECoptions = [
  { value: "Education", label: "Education" },
  { value: "Experience", label: "Experience" },
  { value: "Certification", label: "Certification" },
];

const ProfileOverview: React.FC = () => {
  const [newGoal, setNewGoal] = useState<string>("");
  const [isOpenCVItem, setIsOpenCVItem] = useState(false);
  const [form] = Form.useForm<AddCVItemType>();
  const addCVItem = useAddCVItem();
  const deleteCVItem = useDeleteCVItem();
  const { data: personalInfo } = useGetPersonalInfo();
  const { data: employeeData } = useGetEmployeeOverview();
  const { data: goals } = useGetGoals();
  const { data: cv } = useGetCV();
  const { data: assignedSurveys } =
  useGetAllAssignedSurveys();
  const {data:assignedSkillsMatrixes } = useGetAssignedSkillsMatrixes();
  const navigate = useNavigate();
  const deleteGoal = useDeleteGoal();
  const addGoal = useAddGoal();
  const [pers, setPers] = useState<any>();
  const [empl, setEmpl] = useState<any>();
  const [go, setGoals] = useState<any>();
  const [allCvs, setAllCvs] = useState<any>();
  const [sur, setSur] = useState<any>();
  const [mat, setMat] = useState<any>();

  useEffect(()=>{
    if(personalInfo){
      setPers(personalInfo);
    }
    if(employeeData){
      setEmpl(employeeData);
    }
    if(goals){
      setGoals(goals)
    }
    if(cv){
      setAllCvs(cv);
    }
    if(assignedSurveys){
      setSur(assignedSurveys)
    }
    if(assignedSkillsMatrixes){
      setMat(assignedSkillsMatrixes);
    }
  }, [personalInfo, employeeData, goals, cv, assignedSurveys, assignedSkillsMatrixes])

  const showModal = () => {
    setIsOpenCVItem(true);
  };

  const handleOk = () => {
    setIsOpenCVItem(false);
  };

  const handleCancel = () => {
    setIsOpenCVItem(false);
  };

  const handleAddGoal = (username: string) => {
    let g: AddGoalType = { UserName: username, Description: newGoal };
    addGoal.mutate(g);
  };

  const handleDeleteGoal = (id: string) => {
    let g: DeleteGoalType = { GoalId: id };
    deleteGoal.mutate(g);
  };

  const handleAddCVItem = (input: AddCVItemType) => {
    input.CVId = allCvs.$values[0].CV.Id;
    console.log(input);
    addCVItem.mutate(input, {onSuccess:()=>{
      console.log("success")
      setAllCvs([...allCvs, input]);
    }});
    form.resetFields();
  };

  const getFormatedDate = (input: string) => {
    const dateObject = new Date(input);
    const formattedDateString = dateObject.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formattedDateString;
  };
  const handleRemoveCVItem = (id: string) => {
    let deleteItemDto: DeleteCVItemType = { Id: id };
    deleteCVItem.mutate(deleteItemDto);
  };

  const generatePDF = () => {
    const report = new jsPDF('portrait', 'pt', 'a4');
    const content = document.getElementById('report'); 
  
    if (content) {
      report.html(content, {
        callback: () => {
          report.save('report.pdf');
        },
      });
    }
  };

  const isValid = (startDate:string, endDate:string) =>{
    const today = new Date();
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    return today >= parsedStartDate && today <= parsedEndDate;
  }

  const navigateToSolver = (id:string, type:string)=>{
    if(type==='survey'){
      navigate(`/solvesurvey/${id}`);

    }
    else if (type==='skillsm'){
      navigate(`/solveskillsmatrix/${id}`);
    }
  }

  return (
    cv &&
    goals &&
    personalInfo &&
    employeeData && 
    assignedSurveys &&
    assignedSkillsMatrixes &&(
      <div className="dashboard-main-div">
        <h2 style={{ fontWeight: "900" }}>MY PROFILE</h2>
        <div
          style={{
            alignItems: "center",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        ></div>
        <div className="administration-inner-div">
          <h4 style={{ textAlign: "center" }}>ABOUT ME</h4>
          <div className="line-container">
            <p>
              <span className="font-weight-900">Username:</span>{" "}
              {pers?.userName}
            </p>
            <p>
              <span className="font-weight-900">Projects:</span>{" "}
              {empl?.find((x: any) => x.key == pers?.id).projects}
            </p>
            <p>
              <span className="font-weight-900">Languages:</span>{" "}
              {
                empl?.find((x: any) => x.key == pers?.id)
                  .languages
              }
            </p>
            <p>
              <span className="font-weight-900">Skills:</span>{" "}
              {empl?.find((x: any) => x.key == pers?.id).skills}
            </p>
            <p>
              <span className="font-weight-900">Utilization:</span>{" "}
              {
                empl?.find((x: any) => x.key == pers?.id)
                  .utilizationType
              }
            </p>
            <p>
              <span className="font-weight-900">Utilization %:</span>{" "}
              {
                empl?.find((x: any) => x.key == pers?.id)
                  .utilizationAmount
              }
            </p>
          </div>
        </div>

        <div className="administration-inner-div">
          <h4 style={{ textAlign: "center" }}>MY GOALS</h4>
          <div className="line-container">
            {go?.map((goal: any) => {
              return (
                <p>
                  <span className="font-weight-900 margin-right-1rem">
                    {goal.description}
                  </span>
                  <Button
                    onClick={() => {
                      handleDeleteGoal(goal.id);
                    }}
                  >
                    <CiCircleMinus />
                  </Button>
                </p>
              );
            })}
            <p>
              <span className="font-weight-900 margin-right-1rem">
                <Input
                  onChange={(e: any) => setNewGoal(e.target.value)}
                  style={{ width: "300px" }}
                />
              </span>
              <Button
                onClick={() => {
                  handleAddGoal(pers?.userName);
                }}
              >
                <CiCirclePlus />
              </Button>
            </p>
          </div>
        </div>

        <div className="administration-inner-div" id="report">
          <h3 style={{ textAlign: "center" }}>CV</h3>
          <h4>Education</h4>
          {allCvs?.$values[0]?.CV?.CVItems?.$values?.map((item: any) => {
            {
              if (item.EducationExperienceOrCert == "Education") {
                return (
                  <div className="cv-container">
                    <p>{item.Title}</p>
                    <p>
                      {getFormatedDate(item.From)} - {getFormatedDate(item.To)}{" "}
                      {item.Description}{" "}
                      <span>
                        <Button
                          onClick={() => {
                            handleRemoveCVItem(item.Id);
                          }}
                        >
                          <CiCircleMinus />
                        </Button>
                      </span>
                    </p>
                  </div>
                );
              } else {
                return <></>;
              }
            }
          })}
          <h4>Experience</h4>

          {allCvs?.$values[0]?.CV?.CVItems?.$values?.map((item: any) => {
            {
              if (item.EducationExperienceOrCert == "Experience") {
                return (
                  <div className="cv-container">
                    <p>{item.Title}</p>
                    <p>
                      {getFormatedDate(item.From)} - {getFormatedDate(item.To)}{" "}
                      {item.Description}
                      <span>
                        <Button
                          onClick={() => {
                            handleRemoveCVItem(item.Id);
                          }}
                        >
                          <CiCircleMinus />
                        </Button>
                      </span>
                    </p>
                  </div>
                );
              } else {
                return <></>;
              }
            }
          })}

          <h4>Certification</h4>

          {allCvs?.$values[0]?.CV?.CVItems?.$values?.map((item: any) => {
            {
              if (item.EducationExperienceOrCert == "Certification") {
                return (
                  <div className="cv-container">
                    <p>{item.Title}</p>
                    <p>
                      {getFormatedDate(item.From)} - {getFormatedDate(item.To)}{" "}
                      {item.Description}
                      <span>
                        <Button
                          onClick={() => {
                            handleRemoveCVItem(item.Id);
                          }}
                        >
                          <CiCircleMinus />
                        </Button>
                      </span>
                    </p>
                  </div>
                );
              } else {
                return <></>;
              }
            }
          })}
          <Button onClick={generatePDF}>Export PDF</Button>

          <Button onClick={showModal}>
            <CiCirclePlus />
          </Button>
          <Modal
            title="Basic Modal"
            open={isOpenCVItem}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[<Button onClick={handleCancel}>Cancel</Button>]}
          >
            <Form onFinish={handleAddCVItem} form={form}>
              <Form.Item
                label="Title"
                name="Title"
                rules={[{ required: true, message: "Please input title!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Education/Experience/Certification"
                name="EducationExperienceOrCert"
                rules={[
                  {
                    required: true,
                    message: "Please input education/experience/certification!",
                  },
                ]}
              >
                <Select options={EECoptions} />
              </Form.Item>

              <Form.Item
                label="Description"
                name="Description"
                rules={[
                  { required: true, message: "Please input description!" },
                ]}
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item
                label="From"
                name="From"
                rules={[
                  { required: true, message: "Please select From date!" },
                ]}
              >
                <Input type="date" />
              </Form.Item>

              <Form.Item
                label="To"
                name="To"
                rules={[{ required: true, message: "Please select To date!" }]}
              >
                <Input type="date" />
              </Form.Item>

              <Form.Item
                wrapperCol={{ span: 24 }}
                style={{ textAlignLast: "end" }}
              >
                <Button
                  style={{ alignSelf: "center" }}
                  htmlType="submit"
                  type="primary"
                >
                  Add item
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>

        <div className="administration-inner-div">
          <h4 style={{ textAlign: "center" }}>SKILLS MATRIX</h4>
          {mat?.map((x:any)=>{
            return <div className="line-container">
            {x.id}  <Button ghost onClick={()=>{navigateToSolver(x.id, 'skillsm')}}>Solve</Button>
          </div>
          })}
        </div>

        <div className="administration-inner-div">
          <h4 style={{ textAlign: "center" }}>SURVEYS</h4>
          {sur?.map((x:any)=>{
            if(isValid(x.startDate, x.endDate)){
            return <div className="line-container">
              <span className="font-weight-900">{x.id}</span> <Button ghost onClick={()=>{navigateToSolver(x.id, 'survey')}}>Solve</Button>  
            </div>
            }
        })}
        </div>
      </div>
    )
  );
};

export default ProfileOverview;
