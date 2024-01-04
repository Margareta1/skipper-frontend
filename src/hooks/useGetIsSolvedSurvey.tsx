import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetIsSolvedSurvey = (id:string | undefined) =>{
    const agent = useAxios();
    const getIsSolvedSurvey = async(id:string) =>{
        try{
            const {data} = await agent.get(`Survey/didsolvesurvey/${id}`);
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['didsolvesurvey', id], ()=>getIsSolvedSurvey(id!), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

