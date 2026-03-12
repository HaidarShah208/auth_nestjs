import { IsNotEmpty, IsString } from "class-validator";

export class userRegisterDto{
    @IsString()
    fname:string;

    @IsString()
    lname:string;

    @IsString()
    password:string;

    @IsString()
    @IsNotEmpty()
    email:string;
}