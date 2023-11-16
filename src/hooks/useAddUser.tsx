import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";
import { AddUserType } from "../types/AddUserType";

export const useAddUser = () =>{
    const agent = useAxios();
    const addUser = async (input:AddUserType) =>{
        try {
            const { data } = await agent.post('api/Account/register', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(addUser, {
        onError: (error) => console.log(error)
    });
}