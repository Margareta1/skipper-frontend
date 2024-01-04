import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetAllSurveys = () =>{
    const agent = useAxios();
    const getAllSurveys = async() =>{
        try{
            const {data} = await agent.get(`Survey/getallsurveys`);
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['surveys_all'], ()=>getAllSurveys(), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

