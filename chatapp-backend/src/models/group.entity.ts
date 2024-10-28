import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { MessageEntity } from './message.entity';

@Entity()
export class GroupEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => UserEntity, user => user.ownedGroups)
    owner: UserEntity;

    @ManyToMany(() => UserEntity, user => user.joinedGroups)
    @JoinTable()
    participants: UserEntity[];

    @OneToMany(() => MessageEntity, message => message.group)
    messages: MessageEntity[];
}
