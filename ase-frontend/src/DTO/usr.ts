export class Usr {
    id: number;
    name: string;
    email: string;
    JWT: string;
    isadmin: boolean;
    issuspended: boolean;

    constructor(data: { JWT: string;
        name: string; id: number;
        email: string;
        isadmin: boolean,
        issuspended: boolean })
    {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.JWT = data.JWT;
        this.isadmin = data.isadmin;
        this.issuspended = data.issuspended;
    }
}