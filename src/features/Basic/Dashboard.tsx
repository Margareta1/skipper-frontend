import { useNavigate } from "react-router";
import { useAxios } from "../../axios/useAxios";
import { useEffect } from "react";
import { Button, Tabs } from "antd";
import ProjectOverview from "../Project/ProjectOverview";
import EmployeeOverview from "../Employee/EmployeeOverview";
import ProfileOverview from "../Employee/ProfileOverview";
import { useCookies } from "react-cookie";
import { decodeToken } from "../../util/decode-token";

const Dashboard = () => {
  const navigate = useNavigate();
  const agent = useAxios();
  const [accessCookie, setAccessCookie, removeAccessCookie] = useCookies(["access"]);
  const [refreshCookie, setRefreshCookie, removeRefreshCookie] = useCookies(["refresh"]);
const handleNavigate = (input:string)=>{
  navigate(input);
}
const handleLogout = () =>{
removeAccessCookie('access');
removeRefreshCookie('refresh');
}
const token = decodeToken(accessCookie?.access);
console.log(token);

  
 return <div className="dashboard-main-div">
  <div className="div-buttons-container">
    <div className="dashboard-div" onClick={()=>{handleNavigate("/profile")}} >MY PROFILE</div>
    <div className="dashboard-div" onClick={()=>{handleNavigate("/projects")}}>PROJECT OVERVIEW</div>
    <div className="dashboard-div" onClick={()=>{handleNavigate("/employees")}}>EMPLOYEE OVERVIEW</div>
{token.Roles.includes('Admin') && <div className="dashboard-div" onClick={()=>{handleNavigate("/administration")}}>ADMINISTRATION</div>}
{token.Roles.includes('Manager') && <div className="dashboard-div" onClick={()=>{handleNavigate("/management")}}>MANAGEMENT</div>}
    <div className="dashboard-div" onClick={handleLogout}>LOGOUT</div>
  </div></div>;
};

export default Dashboard;
