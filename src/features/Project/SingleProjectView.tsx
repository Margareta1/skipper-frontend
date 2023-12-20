import {
  Button,
  Input,
  InputNumber,
  Modal,
  Select,
  Skeleton,
  Tooltip,
} from "antd";
import { useParams } from "react-router";
import { useGetProject } from "../../hooks/useGetProject";
import { useGetProjectEmployees } from "../../hooks/useGetProjectEmployees";
import { useGetProjectComments } from "../../hooks/useGetProjectComments";
import { useGetProjectTags } from "../../hooks/useGetProjectTags";
import { useGetPersonalInfo } from "../../hooks/useGetPersonalInfo";
import { useGetProjectLead } from "../../hooks/useGetProjectLead";
import { useState } from "react";
import { useAddProjectComment } from "../../hooks/useAddProjectComment";
import { useGetHiringPosts } from "../../hooks/useGetHiringPosts";
import { useApplyToHiringPost } from "../../hooks/useApplyToHiringPost";
import { ApplyToHiringPostType } from "../../types/ApplyToHiringPostType";
import { useGetAllEmployees } from "../../hooks/useGetAllEmployees";
import { AddEmployeeToProject } from "../../types/AddEmployeeToProject";
import { useAddEmployeeToProject } from "../../hooks/useAddEmployeeToProject";
import HiringPostApplicants from "./HiringPostApplicants";
import AddHiringPost from "./AddHiringPost";

