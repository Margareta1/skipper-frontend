import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetProjectComments = (id:string | undefined) =>{
    const agent = useAxios();
    const getProjectComments = async(id:string) =>{
        try{
            const {data} = await agent.get(`project/getprojectcomments/${id}`);
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['projcomm', id], ()=>getProjectComments(id!), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

