import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { registerDto } from '../dto/userDTO/register.dto';
import { LoginDto } from '../dto/userDTO/login.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() registerDto: registerDto) {
    return this.userService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
}
