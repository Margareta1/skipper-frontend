import { Skeleton } from "antd";
import { useGetHiringPostApplicants } from "../../hooks/useGetHiringPostApplicants";
import { useState, useEffect } from "react";

interface HiringPostApplicantsProps {
  HiringPostId: string;
}

const HiringPostApplicants: React.FC<HiringPostApplicantsProps> = (props) => {
  const { data, isLoading } = useGetHiringPostApplicants(props.HiringPostId);
  const [apps, setApps] = useState<any>();

  useEffect(() => {
    if (data) {
      setApps(data);
    }
  }, [data]);
  return isLoading ? (
    <Skeleton />
  ) : (
    <>
      {apps?.map((a: any) => {
        return <p>{a?.applicant?.email}</p>;
      })}
    </>
  );
};

export default HiringPostApplicants;
