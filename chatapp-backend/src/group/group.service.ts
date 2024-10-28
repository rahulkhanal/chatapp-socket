import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupEntity as Group } from 'src/models/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  create(createGroupDto: CreateGroupDto) {
    console.log(createGroupDto);
    const group = this.groupRepository.create(createGroupDto);
    return this.groupRepository.save(group);
  }

  findAll() {
    return this.groupRepository.find({ relations: ['users'] });
  }
}
