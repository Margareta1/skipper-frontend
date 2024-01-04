import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetSurvey = (id:string | undefined) =>{
    const agent = useAxios();
    const getSurvey = async(id:string) =>{
        try{
            const {data} = await agent.get(`Survey/getsurvey/${id}`);
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['singlesurvey', id], ()=>getSurvey(id!), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

