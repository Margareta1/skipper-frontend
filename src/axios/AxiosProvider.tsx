import axios, { Axios, AxiosInstance } from "axios";
import { createContext, createElement } from "react";
import { useCookies } from "react-cookie";

interface AxiosContextProviderProps {
    children: React.ReactNode;
}
export const AxiosContext = createContext<AxiosInstance>(axios);

export const AxiosContextProvider: React.FC<AxiosContextProviderProps> = ({children}) =>{
    const [accessCookie, setAccessCookie] = useCookies(["access"]);
    const [refreshCookie, setRefreshCookie] = useCookies(["refresh"]);
    
  const agent = axios.create({
    baseURL: "https://localhost:7016/api/",
  });
  let isRefreshing = false;
  let failedQueue: any[] = [];

  const processQueue = (error: any, token = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedQueue = [];
  };

  const refresh = async () => {
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const response = await agent.post('Account/refresh', {
          "accessToken": accessCookie?.access,
          "refreshToken": refreshCookie?.refresh
        }, { headers: { skipInterceptor: true } });

        const exp = new Date();
        exp.setDate(exp.getDate() + 1);
        setAccessCookie("access", response.data.accessToken, { expires: exp });
        setRefreshCookie("refresh", response.data.refreshToken, { expires: exp });
        processQueue(null, response.data.accessToken);
        return response.data.accessToken;
      } catch (error) {
        processQueue(error, null);
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    } else {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      });
    }
  };

  agent.interceptors.response.use(
    (response:any) => response,
    async (error: any) => {
      const originalRequest = error.config;

      if (originalRequest.url.includes('Account/refresh') || originalRequest.headers.skipInterceptor) {
        return Promise.reject(error);
      }

      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newToken = await refresh();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          originalRequest.headers.Retry = 'retry';
          return agent(originalRequest);
        } catch (refreshError) {
          console.error('Error while refreshing token:', refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  agent.interceptors.request.use((config: any) => {
    if (!config.headers.skipInterceptor && !config.headers.Retry) {
      config.headers.Authorization = `Bearer ${accessCookie?.access}`;
    }
    else if(config.headers.Retry){
      config.headers.Retry = null;
    }
    return config;
  });

  return createElement(AxiosContext.Provider, {value: agent}, children);
}