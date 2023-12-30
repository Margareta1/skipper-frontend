import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";
import { AddEmployeeSkillType } from "../types/AddEmployeeSkillType";

export const useAddEmployeeSkill = () =>{
    const agent = useAxios();
    const addEmployeeSkill = async (input:AddEmployeeSkillType) =>{
        try {
            const { data } = await agent.post('Employee/addemployeeskill', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(addEmployeeSkill, {
        onError: (error) => console.log(error)
    });
}