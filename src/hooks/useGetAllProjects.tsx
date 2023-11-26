import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetAllProjects = () =>{
    const agent = useAxios();
    const getAllProjects = async() =>{
        try{
            const {data} = await agent.get('project/getprojects');
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['projects'], ()=>getAllProjects(), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

