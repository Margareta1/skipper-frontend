import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";
import { AddCVItemType } from "../types/CVType";

export const useAddCVItem = () =>{
    const agent = useAxios();
    const addCVItem = async (input:AddCVItemType) =>{
        try {
            const { data } = await agent.post('CV/addcv', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(addCVItem, {
        onError: (error) => console.log(error)
    });
}