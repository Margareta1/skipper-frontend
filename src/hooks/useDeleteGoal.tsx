import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";
import { DeleteGoalType } from "../types/DeleteGoalType";

export const useDeleteGoal = () =>{
    const agent = useAxios();
    const deleteGoal = async (input:DeleteGoalType) =>{
        try {
            const { data } = await agent.post('Goal/deletegoal', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(deleteGoal, {
        onError: (error) => console.log(error)
    });
}