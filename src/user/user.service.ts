import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userRegisterDto } from 'src/auth/dto/userRegister.dto';
import { User } from 'src/shemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModal: Model<User>) {}

    
    async createUser(userRegisterDTO: userRegisterDto) {
        try {
          return await this.UserModal.create({
            fname: userRegisterDTO.fname,
            lname: userRegisterDTO.lname,
            email: userRegisterDTO.email,
            password: userRegisterDTO.password,
          });
        } catch (error) {
          if (error.code === 11000 && error.keyPattern?.email) {
            throw new ConflictException('Email already exists');
          }
          throw error;
        }
      }
}
