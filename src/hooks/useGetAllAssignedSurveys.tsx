import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetAllAssignedSurveys = () =>{
    const agent = useAxios();
    const getAllAssignedSurveys = async() =>{
        try{
            const {data} = await agent.get(`Survey/getallassignedsurveys`);
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['surveys_assigned'], ()=>getAllAssignedSurveys(), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

