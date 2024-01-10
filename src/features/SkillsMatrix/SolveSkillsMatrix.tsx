import { useParams } from "react-router";
import { useGetSkillsMatrix } from "../../hooks/useGetSkillsMatrix";
import { Button, Skeleton, Slider } from "antd";
import { useGetPersonalInfo } from "../../hooks/useGetPersonalInfo";
import { useEffect, useState } from "react";
import { useSolveSkillsMatrix } from "../../hooks/useSolveSkillsMatrix";

const SolveSkillsMatrix: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSkillsMatrix(id);
  const { data: personalInfo, isLoading: isLoadingPersonalInfo } =
    useGetPersonalInfo();
  const [didComplete, setDidComplete] = useState(false);
  const solve = useSolveSkillsMatrix();

  useEffect(() => {
    if (data) {
      data?.inputs?.map((x: any) => {
        if (x.AssigneeId == personalInfo.Id) {
          setDidComplete(true);
        }
      });
    }
  }, [data]);

  const [solvedMatrix, setSolvedMatrix] = useState<
    Array<{ Input: number; OrderKey: number }>
  >([]);

  const handleSliderChange = (value: number, orderKey: number) => {
    const updatedMatrix = [...solvedMatrix];
    const existingIndex = updatedMatrix.findIndex(
      (item) => item.OrderKey === orderKey
    );

    if (existingIndex !== -1) {
      updatedMatrix[existingIndex].Input = value;
    } else {
      updatedMatrix.push({ Input: value, OrderKey: orderKey });
    }

    setSolvedMatrix(updatedMatrix);
  };

  const handleSubmit = () => {
    const solveSkillsMatrix = {
      Inputs: solvedMatrix,
      SkillsMatrixId: data.id,
    };
    solve.mutate(solveSkillsMatrix, {
      onSuccess: () => {
        console.log("successfull mutation");
        setDidComplete(true);
      },
    });
  };

  return isLoadingPersonalInfo || isLoading ? (
    <Skeleton />
  ) : didComplete ? (
    <div className="dashboard-main-div">
      <div className="administration-inner-div" style={{ width: "50%" }}>
        <div>You have already solved this survey! :D </div>
      </div>
    </div>
  ) : (
    <div className="dashboard-main-div">
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        {data.skills.map((skill: any) => (
          <div
            key={skill.id}
            style={{
              width: "70%",
              alignSelf: "center",
              textAlign: "center",
              backgroundColor: "#cccccc",
              borderRadius: "4px",
              margin: "10px",
            }}
          >
            <p>{skill.skillTitle}</p>
            <p>{skill.skillDescription}</p>
            <Slider
              style={{ width: "90%", margin: "5%" }}
              min={skill.rangeFrom}
              max={skill.rangeTo}
              step={1}
              onChange={(value) => handleSliderChange(value, skill.orderKey)}
            />
          </div>
        ))}
        <Button
          type="primary"
          style={{ width: "200px", alignSelf: "center" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default SolveSkillsMatrix;
