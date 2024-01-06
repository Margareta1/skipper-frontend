import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";
import { SolveSkillsMatrixType } from "../types/SolveSkillsMatrixType";

export const useSolveSkillsMatrix = () =>{
    const agent = useAxios();
    const solveSkillsMatrix = async (input:SolveSkillsMatrixType) =>{
        try {
            const { data } = await agent.post('SkillsMatrix/solveskillsmatrix', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(solveSkillsMatrix, {
        onError: (error) => console.log(error)
    });
}