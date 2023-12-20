import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useAddHiringPost = () =>{
    const agent = useAxios();
    const addHiringPost = async (input:{}) =>{
        try {
            const { data } = await agent.post('Staffing/addhiringpost', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(addHiringPost, {
        onError: (error) => console.log(error)
    });
}