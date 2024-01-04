import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AxiosContextProvider } from "./axios/AxiosProvider";
import Login from "./features/Login/Login";
import Dashboard from "./features/Basic/Dashboard";
import "./styles/main.css"
import RequireAuth from "./axios/RequireAuth";
import ErrorPage from "./features/Basic/ErrorPage";
import ProfileOverview from "./features/Employee/ProfileOverview";
import ProjectOverview from "./features/Project/ProjectOverview";
import EmployeeOverview from "./features/Employee/EmployeeOverview";
import SingleProjectView from "./features/Project/SingleProjectView";
import LineOverview from "./features/LineManagement/LineOverview";
import Administration from "./features/Administration/Administration";
import SolveSurvey from "./features/Feedback/SolveSurvey";

function App() {

const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AxiosContextProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route element={<RequireAuth allowedRoles={["Member"]} />}>
            <Route path="/dashboard" index element={<Dashboard />} />
            <Route path="/profile" index element={<ProfileOverview />} />
            <Route path="/projects" index element={<ProjectOverview />} />
            <Route path="/employees" index element={<EmployeeOverview />} />
            <Route path="/project/:id" index element={<SingleProjectView />} />
            <Route path="/solvesurvey/:id" index element={<SolveSurvey />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
            <Route path="/administration" index element={<Administration />} />
          </Route>
          
        <Route element={<RequireAuth allowedRoles={["Manager"]} />}>
            <Route path="/management" index element={<LineOverview />} />
          </Route>

      </Routes>
    </Router>
    </AxiosContextProvider>
    </QueryClientProvider>
  );
}

export default App;
