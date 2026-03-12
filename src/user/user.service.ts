import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userRegisterDto } from 'src/auth/dto/userRegister.dto';
import { User } from 'src/shemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModal: Model<User>) {}

    
    async createUser(userRegisterDTO:userRegisterDto){
        await this.UserModal.create({
        fname:userRegisterDTO.fname,
        lname:userRegisterDTO.lname,
        email:userRegisterDTO.email,
        password:userRegisterDTO.password,
        })
    }
}
