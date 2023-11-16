import { Button, Modal } from "antd";
import { useState } from "react";

interface AppSettingsManagementProps {

}

const Administration: React.FC<AppSettingsManagementProps> =() =>{

    const [seeAddProject, setSeeAddProject] = useState(false);
    const [seeAddSkill, setSeeAddSkill] = useState(false);
    const [seeAddUser, setSeeAddUser] = useState(false);
    const [seeAddLanguage, setSeeAddLanguage] = useState(false);


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

    return  <div className="dashboard-main-div">
        <h2>Administration</h2>
        <div className="admin-buttons-div">
            <div className="admin-button"><Button ghost type="text" size="large" onClick={showAddProject}>Add project</Button></div>
            <div className="admin-button"><Button ghost type="text" size="large" onClick={showAddSkill}>Add skill</Button></div>
            <div className="admin-button"><Button ghost type="text" size="large" onClick={showAddUser}>Add user</Button></div>
            <div className="admin-button"><Button ghost type="text" size="large" >Add language</Button></div>
            <div className="admin-button"><Button ghost type="text" size="large" >Add line</Button></div>
            <Modal 
                title="Add project" 
                open={seeAddProject} 
                onOk={handleOkAddProject} 
                onCancel={handleCancelAddProject} 
                width={"80%"}
                footer={[<Button onClick={handleCancelAddProject}>Cancel</Button>]}>

            </Modal>
            <Modal 
                title="Add skill" 
                open={seeAddSkill} 
                onOk={handleOkAddSkill} 
                onCancel={handleCancelAddSkill} 
                width={"80%"}
                footer={[<Button onClick={handleCancelAddSkill}>Cancel</Button>]}>

            </Modal>
            <Modal 
                title="Add user" 
                open={seeAddUser} 
                onOk={handleOkAddUser} 
                onCancel={handleCancelAddUser} 
                width={"80%"}
                footer={[<Button onClick={handleCancelAddUser}>Cancel</Button>]}>

            </Modal>

        </div>
    </div>
}

export default Administration;