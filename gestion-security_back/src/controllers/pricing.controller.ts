import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PricingService } from '../services/pricing.service';
import { CreatePricingDto } from '../dto/pricingDTO/create-pricing.dto';
import { UpdatePricingDto } from '../dto/pricingDTO/update-pricing.dto';
import { JwtAuthGuard } from '../modules/auth/jwt-auth.guard'; // À créer
import { Roles } from '../modules/auth/role.decorator';
import { RoleGuard } from '../modules/auth/role.guard';
import { GetUser } from '../modules/auth/get-user.decorator'; // À créer
import { User } from '../entities/user.entity';

@Controller('pricing')
@UseGuards(JwtAuthGuard) // Authentification requise pour toutes les routes
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Post()
  @UseGuards(RoleGuard) // Garde supplémentaire pour vérifier le rôle
  @Roles('cyber') // Seuls les utilisateurs avec rôle 'cyber' peuvent créer
  async create(@Body() createPricingDto: CreatePricingDto, @GetUser() user: User) {
    return this.pricingService.create(createPricingDto, user.id);
  }

  @Get()
  async findAll(@GetUser() user: User) {
    return this.pricingService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.pricingService.findOne(id, user.id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePricingDto: UpdatePricingDto,
    @GetUser() user: User,
  ) {
    return this.pricingService.update(id, updatePricingDto, user.id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.pricingService.remove(id, user.id);
  }
}