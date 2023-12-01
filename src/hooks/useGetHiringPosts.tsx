import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetHiringPosts = (id:string | undefined) =>{
    const agent = useAxios();
    const getHiringPosts = async(id:string) =>{
        try{
            const {data} = await agent.get(`Staffing/gethiringposts/${id}`);
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['hiringposts', id], ()=>getHiringPosts(id!), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

