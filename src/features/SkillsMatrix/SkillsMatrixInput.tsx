import { Skeleton } from "antd";
import { useGetSkillsMatrixInput } from "../../hooks/useGetSkillsMatrixInput";

interface SkillsMatrixInput {
    SkillsMatrixInputId: string;
    AssigneeId:string;
}

const SkillsMatrixInput: React.FC<SkillsMatrixInput> = (props) =>{
    const {data, isLoading} = useGetSkillsMatrixInput(props.SkillsMatrixInputId);

    return isLoading ? <Skeleton /> : (    <div>
        {data?.$values?.map((item: any) => (
          item.AssigneeId === props.AssigneeId ? (
            <div key={item.Id}>
              {item?.Inputs?.$values
                ?.sort((a: any, b: any) => a.OrderKey - b.OrderKey)
                .map((input: any) => (
                  <p key={input.Id}>
                    Question {input.OrderKey} input: {input.Input}
                  </p>
                ))}
            </div>
          ) : (
            <></>
          )
        ))}
      </div>)
}

export default SkillsMatrixInput;