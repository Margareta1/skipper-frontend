import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";
import { AddEmployeePositionLevelType } from "../types/AddEmployeePositionLevelType";

export const useAddEmployeePositionLevel = () =>{
    const agent = useAxios();
    const addEmployeePositionLevel = async (input:AddEmployeePositionLevelType) =>{
        try {
            const { data } = await agent.post('Employee/addemployeepositionlevel', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(addEmployeePositionLevel, {
        onError: (error) => console.log(error)
    });
}