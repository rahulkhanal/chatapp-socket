import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MessageEntity } from './message.entity';
import { GroupEntity } from './group.entity';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string; // Ensure this is hashed

    @OneToMany(() => MessageEntity, message => message.sender)
    sentMessages: MessageEntity[];

    @OneToMany(() => MessageEntity, message => message.receiver)
    receivedMessages: MessageEntity[];

    @OneToMany(() => GroupEntity, group => group.owner)
    ownedGroups: GroupEntity[];

    @OneToMany(() => GroupEntity, group => group.participants)
    joinedGroups: GroupEntity[];
}
