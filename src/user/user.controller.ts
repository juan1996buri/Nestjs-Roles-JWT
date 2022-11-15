import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateUserDto, EditUserDto } from './dtos';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getMany() {
    return await this.userService.getMany();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.userService.getOne(id);
  }

  @Put(':id')
  async editOne(@Body() dto: EditUserDto, @Param('id') id: number) {
    return this.userService.editOne(id, dto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number) {
    return await this.userService.deleteOne(id);
  }

  @Post()
  async createOne(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }
}
