import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userRegisterDto } from './dto/userRegister.dto';

@Controller('auth')
export class AuthController{
    constructor(private readonly authService:AuthService){}
 @Post('register')
    register(@Body() userRegisterDTO:userRegisterDto){ 
        const result=this.authService.registerUser(userRegisterDTO)
        return result
    }
}
