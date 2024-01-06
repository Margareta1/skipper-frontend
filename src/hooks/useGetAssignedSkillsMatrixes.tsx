import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetAssignedSkillsMatrixes = () =>{
    const agent = useAxios();
    const getAssignedSkillsMatrixes = async() =>{
        try{
            const {data} = await agent.get('SkillsMatrix/getassignedskillsmatrixes');
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['assignedskillsmatrixes'], ()=>getAssignedSkillsMatrixes(), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

