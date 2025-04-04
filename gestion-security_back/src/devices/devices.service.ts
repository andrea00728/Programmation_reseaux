import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Devices } from './devices.entity';
import { Repository } from 'typeorm';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

@Injectable()
export class DevicesService {
    constructor(
        @InjectRepository(Devices)
        private devicesRepo: Repository<Devices>,
    ) {}

    async showDevices(): Promise<Devices[]> {
      await this.scanNetwork();
       return await this.devicesRepo.find();
    }

    async scanNetwork() {
      const networkIP = await this.getNetworkIP();
      
      
      console.log(networkIP);
        try {
       
            console.log(`Scanning network: ${networkIP}/24`);

            const command = `"C:\\Program Files (x86)\\Nmap\\nmap.exe" -sn ${networkIP}/24`;
            const { stdout } = await execPromise(command);
            
            const discoveredDevices = this.parseNmapOutput(stdout);

            for (const item of discoveredDevices) {
                const existingDevice = await this.devicesRepo.findOne({ where: { mac: item.mac } });

                if (!existingDevice) {
                    const newDevice = this.devicesRepo.create({
                        ip: item.ip,
                        mac: item.mac,
                        statut: "connecter"
                    });
                  
                    await this.devicesRepo.save(newDevice);
                }
                else{
                    existingDevice.dateDevices=new Date();
                    existingDevice.ip= await this.getIpFromMac(existingDevice.mac,networkIP);
                   await this.devicesRepo.update(existingDevice.id,existingDevice);
                }
            }

            return discoveredDevices;
        } catch (error) {
            throw new Error('Erreur lors du scan du réseau: ' + error.message);
        }
    }

    private parseNmapOutput(output: string) {
        const lines = output.split('\n');
        const devices = [];
        let currentDevice: any = {};

        lines.forEach(line => {
            if (line.includes('Nmap scan report for')) {
                if (currentDevice.ip) devices.push(currentDevice);
                currentDevice = { ip: line.split(/\s+/)[4] };
            }
            if (line.includes('MAC Address')) {
                currentDevice.mac = line.split(/\s+/)[2];
            }
        });

        if (currentDevice.ip) devices.push(currentDevice);
        return devices;
    }

    async blockDevice(mac: string) {
        const networkIP = await this.getNetworkIP();
        const ip= await this.getIpFromMac(mac,networkIP);
        try {
            await execPromise(`netsh advfirewall firewall add rule name="Block MAC ${ip} - In" dir=in action=block remoteip=${ip} profile=any`);
            await execPromise(`netsh advfirewall firewall add rule name="Block MAC ${ip} - Out" dir=out action=block remoteip=${ip} profile=any`);
            const device = await this.devicesRepo.findOne({ where: { ip } });

            if (device) {
                device.statut = "bloquer";
                device.ip=ip;
                await this.devicesRepo.save(device);
            } else {
                console.log("Appareil non trouvé dans la base de données.");
            }

            console.log(`Appareil ${ip} bloqué !`);
        } catch (err) {
            console.error('Erreur lors du blocage :', err);
        }
    }
   
    async unBlockDevice(mac: string) {
        try {
            const networkIP = await this.getNetworkIP();
            const ip= await this.getIpFromMac(mac,networkIP);
            await execPromise(`netsh advfirewall firewall delete rule name="Block ${ip}"`);
            const device = await this.devicesRepo.findOne({ where: { ip } });

            if (device) {
                device.statut = "connecter";
                await this.devicesRepo.save(device);
            } else {
                console.log("Appareil non trouvé dans la base de données.");
            }

            console.log(`Appareil ${ip} débloqué !`);
        } catch (err) {
            console.error('Erreur lors du déblocage :', err);
        }
    }

    async getNetworkIP(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            exec('chcp 65001 & ipconfig', (error, stdout) => {
                if (error) {
                    reject(`Erreur lors de l'exécution de ipconfig: ${error.message}`);
                    return;
                }
                
                const lines = stdout.split('\n');
                let gateWayIp = '';
                let interfaceFound = false;
                lines.forEach(line => {
                      
                    
                    if (line.includes('Carte r�seau sans fil Connexion au r�seau local')) {
                       console.log("ezaezakj");
                        interfaceFound = true;
                    }
                    
                    if (interfaceFound&&line.includes('Adresse IPv4')) {
                        console.log(interfaceFound)
                        const match = line.match(/(\d+\.\d+\.\d+\.\d+)/);
                        if (match) {
                            gateWayIp = match[0];
                        }
                    }
                });

                if (gateWayIp) {
                    const ipParts = gateWayIp.split('.');
                    ipParts[3] = '0';
                    resolve(ipParts.join('.'));
                } else {
                    reject("Impossible de trouver l'adresse IP du réseau.");
                }
            });
        });
    }

    async deleteDevice(id: number) {
        await this.devicesRepo.delete(id);
    }
    async historyDevicesBlocked():Promise<Devices[]>{
   return await this.devicesRepo.find({where:{statut:"bloquer"}})
    }
    async historyDevices():Promise<Devices[]>{
        return await this.devicesRepo.find();
    }
    async payementCyber(body:{prix:number,duree:number,numero:number}, id:number){
        const devices=await this.devicesRepo.findOne({where:{id:id}});
        devices.price=body.prix.toString();
        devices.hours=body.duree;
        devices.numero=body.numero;

  return await this.devicesRepo.update(id,devices);
    }
    async getDevicesInBD():Promise<Devices[]>{
        return await this.devicesRepo.find({ where: { dateDevices: new Date() }});
    }

    async getIpFromMac(macAddress: string, subnet :string): Promise<string | null> {
        try {
          const { stdout } = await execPromise(`nmap -sn ${subnet}/24`);
          
          const devices = stdout.split('\n\n');
          for (const device of devices) {
            const macMatch = device.match(/MAC Address: ([A-F0-9:-]+)/i);
            const ipMatch = device.match(/Nmap scan report for ([\d.]+)/);
    
            if (macMatch && ipMatch) {
              const foundMac = macMatch[1].toLowerCase().replace(/-/g, ':');
              if (foundMac === macAddress.toLowerCase()) {
                return ipMatch[1]; // IP address
              }
            }
          }
    
          
        } catch (error) {
          console.error('Erreur pendant le scan Nmap :', error);
          return null;
        }
      }
    
}
