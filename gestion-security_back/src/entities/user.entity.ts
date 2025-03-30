import {Column, Entity, IsNull, PrimaryGeneratedColumn} from 'typeorm';
@Entity('users')
export class User{
    
@PrimaryGeneratedColumn()
id:number;
@Column({unique:true})
username:string;

@Column({unique:true,nullable:false})
email:string;

@Column({nullable:false})
password:string;
}