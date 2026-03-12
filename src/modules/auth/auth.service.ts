import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { userRegisterDto } from './dto/userRegister.dto';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
@Injectable( )
export class AuthService {
    constructor (private readonly userService:UserService,
        private readonly jwtService: JwtService
    ){}
    async registerUser(userRegisterDTO:userRegisterDto){
        console.log('check dto',userRegisterDTO)
        const saltRound=10
        const hash= await bcrypt.hash(userRegisterDTO.password,saltRound)
        const user= await this.userService.createUser({...userRegisterDTO, password:hash})
        const payload = { sub: user._id}
        const token=await this.jwtService.signAsync(payload)

        console.log('user',user)
        return {'user created now':user,token}
     }
}
