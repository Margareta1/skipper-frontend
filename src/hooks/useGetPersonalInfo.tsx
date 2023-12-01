import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetPersonalInfo = () =>{
    const agent = useAxios();
    const getPersonalInfo = async() =>{
        try{
            const {data} = await agent.get('employee/getpersonalinfo');
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['personalinfo'], ()=>getPersonalInfo(), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

