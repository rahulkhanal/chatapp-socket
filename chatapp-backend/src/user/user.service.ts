import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity as User } from 'src/models/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
      const existingUser = await this.userRepository.findOne({
        where: { email: registerUserDto.email, username: registerUserDto.username },
      });

      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }
      console.log(registerUserDto);
      const newUser = this.userRepository.create({
        ...registerUserDto,
        password: hashedPassword,
      });

      return this.userRepository.save(newUser);
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: loginUserDto.email },
      });

      if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
        const payload = { email: user.email, sub: user.id };
        return {
          id: user.id,
          access_token: this.jwtService.sign(payload),
        };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw new BadRequestException('Invalid credentials');
    }
  }

  findAll() {
    try {
      return this.userRepository.find();
    } catch (error) {

    }
  }
}
