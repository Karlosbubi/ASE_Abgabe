export class User {
    name: string;
    JWT: string;

    constructor(data: {name: string, JWT: string}){
        this.name = data.name;
        this.JWT = data.JWT;
    }
}