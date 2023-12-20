interface ProfileOverviewProps {

}

const ProfileOverview: React.FC<ProfileOverviewProps> =() =>{

    return   (<div className="dashboard-main-div">
    <h2 style={{ fontWeight: "900" }}>MY PROFILE</h2>
    <div
      style={{
        alignItems: "center",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    ></div>
      <div className="administration-inner-div"></div></div>);
}

export default ProfileOverview;