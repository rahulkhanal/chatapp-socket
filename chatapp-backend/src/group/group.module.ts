import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Group } from 'src/models/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule { }
