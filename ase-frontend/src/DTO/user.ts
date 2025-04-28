export class User {
    id: number;
    name: string;
    email: string;
    JWT: string;
    isAdmin: boolean;
    isSuspended: boolean;

    constructor(data: { JWT: string;
        name: string; id: number;
        email: string;
        isAdmin: boolean,
        isSuspended: boolean })
    {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.JWT = data.JWT;
        this.isAdmin = data.isAdmin;
        this.isSuspended = data.isSuspended;
    }
}