import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";
import { AddGoalType } from "../types/AddGoalType";

export const useAddGoal = () =>{
    const agent = useAxios();
    const addGoal = async (input:AddGoalType) =>{
        try {
            const { data } = await agent.post('Goal/addgoal', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(addGoal, {
        onError: (error) => console.log(error)
    });
}