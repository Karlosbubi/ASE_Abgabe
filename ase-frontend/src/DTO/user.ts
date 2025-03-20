export class User {
    id: number;
    name: string;
    email: string;
    JWT: string;

    constructor(data: { JWT: string; name: string; id: number; email: string }){
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.JWT = data.JWT;
    }
}