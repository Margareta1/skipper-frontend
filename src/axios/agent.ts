
import axios, { AxiosInstance } from "axios";
import { useCookies } from "react-cookie";


export const useAxios = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true, // Ensure that cookies are sent with requests
});

// Use react-cookie to get and set cookies
const [accessCookie, setAccessCookie] = useCookies(["access"]);
const [refreshCookie, setRefreshCookie] = useCookies(["refresh"]);

// Add an interceptor to set the 'Authorization' header with the access token from cookies
instance.interceptors.request.use((config) => {
    // const accessToken = getAccessTokenFromCookies();
    if (accessCookie) {
        
    }
    
    config.headers.Authorization = `Bearer ${accessCookie}`;
    return config;
  });

  
  return instance;
};

  
  // const useAgent = () => {
  //   const agent = axios.create();
  //   agent.defaults.baseURL = process.env.REACT_APP_API_URL;
  //   agent.defaults.withCredentials = true;
  
  //   const refreshToken = async () => {
  //     const response = await agent.post(
  //       "http://localhost:7016/api/account/refresh/",
  //       { accessToken: cookies.access, refreshToken: cookies.refresh }
  //     );
  //     console.log(response);
  //   };
  
  
  //   agent.interceptors.request.use((config) => {
  //     if (!cookies.access) {
  //       refreshToken();
  //     }
  
  //     config.headers.Authorization = `Bearer ${cookies.access}`;
  //     return config;
  //   });
  
  //   return agent;
  // };
  
  // export default useAgent();
  