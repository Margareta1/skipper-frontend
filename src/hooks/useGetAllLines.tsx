import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetAllLines = () =>{
    const agent = useAxios();
    const getAllLines = async() =>{
        try{
            const {data} = await agent.get('employee/getalllines');
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['lines'], ()=>getAllLines(), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

