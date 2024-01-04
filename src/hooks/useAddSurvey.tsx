import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";
import { CreateSurveyType } from "../types/CreateSurveyType";

export const useAddSurvey = () =>{
    const agent = useAxios();
    const addSurvey = async (input:CreateSurveyType) =>{
        try {
            const { data } = await agent.post('Survey/addsurvey', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(addSurvey, {
        onError: (error) => console.log(error)
    });
}