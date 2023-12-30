import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";
import { AddEmployeeLanguageType } from "../types/AddEmployeeLanguageType";

export const useAddEmployeeLanguage = () =>{
    const agent = useAxios();
    const addEmployeeLanguage = async (input:AddEmployeeLanguageType) =>{
        try {
            const { data } = await agent.post('Employee/addemployeelanguage', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(addEmployeeLanguage, {
        onError: (error) => console.log(error)
    });
}