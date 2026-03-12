import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { userRegisterDto } from './dto/userRegister.dto';
import bcrypt from 'bcrypt'
@Injectable( )
export class AuthService {
    constructor (private readonly userService:UserService){}
    async registerUser(userRegisterDTO:userRegisterDto){
        console.log('check dto',userRegisterDTO)
        const saltRound=10
        const hash= await bcrypt.hash(userRegisterDTO.password,saltRound)
        const user= await this.userService.createUser({...userRegisterDTO, password:hash})
        console.log('user',user)
        return {}
     }
}
