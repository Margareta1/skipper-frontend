import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";
import { DeleteGoalType } from "../types/DeleteGoalType";
import { DeleteCVItemType } from "../types/CVType";

export const useDeleteCVItem = () =>{
    const agent = useAxios();
    const deleteCVItem = async (input:DeleteCVItemType) =>{
        try {
            const { data } = await agent.post('CV/deletecv', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(deleteCVItem, {
        onError: (error) => console.log(error)
    });
}