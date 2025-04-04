import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm"
@Entity()
export class Devices{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    ip:string;
    @Column({nullable:true})
    mac:string;
    @Column({nullable:true})
    hours:number;
    @Column({nullable:true})
    price:string;
    @Column({nullable:true})
    numero:number;
    @Column()
    statut:string;
    @CreateDateColumn()
    createdAt:Date;
    @Column({type:'date',default:()=>'CURRENT_TIMESTAMP'})
    dateDevices:Date;
}
