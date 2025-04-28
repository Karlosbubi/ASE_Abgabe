export class User {
    id: number;
    name: string;
    email: string;
    JWT: string;
    isAdmin: boolean;

    constructor(data: { JWT: string; name: string; id: number; email: string; isAdmin: boolean }) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.JWT = data.JWT;
        this.isAdmin = data.isAdmin;

    }
}