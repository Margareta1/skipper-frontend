import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";
import { AddSkillsMatrixType } from "../types/AddSkillsMatrixType";

export const useAddSkillsMatrix = () =>{
    const agent = useAxios();
    const addSkillsMatrix = async (input:AddSkillsMatrixType) =>{
        try {
            const { data } = await agent.post('SkillsMatrix/addskillsmatrix', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(addSkillsMatrix, {
        onError: (error) => console.log(error)
    });
}