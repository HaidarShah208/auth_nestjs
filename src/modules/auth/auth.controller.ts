import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userRegisterDto } from './dto/userRegister.dto';
import { UserLoginDto } from './dto/userLogin.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() userRegisterDTO: userRegisterDto) {
        return this.authService.registerUser(userRegisterDTO);
    }

    @Post('login')
    login(@Body() loginDto: UserLoginDto) {
        return this.authService.login(loginDto);
    }
}
