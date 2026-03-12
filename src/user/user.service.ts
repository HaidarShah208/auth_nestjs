import { Injectable } from '@nestjs/common';
import { userRegisterDto } from 'src/auth/dto/userRegister.dto';

@Injectable()
export class UserService {
    createUser(userRegisterDTO:userRegisterDto){
        return {message: 'user created now'}
    }
}
