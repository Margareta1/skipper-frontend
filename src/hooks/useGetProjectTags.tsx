import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetProjectTags = (id:string | undefined) =>{
    const agent = useAxios();
    const getProjectTags = async(id:string) =>{
        try{
            const {data} = await agent.get(`project/getprojecttags/${id}`);
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['projtags', id], ()=>getProjectTags(id!), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

