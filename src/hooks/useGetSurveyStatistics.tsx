import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetSurveyStatistics = (id:string | undefined) =>{
    const agent = useAxios();
    const getSurveyStatistics = async(id:string) =>{
        try{
            const {data} = await agent.get(`Survey/getsurveystatistics/${id}`);
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['singlesurveystatistics', id], ()=>getSurveyStatistics(id!), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

