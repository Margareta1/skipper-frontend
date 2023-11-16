import { useMutation, useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export type loginInput = {
    username:string,
    password:string
}

export const useLogin = () =>{
    const agent = useAxios();
    const login = async (input:loginInput) =>{
        try {
            const { data } = await agent.post('https://localhost:7016/api/Account/login', {
                "username": input.username,
                "password": input.password
              })
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(login, {
        onError: (error) => console.log(error)
    });
}