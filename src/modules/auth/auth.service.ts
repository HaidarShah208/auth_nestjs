import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { userRegisterDto } from './dto/userRegister.dto';
import { UserLoginDto } from './dto/userLogin.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async registerUser(userRegisterDTO: userRegisterDto) {
        const saltRound = 10;
        const hash = await bcrypt.hash(userRegisterDTO.password, saltRound);
        const user = await this.userService.createUser({
            ...userRegisterDTO,
            password: hash,
        });
        const payload = { sub: user._id };
        const token = await this.jwtService.signAsync(payload);
        return { message: 'user created', user, token };
    }

    async login(loginDto: UserLoginDto) {
        const user = await this.userService.findByEmail(loginDto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const payload = { sub: user._id };
        const token = await this.jwtService.signAsync(payload);
        const { password: _, ...userWithoutPassword } = user.toObject();
        return { message: 'Login successful', user: userWithoutPassword, token };
    }
}
