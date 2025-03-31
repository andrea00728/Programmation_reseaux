import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Pricing{
    @PrimaryGeneratedColumn()
    id_pricing : number;

    @Column({type: 'decimal', precision: 5, scale: 2, nullable: false})
    price_per_min: number;

    @Column({nullable: false})
    user_id: number;

    @Column({type: 'timestamp', default : ()=>'NOW()'})
    created_at: Date;

    // @ManyToOne(()=> User, (user) => user.pricings, {
    //     onDelete: 'CASCADE',
    // })

    @JoinColumn({name:'user_id'})
    user: User;
}