import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetSkillsMatrixInput =(matrixId: string| undefined) =>{
    const agent = useAxios();
    const getSkillsMatrixInput = async(matrixId:string) =>{
        try{
            const {data} = await agent.get(`SkillsMatrix/getskillsmatrixinput/${matrixId}`);
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['singleskillsmatrixinput', matrixId], ()=>getSkillsMatrixInput( matrixId!), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}