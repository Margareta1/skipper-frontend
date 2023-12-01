import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetProject = (id:string | undefined) =>{
    const agent = useAxios();
    const getProject = async(id:string) =>{
        try{
            const {data} = await agent.get(`project/getproject/${id}`);
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['proj', id], ()=>getProject(id!), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

