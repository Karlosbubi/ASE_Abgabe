import { User } from "../DTO/user";

enum localStorageKeys {
    CurrentUser = "CURRENT_USER"
}

export function GetCurrentUser() : User | null {
    const tmp = localStorage.getItem(localStorageKeys.CurrentUser);
    if(tmp === null || tmp === "null"){
        return null;
    }

    return JSON.parse(tmp);
}

export function SetCurrentUser(user : User | null) : void {
    if(user === null){
        localStorage.removeItem(localStorageKeys.CurrentUser);
        return;
    }

    localStorage.setItem(localStorageKeys.CurrentUser, JSON.stringify(user));
    return;
}