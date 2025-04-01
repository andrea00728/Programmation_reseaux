import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePricingDto } from '../dto/pricingDTO/create-pricing.dto';
import { UpdatePricingDto } from '../dto/pricingDTO/update-pricing.dto';
import { Pricing } from '../entities/pricing.entity';
import { User } from '../entities/user.entity';
import { UserRole } from '../entities/user.entity';

@Injectable()
export class PricingService {
  constructor(
    @InjectRepository(Pricing)
    private readonly pricingRepository: Repository<Pricing>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createPricingDto: CreatePricingDto, userId: number): Promise<Pricing> {
    const user = await this.userRepository.findOne({
      where: { id: userId, role: UserRole.CYBER },
    });
    if (!user) {
      throw new UnauthorizedException('Seulement les utilisateurs avec rôle "cyber" peuvent créer un prix');
    }
    const pricing = this.pricingRepository.create({
      ...createPricingDto,
      user_id: userId,
    });
    return this.pricingRepository.save(pricing);
  }

  async findAll(userId: number): Promise<Pricing[]> {
    return this.pricingRepository.find({
      where: { user_id: userId },
    });
  }

  async findOne(id: number, userId: number): Promise<Pricing> {
    const pricing = await this.pricingRepository.findOne({
      where: { id_pricing: id, user_id: userId },
    });
    if (!pricing) {
      throw new NotFoundException('Prix non trouvé');
    }
    return pricing;
  }

  async update(id: number, updatePricingDto: UpdatePricingDto, userId: number): Promise<Pricing> {
    const pricing = await this.findOne(id, userId);
    Object.assign(pricing, updatePricingDto);
    return this.pricingRepository.save(pricing);
  }

  async remove(id: number, userId: number): Promise<void> {
    const pricing = await this.findOne(id, userId);
    await this.pricingRepository.remove(pricing);
  }
}