import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetAllLanguages = () =>{
    const agent = useAxios();
    const getAllELanguages = async() =>{
        try{
            const {data} = await agent.get('General/getalllanguages');
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['languages'], ()=>getAllELanguages(), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