const SingleProjectView: React.FC = () => {
  const { id } = useParams();
  const { data: project, isLoading: isLoadingProject } = useGetProject(id);
  const { data: employees, isLoading: isLoadingEmployees } =
    useGetProjectEmployees(id);
  const { data: comments, isLoading: isLoadingComments } =
    useGetProjectComments(id);
  const { data: tags, isLoading: isLoadingTags } = useGetProjectTags(id);
  const { data: personal, isLoading: isLoadingPersonal } = useGetPersonalInfo();
  const { data: lead, isLoading: isLoadingLead } = useGetProjectLead(id);
  const { data: hiringPosts, isLoading: isLoadingHiringPosts } =
    useGetHiringPosts(id);
  const { data: allEmpoyees, isLoading: isLoadingAllEmployees } =
    useGetAllEmployees();

  const addComment = useAddProjectComment();
  const applyToHiringPost = useApplyToHiringPost();
  const addEmployeeToProject = useAddEmployeeToProject();
  const [comment, setComment] = useState("");
  const [newEmpl, setNewEmpl] = useState("");
  const [newEmplUtil, setNewEmplUtil] = useState<number | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHiringModalOpen, setIsHiringModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showHiringModal = () => {
    setIsHiringModalOpen(true);
  };

  const handleHiringOk = () => {
    setIsHiringModalOpen(false);
  };

  const handleHiringCancel = () => {
    setIsHiringModalOpen(false);
  };

  const handleInputComment = (val: any) => {
    setComment(val.target.value);
  };
  const handleSave = () => {
    const comm = { projectId: id, comment: comment };
    addComment.mutate(comm);
  };

  const handleApply = (id: string) => {
    const val: ApplyToHiringPostType = { HiringPostId: id };
    applyToHiringPost.mutate(val);
  };

  const handleAddNewEmployee = () => {
    const newVal: AddEmployeeToProject = {
      CompanyProjectId: id,
      EmployeeUsername: newEmpl,
      Utilization: newEmplUtil,
    };
    addEmployeeToProject.mutate(newVal);
  };
  return isLoadingProject ||
    isLoadingEmployees ||
    isLoadingComments ||
    isLoadingTags ||
    isLoadingPersonal ||
    isLoadingLead ||
    isLoadingHiringPosts ||
    isLoadingAllEmployees ? (
    <Skeleton />
  ) : (
    <div className="dashboard-main-div">
      <h2 style={{ fontWeight: "900" }}>PROJECT OVERVIEW: {project.name}</h2>
      <div
        style={{
          alignItems: "center",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="administration-inner-div">
          <h3 style={{ textAlign: "center" }}>ABOUT</h3>
          <h4>Description: {project.description}</h4>
          <h4>Lead: {lead.lead.email}</h4>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h4>Tags: </h4>
            {tags.map((c: any) => {
              return (
                <p
                  style={{
                    borderRadius: "4px",
                    backgroundColor: "#f696b9",
                    color: "white",
                    padding: "5px",
                    margin: "5px",
                    height: "fit-content",
                    alignSelf: "center",
                  }}
                >
                  {c.title}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      <div className="administration-inner-div">
        <h3 style={{ textAlign: "center" }}>COMMENT SECTION</h3>
        {comments.map((x: any) => {
          return (
            <p
              style={{
                margin: "1rem",
                border: "2px black solid",
                borderRadius: "4px",
                padding: "1rem",
              }}
            >
              {x.commentor.email}: {x.comment}
            </p>
          );
        })}
        {lead.lead.id != personal.id && (
          <div className="input-proj-comment">
            <p style={{ padding: "1rem" }}>Comment:</p>{" "}
            <Input
              style={{ margin: "1rem" }}
              value={comment}
              onChange={handleInputComment}
            />
            <Button
              size="large"
              style={{ placeSelf: "center" }}
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="administration-inner-div">
        <h3 style={{ textAlign: "center" }}>EMPLOYEES</h3>
        <div className="employees-list">
          {employees.map((em: any) => {
            return (
              <span className="employee-email-display">{em.user?.email}</span>
            );
          })}
        </div>
        {lead.lead.id == personal.id && (
          <div>
            <div className="add-employee-to-proj">
              <span>Add employee to project: </span>
              <InputNumber
                onChange={(e: any) => {
                  setNewEmplUtil(e);
                }}
                style={{ width: "200px", marginRight: "1rem" }}
                size="large"
                placeholder="Utilization amount"
              />
              <Select
                size="large"
                style={{ width: "200px" }}
                onChange={setNewEmpl}
              >
                {allEmpoyees.map((data: any) => (
                  <Select.Option key={data.user.email} value={data.user.email}>
                    {data.user.email}
                  </Select.Option>
                ))}
              </Select>
              <Button
                size="large"
                style={{ marginLeft: "1rem" }}
                onClick={handleAddNewEmployee}
              >
                Add employee
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="administration-inner-div">
        <h3 style={{ textAlign: "center" }}>HIRING SECTION</h3>

        {lead.lead.id == personal.id && (
          <div className="add-hiring-post">
            <Button
              type="primary"
              style={{ width: "150px", marginLeft: "2rem" }}
              onClick={showHiringModal}
            >
              Add hiring post
            </Button>
            <Modal
              title="Add hiring post"
              open={isHiringModalOpen}
              onOk={handleHiringOk}
              onCancel={handleHiringCancel}
              style={{ width: "70%" }}
              footer={[<Button onClick={handleHiringCancel}>Cancel</Button>]}
            >
              <AddHiringPost projectId={project.id} />
            </Modal>
          </div>
        )}

        {hiringPosts.map((x: any) => {
          return (
            <div
              style={{
                border: "2px solid black",
                backgroundColor: "#C0D1FA",
                borderRadius: "4px",
                padding: "1rem",
                alignSelf: "center",
                margin: "1rem",
              }}
            >
              <h3>{x.title}</h3>
              <p>Position: {x.position}</p>
              <p>Utilization: {x.utilizationAmount}%</p>
              <p>Level of experience: {x.employeeLevelOfExperience.title}</p>
              <p>Preffered start: {x.prefferedStart}</p>

              {lead.lead.id != personal.id && (
                <>
                  <Button
                    onClick={() => {
                      handleApply(x.id);
                    }}
                  >
                    Apply
                  </Button>{" "}
                  by: {x.expiresAt}
                </>
              )}
              {lead.lead.id == personal.id && (
                <>
                  <Button type="primary" onClick={showModal}>
                    See applicants
                  </Button>
                  <Modal
                    title="Applicants"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <HiringPostApplicants HiringPostId={x.id} />
                  </Modal>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="administration-inner-div">
        <h3 style={{ textAlign: "center" }}>REPORTING</h3>
      </div>
    </div>
  );
};

export default SingleProjectView;
