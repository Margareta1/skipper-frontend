interface SurveyStatisticsProps {
    Id: string;
}

const SurveyStatistics: React.FC<SurveyStatisticsProps> =(props) =>{

    return  <>Survey statistics component {props.Id}</>;
}

export default SurveyStatistics;