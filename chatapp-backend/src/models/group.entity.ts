import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';  // Assuming you have a User entity already

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => User)
    @JoinTable()
    users: User[];
}
