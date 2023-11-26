import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetAppPreferences = () =>{
    const agent = useAxios();
    const getAppPreferences = async() =>{
        try{
            const {data} = await agent.get('general/getapppreferences');
            return data;
        }
        catch(error){
            throw error;
        }
        return;
    }

    return useQuery(['apppreferences'], ()=>getAppPreferences(), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

