import { Button, Input, Modal, Skeleton } from "antd";
import { useGetAllLines } from "../../hooks/useGetAllLines";
import { useGetPersonalInfo } from "../../hooks/useGetPersonalInfo";
import jsPDF from "jspdf";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import EditEmployee from "./EditEmployee";
import { useNavigate } from "react-router";


const LineOverview: React.FC = () => {
  const { data: allLines, isLoading: isLoadingAllLines } = useGetAllLines();
  const { data: personalInfo, isLoading: isLoadingPersonalInfo } =
    useGetPersonalInfo();
    const navigate = useNavigate();
  if (allLines && personalInfo) {
    console.log(allLines, personalInfo);
  }

  const generatePDF = () => {
    const report = new jsPDF('portrait', 'pt', 'a4');
    const content = document.getElementById('report'); 
  
    if (content) {
      report.html(content, {
        callback: () => {
          report.save('employees-report.pdf');
        },
      });
    }
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


  return isLoadingAllLines || isLoadingPersonalInfo ? (
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
        <div className="line-container" >
          {allLines.map((x: any) => {
        if (x.lineManager.email === personalInfo.email) {
          return (
            <div key={x.lineManager.email}>
              {x.employees.map((y: any) => {

                return (
                  <div key={y.email}>
                    {y.email}
                    <Button
                      style={{ margin: '10px' }}
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
        <div className="line-container"></div>
      </div>
    </div>
  );
};

export default LineOverview;
