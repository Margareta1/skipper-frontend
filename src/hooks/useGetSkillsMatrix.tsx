import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetSkillsMatrix = (id:string | undefined) =>{
    const agent = useAxios();
    const getSkillsMatrix = async(id:string) =>{
        try{
            const {data} = await agent.get(`SkillsMatrix/getskillsmatrix/${id}`);
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['singleskillsm', id], ()=>getSkillsMatrix(id!), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}