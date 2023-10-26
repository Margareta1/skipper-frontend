import { useAxios } from "../../axios/useAxios";

const Dashboard = () => {
  const agent = useAxios();
  const data = agent.get("/account/something").then((r: any) => {
    console.log(r.data);
  });


  return <>Hello this is dashboard</>;
};

export default Dashboard;
