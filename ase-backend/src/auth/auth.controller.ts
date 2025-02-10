import { Controller, Post } from '@nestjs/common';
import { get } from 'http';

@Controller('auth')
export class AuthController {
    @Post()
    login() {

    }
}
