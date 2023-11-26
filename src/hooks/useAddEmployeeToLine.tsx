import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useAddEmployeeToLine = () =>{
    const agent = useAxios();
    const addEmployeeToLine = async (input:{}) =>{
        try {
            const { data } = await agent.post('Employee/addemployeetoline', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(addEmployeeToLine, {
        onError: (error) => console.log(error)
    });
}