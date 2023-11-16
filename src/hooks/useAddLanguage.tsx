import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";
import { AddLanguageType } from "../types/AddLanguageType";

export const useAddLanguage = () =>{
    const agent = useAxios();
    const addLanguage = async (input:AddLanguageType) =>{
        try {
            const { data } = await agent.post('General/addlanguage', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(addLanguage, {
        onError: (error) => console.log(error)
    });
}