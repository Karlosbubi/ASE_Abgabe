export class User {
    id: number;
    name: string;
    JWT: string;

    constructor(data: {id: number, name: string, JWT: string}){
        this.id = data.id;
        this.name = data.name;
        this.JWT = data.JWT;
    }
}