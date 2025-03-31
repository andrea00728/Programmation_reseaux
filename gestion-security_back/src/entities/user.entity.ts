import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

export enum UserRole{
    CYBER='cyber',
    ENTREPRISE='entreprise'
}
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

@Column({
type:'enum',
enum:UserRole,
default:UserRole.ENTREPRISE,
})
role:UserRole;
}
