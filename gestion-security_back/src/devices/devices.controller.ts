import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { DevicesService } from './devices.service';

@Controller('devices')
export class DevicesController {
    constructor(private devicesServices:DevicesService){}
    @Get()
    async findAllByDay(){
        return this.devicesServices.showDevices();
    }
    @Get('block/:ip')
    async blockDevices(@Param('ip') ip:string){
        this.devicesServices.blockDevice(ip);
        return {"succee":`appareil ${ip} est bloquer`};
    }
    @Get('deblock/:ip')
    async deblockDevices(@Param('ip') ip:string){
        this.devicesServices.unBlockDevice(ip);
        return {"succee":`appareil ${ip} est débloquer`};
    }
    @Delete('delete/:id')
    async deletDevice(@Param('id') id:number){
        this.devicesServices.deleteDevice(id);
        return {"succee":"appareil supprimer"};
    }
    @Get('hitoryBlock')
    async histoBlock(){
        return await this.devicesServices.historyDevicesBlocked();
    }
    @Get('history')
    async histoDevice(){
        return await this.devicesServices.historyDevices();
    }
    @Put('paiementCyber/:id')
    async payCyb(@Body() body:{prix:number,duree:number,numero:number},@Param('id') id:number){
     return await this.devicesServices.payementCyber(body,id);
    }
    @Get('allDevices')
    async listDevicesNow(){
        return await this.devicesServices.getDevicesInBD();
    }

}
