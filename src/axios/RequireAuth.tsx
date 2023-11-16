import { useCookies } from "react-cookie";
import { decodeToken } from "../util/decode-token";
import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { DecodedTokenType } from "../types/DecodedTokenType";
import Navigation from "../features/Basic/Navigation";

interface RequireAuthProps {
    allowedRoles: string[] | null;
}

const RequireAuth: React.FC<RequireAuthProps> = ({allowedRoles}) =>{
  const [accessCookie] = useCookies(["access"]);
  const[token, setToken] = useState<DecodedTokenType>();
  const [hasMatch, setHasMatch] = useState<boolean>();
  const current = new Date(Date.now());
  let isAuthenticated = false;
  try{
      let token = decodeToken(accessCookie?.access);
      let hasMatch = allowedRoles?.some(item => token?.Roles.includes(item));
      if(token && token.Expiration > current && hasMatch){
        isAuthenticated=true;
      }
      console.log(token, hasMatch);
    }
    catch(error){
    }
  return  isAuthenticated ? (<><Navigation /> <Outlet /></>) : (<Navigate to="login" />)
}


export default RequireAuth;