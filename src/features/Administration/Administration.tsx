import { Button, Input, Modal, Select, Skeleton } from "antd";
import { useState } from "react";
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

interface AppSettingsManagementProps {

}

const Administration: React.FC<AppSettingsManagementProps> =() =>{

    const [seeAddProject, setSeeAddProject] = useState(false);
    const [seeAddSkill, setSeeAddSkill] = useState(false);
    const [seeAddUser, setSeeAddUser] = useState(false);
    const [seeAddLanguage, setSeeAddLanguage] = useState(false);
    const [seeAddLine, setSeeAddLine] = useState(false);
    const [seeAddEmployeeToLine, setSeeAddEmployeeToLine] = useState(false);
    const {data, isLoading} = useGetAllLines();
    const {data: appPref, isLoading: isLoadingAppPref} = useGetAppPreferences();
    const {data:employees, isLoading:isLoadingEmployees} = useGetAllEmployees();

    const updateAppPreferences = useUpdateAppPreferences();
    const addEmployeeToLine = useAddEmployeeToLine();
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

    const handleUpdate = (value:string, prop: string)=>{
        updateAppPreferences.mutate({...appPref, [prop]:value});
    }

    const handleAddEmployee = (value:any, lineManager:string)=>{
        const newValue: AddEmployeeToLineType = {EmployeeUsername:value, ManagerUsername:lineManager};
        console.log("new value", newValue);
        addEmployeeToLine.mutate(newValue);
    }

    return (isLoading || isLoadingAppPref || isLoadingEmployees ? <Skeleton /> :  <div className="dashboard-main-div">
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
            {data.map((x:any)=>{
                 return <div className="line-container">
                    <p>Manager: {x.lineManager.email}</p>
                    <p>Employees: {x.employees.map((y:any)=> <span className="employee-span"> {y.email}</span>)} </p>
                    <Button onClick={showAddEmployeeToLine} style={{fontSize:"larger"}}><CiCirclePlus /></Button>
                    <Modal 
                        title="Choose employee" 
                        open={seeAddEmployeeToLine} 
                        onOk={handleOkAddEmployeeToLine} 
                        onCancel={handleCancelAddEmployeeToLine} 
                        width={"500px"}
                        footer={[<Button onClick={handleCancelAddEmployeeToLine}>Cancel</Button>]}>
                        <Select style={{ width: "400px" }} placeholder={"Select employee"} onChange={(e:any) =>{
                            handleAddEmployee(e, x.lineManager.email);
                        }}>
                        {employees.map((data: any) => (
                        <Select.Option key={data.user.email} value={data.user.email}>
                            {data.user.email}
                        </Select.Option>
                        ))}
                    </Select>
                    </Modal>
                    </div>
            })}
        </div>
        <div className="admin-app-pref">
            <h4 style={{textAlign:"start"}}>Manage app preferences</h4>
            <p className="admin-app-pref-p">Company name: <Input defaultValue={appPref.companyName} onChange={(val:any)=>{handleUpdate(val.target.value, "companyName")}} /></p>
            <p className="admin-app-pref-p">Rgb: <Input defaultValue={appPref.rgb} /></p>
        </div>
    </div>)
}

export default Administration;