import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetProjectEmployees = (id:string | undefined) =>{
    const agent = useAxios();
    const getProjectEmployees = async(id:string) =>{
        try{
            const {data} = await agent.get(`project/getprojectemployees/${id}`);
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['projempl', id], ()=>getProjectEmployees(id!), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

