import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ){}

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email, 
                passwordHash: password
            }
        });

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            // TODO Roles
        }

        return {
            JWT: await this.jwtService.signAsync(payload)
        }
    }
}
