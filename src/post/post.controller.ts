import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard.ts';
import { Roles } from 'src/role/decorator.ts/roles.decorator';
import { RolesGuard } from 'src/role/guards/roles.guard';
import { CreatePostDto, EditPostDto } from './dtos';
import { PostService } from './post.service';
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Roles('AUTHOR', 'ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getMany() {
    return await this.postService.getMany();
  }
  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.postService.getOne(id);
  }

  @Post()
  async createOne(@Body() dto: CreatePostDto) {
    return await this.postService.createOne(dto);
  }

  @Put(':id')
  async editOne(@Body() dto: EditPostDto, @Param('id') id: number) {
    return await this.postService.editOne(id, dto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number) {
    const data = await this.postService.deleteOne(id);
    return { message: 'it is post delete', data };
  }
}
