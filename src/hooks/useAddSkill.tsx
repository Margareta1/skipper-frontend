import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";
import { AddSkillType } from "../types/AddSkillType";

export const useAddSkill = () =>{
    const agent = useAxios();
    const addSkill = async (input:AddSkillType) =>{
        try {
            const { data } = await agent.post('General/addgeneralskill', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(addSkill, {
        onError: (error) => console.log(error)
    });
}