import { useQuery } from "react-query";
import { useAxios } from "../axios/useAxios";

export const useGetEmployeeOverview = () =>{
    const agent = useAxios();
    const getEmployeeOverview = async() =>{
        try{
            const {data} = await agent.get('employee/getemployeeoverview');
            return data;
        }
        catch(error){
            throw error;
        }
    }

    return useQuery(['employeeoverview'], ()=>getEmployeeOverview(), {
        onError: (error)=> console.log(error),
        staleTime:Infinity,
        enabled:true,
    })
}

