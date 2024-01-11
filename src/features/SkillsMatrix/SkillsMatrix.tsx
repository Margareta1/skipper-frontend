import { useParams } from "react-router";
import { useGetSkillsMatrix } from "../../hooks/useGetSkillsMatrix";
import { Button, Popover, Skeleton, Space } from "antd";
import SkillsMatrixInput from "./SkillsMatrixInput";

const SkillsMatrix: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSkillsMatrix(id);

  return isLoading ? (
    <Skeleton />
  ) : (
    <div className="dashboard-main-div">
      {data?.inputs.length == 0 &&<div className="administration-inner-div">No inputs.</div>}
  {data?.inputs?.map((input: any) => {
    return (
      <div key={input?.id} className="administration-inner-div">
        <div>
          <p>{input?.assignee?.userName}</p>
          <Popover
            content={
              <SkillsMatrixInput
                SkillsMatrixInputId={input?.id ? input.id : ""} AssigneeId = {input?.assignee?.id}
              />
            }
          >
            <Button>See input</Button>
          </Popover>
        </div>
      </div>
    );
  })}
</div>
  );
};

export default SkillsMatrix;
