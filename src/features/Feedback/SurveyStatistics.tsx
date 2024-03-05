import { useEffect, useState } from "react";
import { useGetSurveyStatistics } from "../../hooks/useGetSurveyStatistics";

interface SurveyStatisticsProps {
    Id: string;
}

const SurveyStatistics: React.FC<SurveyStatisticsProps> =(props) =>{
    const {data:surveyStatistics, isLoading:isLoadingSS} = useGetSurveyStatistics(props.Id);
    const [sur, setSur] = useState<any>();
    useEffect(()=>{
        if(surveyStatistics){
            setSur(surveyStatistics)
        }
    }, [surveyStatistics])
    return surveyStatistics && (<div>
        {sur?.questions.map((x:any, index:any)=>{
            return <div key={x.id}>
                <h4>Question nr. {index+1}: {x.label}</h4>
                {sur?.inputs.map((y:any, ind:any)=>{
                    return <p key={y.id}>{y.answers[index]?.textInputOrArea}</p>
                })}
            </div>
        })}
    </div>);
}

export default SurveyStatistics;