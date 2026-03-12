import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { userRegisterDto } from './dto/userRegister.dto';

@Injectable( )
export class AuthService {
    constructor (private readonly userService:UserService){}
    registerUser(userRegisterDTO:userRegisterDto){
        console.log('check dto',userRegisterDTO)
        return this.userService.createUser()
     }
}
