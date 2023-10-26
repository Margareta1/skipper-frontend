import { useCookies } from "react-cookie";
import { decodeToken } from "../util/decode-token";
import { Navigate, Outlet } from "react-router";
import { useState } from "react";
import { DecodedTokenType } from "../types/DecodedTokenType";

interface RequireAuthProps {
    allowedRoles: string[] | null;
}

const RequireAuth: React.FC<RequireAuthProps> = ({allowedRoles}) =>{
  const [accessCookie] = useCookies(["access"]);
  const[token, setToken] = useState<DecodedTokenType>();
  const [hasMatch, setHasMatch] = useState<boolean>();
  const current = new Date(Date.now());
  try{
      setToken(decodeToken(accessCookie?.access));
      setHasMatch(allowedRoles?.some(item => token?.Roles.includes(item)));
    }
    catch(error){
    }
  return token && token.Expiration > current && hasMatch ? (<Outlet />) : (<Navigate to="login" />)
}

export default RequireAuth;