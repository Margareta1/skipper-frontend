import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AxiosContextProvider } from "./axios/AxiosProvider";
import RequireAuth from "./axios/RequireAuth";
import Login from "./features/Login/Login";
import Dashboard from "./features/Basic/Dashboard";
import "./styles/main.css"

function App() {

const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AxiosContextProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<RequireAuth allowedRoles={["Member"]} />}>
            <Route path="/dashboard" index element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />

        </Route>
      </Routes>
    </Router>
    </AxiosContextProvider>
    </QueryClientProvider>
  );
}

export default App;
