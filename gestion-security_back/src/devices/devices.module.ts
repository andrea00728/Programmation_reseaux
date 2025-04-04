import { Module } from '@nestjs/common';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Devices } from './devices.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Devices])],
  controllers: [DevicesController],
  providers: [DevicesService]
})
export class DevicesModule {}
