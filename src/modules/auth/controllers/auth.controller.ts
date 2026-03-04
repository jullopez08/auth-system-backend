import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';

@Controller('auth')
@Post('register')
register(@Body() RegisterDto: RegisterDto) {
    return this.authService.register(RegisterDto);
}
export class AuthController {}
