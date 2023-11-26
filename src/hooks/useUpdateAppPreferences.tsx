import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";
import { AddUserType } from "../types/AddUserType";

export const useUpdateAppPreferences = () =>{
    const agent = useAxios();
    const updateAppPreferences = async (input:any) =>{
        try {
            const { data } = await agent.post('General/changeapppreferences', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(updateAppPreferences, {
        onError: (error) => console.log(error)
    });
}