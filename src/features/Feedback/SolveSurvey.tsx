import { useParams } from "react-router";
import { useGetIsSolvedSurvey } from "../../hooks/useGetIsSolvedSurvey";
import { useGetSurvey } from "../../hooks/useGetSurvey";

const SolveSurvey: React.FC =() =>{
    const {id}=useParams();
    const {data:solved, isLoading:isLoadingSolved} = useGetIsSolvedSurvey(id);
    const{data:survey, isLoading:isLoadingSurvey}=useGetSurvey(id);

    return    solved && survey&&  (  <div className="dashboard-main-div">
        <div className="administration-inner-div" style={{width:"50%"}}>
            
        </div>
    </div>)
}

export default SolveSurvey;