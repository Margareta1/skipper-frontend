import { Button } from "antd";
import { useGetAllProjects } from "../../hooks/useGetAllProjects";


const dummyProject = {
    name: 'TimeTracker',
    description: 'We track our employees time and utilization.',
    tags: ['Web Development', 'Time Tracking'],
    hiringPosts: [
        {
            id:'1',
            position:'Senior React Developer',
            utilization: 'percentage',
            amount: '75',
            levelOfExperience:'Senior',
            skills:['React', 'Manual testing', 'Typescript'],
            expiresAt:'2023-12-31T00:00:00',
            title:'New React dev needed!',
            requiredLanguages:['English']
        }
    ]
}

const SingleProjectView: React.FC = () =>{
        const {data, isLoading} = useGetAllProjects();
    if(data){
        console.log(data);
    }
    return <div className="single-project-div">
        <div style={{alignItems:"center", width:"100%", display:"flex", flexDirection:"column"}}>
        <h2>{dummyProject.name}</h2>
        <h4>{dummyProject.description}</h4>
        <div style={{display:"flex", flexDirection:"row"}}>
            <p>Tags: </p>
            {dummyProject.tags.map(c=>{
                return <p style={{borderRadius:"4px", backgroundColor:"#f696b9", color:"white", padding:"5px", margin:"5px"}}>{c}</p>
            })}
        </div>
        </div>
        <h2 style={{marginLeft:"2rem"}}>Hiring:</h2>
        {dummyProject.hiringPosts.map((x)=>{
            return <div style={{border:"2px solid black",backgroundColor:"#C0D1FA", borderRadius:"4px", padding:"1rem", width:"70%", alignSelf:"center", margin:"1rem"}}>
<h5>Title: {x.position}</h5>
<p>Position: {x.position}</p>
<p>Utilization: {x.amount} {x.utilization==='percentage' ? '%': 'hr/week'}</p>
<p>Level of experience: {x.levelOfExperience}</p>
<p>Required languages: {x.requiredLanguages.map(p=>{return <span>    {p}    </span>})}</p>
<p>Required skills: {x.skills.map(p=>{return <span>    {p}    </span>})}</p>
<p><Button>Apply</Button> by: {x.expiresAt}</p>
            </div>
        })}
    </div>
}

export default SingleProjectView;