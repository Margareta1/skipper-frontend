import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";
import { AddProjectType } from "../types/AddProjectType";

export const useAddProjectComment = () =>{
    const agent = useAxios();
    const addProjectComment = async (input:{}) =>{
        try {
            const { data } = await agent.post('Project/addprojectcomment', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(addProjectComment, {
        onError: (error) => console.log(error)
    });
}