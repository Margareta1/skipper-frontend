import { Skeleton } from "antd";
import { useGetHiringPostApplicants } from "../../hooks/useGetHiringPostApplicants";

interface HiringPostApplicantsProps{
    HiringPostId: string;
}

const HiringPostApplicants:React.FC<HiringPostApplicantsProps> = (props) =>{
    const {data, isLoading} = useGetHiringPostApplicants(props.HiringPostId);
    return (isLoading ? <Skeleton /> : <>
        {data.map((a:any)=>{
            return <p>{a.applicant.email}</p>
        })}
    </>)
}

export default HiringPostApplicants;