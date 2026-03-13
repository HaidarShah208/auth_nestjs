import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userRegisterDto } from './dto/userRegister.dto';
import { UserLoginDto } from './dto/userLogin.dto';
import { AuthGuard } from './guards/jwt.auth.guard';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
    private readonly userService:UserService
    ) {}

    @Post('register')
    register(@Body() userRegisterDTO: userRegisterDto) {
        return this.authService.registerUser(userRegisterDTO);
    }

    @Post('login')
    login(@Body() loginDto: UserLoginDto) {
        return this.authService.login(loginDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req){
     const userId=req.user.sub;
     const user = await this.userService.getUserById(userId)
     return user

    }
}
