import { Button, Modal, Skeleton } from "antd";
import { useState } from "react";
import AddProjectForm from "./AddProjectForm";
import AddSkillForm from "./AddSkillForm";
import AddUserForm from "./AddUserForm";
import AddLanguageForm from "./AddLanguageForm";
import AddLineForm from "./AddLineForm";
import { useGetAllLines } from "../../hooks/useGetAllLines";

interface AppSettingsManagementProps {

}

const Administration: React.FC<AppSettingsManagementProps> =() =>{

    const [seeAddProject, setSeeAddProject] = useState(false);
    const [seeAddSkill, setSeeAddSkill] = useState(false);
    const [seeAddUser, setSeeAddUser] = useState(false);
    const [seeAddLanguage, setSeeAddLanguage] = useState(false);
    const [seeAddLine, setSeeAddLine] = useState(false);
    const {data, isLoading} = useGetAllLines();


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

    return (isLoading ? <Skeleton /> :  <div className="dashboard-main-div">
        <h2>Administration</h2>
        <div className="admin-buttons-div">
            <div className="admin-button"><Button ghost type="text" size="large" onClick={showAddProject}>Add project</Button></div>
            <div className="admin-button"><Button ghost type="text" size="large" onClick={showAddSkill}>Add skill</Button></div>
            <div className="admin-button"><Button ghost type="text" size="large" onClick={showAddUser}>Add user</Button></div>
            <div className="admin-button"><Button ghost type="text" size="large" onClick={showAddLanguage}>Add language</Button></div>
            <div className="admin-button"><Button ghost type="text" size="large" onClick={showAddLine}>Add line</Button></div>
            <Modal 
                title="Add project" 
                open={seeAddProject} 
                onOk={handleOkAddProject} 
                onCancel={handleCancelAddProject} 
                width={"80%"}
                footer={[<Button onClick={handleCancelAddProject}>Cancel</Button>]}>
                <AddProjectForm />
            </Modal>
            <Modal 
                title="Add skill" 
                open={seeAddSkill} 
                onOk={handleOkAddSkill} 
                onCancel={handleCancelAddSkill} 
                width={"80%"}
                footer={[<Button onClick={handleCancelAddSkill}>Cancel</Button>]}>
                <AddSkillForm />
            </Modal>
            <Modal 
                title="Add user" 
                open={seeAddUser} 
                onOk={handleOkAddUser} 
                onCancel={handleCancelAddUser} 
                width={"80%"}
                footer={[<Button onClick={handleCancelAddUser}>Cancel</Button>]}>
                <AddUserForm />
            </Modal>
            <Modal 
                title="Add language" 
                open={seeAddLanguage} 
                onOk={handleOkAddLanguage} 
                onCancel={handleCancelAddLanguage} 
                width={"80%"}
                footer={[<Button onClick={handleCancelAddLanguage}>Cancel</Button>]}>
                <AddLanguageForm />
            </Modal>
            <Modal 
                title="Add line" 
                open={seeAddLine} 
                onOk={handleOkAddLine} 
                onCancel={handleCancelAddLine} 
                width={"80%"}
                footer={[<Button onClick={handleCancelAddLine}>Cancel</Button>]}>
                <AddLineForm />
            </Modal>

        </div>
        <div className="admin-line">
            <h4 style={{textAlign:"start"}}>Manage lines</h4>
        </div>
    </div>)
}

export default Administration;