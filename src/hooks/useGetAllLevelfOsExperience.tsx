import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetAllLevelsOfExperience = () =>{
    const agent = useAxios();
    const getAllLevelsOfExperience = async() =>{
        try{
            const {data} = await agent.get('General/getalllevelsofexperience');
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['levels_of_experience'], ()=>getAllLevelsOfExperience(), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

