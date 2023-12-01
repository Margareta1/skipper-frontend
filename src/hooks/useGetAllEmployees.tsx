import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetAllEmployees = () =>{
    const agent = useAxios();
    const getAllEmployees = async() =>{
        try{
            const {data} = await agent.get('employee/getallemployees');
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['employees'], ()=>getAllEmployees(), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

