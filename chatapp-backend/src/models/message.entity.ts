import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { GroupEntity } from './group.entity';

@Entity()
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    timestamp: Date;

    @ManyToOne(() => UserEntity, user => user.sentMessages)
    sender: UserEntity;

    @ManyToOne(() => UserEntity, user => user.receivedMessages)
    receiver: UserEntity;

    @ManyToOne(() => GroupEntity, group => group.messages, { nullable: true })
    group?: GroupEntity;
}
