import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';

import { PostCategory } from '../enums';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEnum(PostCategory, {
    message: `category puede ser ${Object.values(PostCategory)} `,
  })
  category: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;
}
