import { DecodedTokenType } from "../types/DecodedTokenType";

export const decodeToken = (token: string) :DecodedTokenType => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const payload = JSON.parse(atob(base64));
    const roles =
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const expirationDate = new Date(payload.exp * 1000);
    return { Roles: roles, Expiration: expirationDate };
 };