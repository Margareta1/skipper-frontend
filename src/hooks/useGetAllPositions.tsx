import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetAllPositions = () =>{
    const agent = useAxios();
    const getAllPositions = async() =>{
        try{
            const {data} = await agent.get('General/getallpositions');
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['all_positions'], ()=>getAllPositions(), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

