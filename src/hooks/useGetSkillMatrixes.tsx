import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetSkillsMatrixes = () =>{
    const agent = useAxios();
    const getSkillsMatrixes = async() =>{
        try{
            const {data} = await agent.get('SkillsMatrix/getallskillsmatrixes');
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['skillsmatrixes'], ()=>getSkillsMatrixes(), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

