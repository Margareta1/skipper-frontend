import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetHiringPostApplicants = (id:string | undefined) =>{
    const agent = useAxios();
    const getHiringPostApplicants = async(id:string) =>{
        try{
            const {data} = await agent.get(`Staffing/gethiringpostapplications/${id}`);
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['hiringpostapplicants', id], ()=>getHiringPostApplicants(id!), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

