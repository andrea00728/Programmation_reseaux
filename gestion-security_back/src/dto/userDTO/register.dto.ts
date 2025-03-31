import {IsEmail,IsEnum,IsNotEmpty,MinLength} from 'class-validator';
import { UserRole } from 'src/entities/user.entity';

export class registerDto{
    @IsNotEmpty()
    username:string;

    @IsEmail()
    email:string;
    
    @MinLength(6)
    password:string;
    @IsEnum(UserRole,{message:"le role doit etre cyber ou entreprise"})
    role:UserRole;
}