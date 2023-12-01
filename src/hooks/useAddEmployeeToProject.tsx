import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useAddEmployeeToProject = () =>{
    const agent = useAxios();
    const addEmployeeToProject = async (input:{}) =>{
        try {
            const { data } = await agent.post('Employee/addemployeetoproject', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(addEmployeeToProject, {
        onError: (error) => console.log(error)
    });
}