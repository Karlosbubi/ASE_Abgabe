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
    isAdmin: boolean;
}

export function SetCurrentUserJwt(jwt: string) : void {
    const payload = jwtDecode(jwt) as CustomJwtPayload;
    const user = new User({
        id: payload.id,
        name: payload.name,
        email: payload.email,
        JWT: jwt,
        isAdmin: payload.isAdmin
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

export async function ReloadCurrentUser() : Promise<void> {
    const user = GetCurrentUser();

    if (!user) {
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/user", {
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + user.JWT },
        });

        if (response.ok) {
            const data = await response.json();

            user.id = data.id;
            user.name = data.name;
            user.email = data.email;

            SetCurrentUser(user);
        } else {
            console.error("Error reloading user:", response.status);
        }
    } catch (error) {
        console.error("Error while sending HTTP request:", error);
    }
}