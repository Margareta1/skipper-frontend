import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetProjectOverview = () =>{
    const agent = useAxios();
    const getProjectOverview = async() =>{
        try{
            const {data} = await agent.get('project/getprojectoverview');
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['projoverview'], ()=>getProjectOverview(), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

