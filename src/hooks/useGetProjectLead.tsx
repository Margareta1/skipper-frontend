import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetProjectLead = (id:string | undefined) =>{
    const agent = useAxios();
    const getProjectLead = async(id:string) =>{
        try{
            const {data} = await agent.get(`project/getprojectlead/${id}`);
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['projlead', id], ()=>getProjectLead(id!), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

