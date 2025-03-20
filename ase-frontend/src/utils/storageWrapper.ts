import { User } from "../DTO/user";
import { jwtDecode, JwtPayload } from 'jwt-decode';

enum localStorageKeys {
    CurrentUser = "CURRENT_USER",
}

export function GetCurrentUser() : User | null {
    const tmp = localStorage.getItem(localStorageKeys.CurrentUser);
    if(tmp === null || tmp === "null"){
        return null;
    }

    return JSON.parse(tmp);
}

interface CustomJwtPayload extends JwtPayload {
    id: number;
    name: string;
    email: string;
    // TODO Roles
}

export function SetCurrentUserJwt(jwt: string) : void {
    const payload = jwtDecode(jwt) as CustomJwtPayload;

    const user = new User({
        id: payload.id,
        name: payload.name,
        email: payload.email,
        JWT: jwt
    });

    SetCurrentUser(user);
}

export function SetCurrentUser(user : User | null) : void {
    if(user === null){
        localStorage.removeItem(localStorageKeys.CurrentUser);
        return;
    }

    localStorage.setItem(localStorageKeys.CurrentUser, JSON.stringify(user));
    return;
}

export function ClearCurrentUser() : void {
    localStorage.removeItem(localStorageKeys.CurrentUser);
}