import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetAllLanguageLevels = () =>{
    const agent = useAxios();
    const getAllELanguageLevels = async() =>{
        try{
            const {data} = await agent.get('General/getalllanguagelevels');
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['languagelevels'], ()=>getAllELanguageLevels(), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

