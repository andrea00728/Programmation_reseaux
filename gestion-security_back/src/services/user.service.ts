import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { registerDto } from '../dto/userDTO/register.dto';
import { LoginDto } from '../dto/userDTO/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
     * @property creation de 'utilisateur ,verification  d'un utilisateur deja exister avant de la creation
     */
  async register(registerDto: registerDto): Promise<{ message: string }> {
    const { username, email, password } = registerDto;
    const existingUser = await this.userRepository.findOne({ where: [{ email }, { username }] });
    if (existingUser) {
      throw new BadRequestException('Email ou username déjà utilisé');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({ username, email, password: hashedPassword });
    await this.userRepository.save(user);

    return { message: 'Utilisateur enregistré avec succès' };
  }

  /**
   * 
   * @param loginDto 
   * @returns 
   * @property connexion de avec le compte existant de l'utilisateur enregistrer
   */
  
  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return { access_token: token };
  }
}
