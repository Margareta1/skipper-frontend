import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";
import { AddProjectType } from "../types/AddProjectType";

export const useAddProject = () =>{
    const agent = useAxios();
    const addProject = async (input:AddProjectType) =>{
        try {
            const { data } = await agent.post('Project/addproject', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(addProject, {
        onError: (error) => console.log(error)
    });
}