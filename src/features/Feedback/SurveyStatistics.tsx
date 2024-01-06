import { useGetSurveyStatistics } from "../../hooks/useGetSurveyStatistics";

interface SurveyStatisticsProps {
    Id: string;
}

const SurveyStatistics: React.FC<SurveyStatisticsProps> =(props) =>{
    const {data:surveyStatistics, isLoading:isLoadingSS} = useGetSurveyStatistics(props.Id);
    return surveyStatistics && (<div>
        {surveyStatistics.questions.map((x:any, index:any)=>{
            return <div key={x.id}>
                <h4>Question nr. {index+1}: {x.label}</h4>
                {surveyStatistics.inputs.map((y:any, ind:any)=>{
                    return <p key={y.id}>{y.answers[index]?.textInputOrArea}</p>
                })}
            </div>
        })}
    </div>);
}

export default SurveyStatistics;