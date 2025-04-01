import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pricing } from '../../entities/pricing.entity';
import { PricingService } from '../../services/pricing.service';
import { PricingController } from '../../controllers/pricing.controller';
import { User } from '../../entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pricing, User]),
    AuthModule
  ],
  controllers: [PricingController],
  providers: [PricingService],
  exports: [PricingService], 
})
export class PricingModule {}