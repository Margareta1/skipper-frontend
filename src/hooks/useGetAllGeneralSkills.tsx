import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetAllGeneralSkills = () =>{
    const agent = useAxios();
    const getAllGeneralSkills = async() =>{
        try{
            const {data} = await agent.get('General/getallgeneralskills');
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['generalskills'], ()=>getAllGeneralSkills(), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

