import { Skeleton } from "antd";
import { useGetSkillsMatrixInput } from "../../hooks/useGetSkillsMatrixInput";

interface SkillsMatrixInputProps {
    SkillsMatrixInputId: string;
    AssigneeId:string;
}

const SkillsMatrixInput: React.FC<SkillsMatrixInputProps> = (props) =>{
    const {data, isLoading} = useGetSkillsMatrixInput(props.SkillsMatrixInputId);

    return isLoading ? <Skeleton /> : (    <div>
        {data?.$values?.map((item: any) => (
          item.AssigneeId === props.AssigneeId && (
            <div>
              {item?.Inputs?.$values
                ?.map((input: any, index:any) => {
                  return <p>
                    Question {input.OrderKey} input: {input.Input}
                  </p>
})}
            </div>
          )
        ))}
      </div>)
}

export default SkillsMatrixInput;