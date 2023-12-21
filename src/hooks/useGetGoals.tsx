import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetGoals = () =>{
    const agent = useAxios();
    const getGoals = async() =>{
        try{
            const {data} = await agent.get(`Goal/getgoals`);
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['goals'], ()=>getGoals(), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

