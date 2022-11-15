import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto, EditPostDto } from './dtos';
import { Post } from './entities';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async getMany() {
    const data = await this.postRepository.find();
    return data;
  }

  async getOne(id: number) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException('not exist post');
    }
    return post;
  }

  async editOne(id: number, dto: EditPostDto) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException('not exist post');
    }
    const newPost = Object.assign(post, dto);
    return await this.postRepository.save(newPost);
  }

  async createOne(dto: CreatePostDto) {
    return await this.postRepository.save(dto);
  }

  async deleteOne(id: number) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException('not exist post');
    }
    return await this.postRepository.delete(post);
  }
}
