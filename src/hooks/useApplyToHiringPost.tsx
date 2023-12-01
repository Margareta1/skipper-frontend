import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";
import { ApplyToHiringPostType } from "../types/ApplyToHiringPostType";

export const useApplyToHiringPost = () =>{
    const agent = useAxios();
    const applyToHiringPost = async (input:ApplyToHiringPostType) =>{
        try {
            const { data } = await agent.post('Staffing/addhiringpostapplication', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(applyToHiringPost, {
        onError: (error) => console.log(error)
    });
}