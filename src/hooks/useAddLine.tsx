import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";
import { AddLineType } from "../types/AddLineType";

export const useAddLine = () =>{
    const agent = useAxios();
    const addLine = async (input:AddLineType) =>{
        try {
            const { data } = await agent.post('Employee/addline', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(addLine, {
        onError: (error) => console.log(error)
    });
}