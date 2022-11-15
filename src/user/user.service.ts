import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dtos';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getMany() {
    return await this.userRepository.find();
  }

  async getOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('not exit user');
    }
    return user;
  }

  async createUser(dto: CreateUserDto) {
    return await this.userRepository.save(dto);
  }

  async editOne(id: number, dto: EditUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('not exit user');
    }
    const newUser = Object.assign(user, dto);
    return await this.userRepository.save(newUser);
  }

  async deleteOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('not exit user');
    }
    return this.userRepository.delete(user);
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({
      email,
    });
  }
}
