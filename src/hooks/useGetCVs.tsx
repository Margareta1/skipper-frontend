import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetCV = () =>{
    const agent = useAxios();
    const getCV = async() =>{
        try{
            const {data} = await agent.get(`CV/getall`);
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['cv'], ()=>getCV(), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

