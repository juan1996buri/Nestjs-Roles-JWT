import { Controller, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard.ts';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { User as UserEntity } from 'src/user/entities';
import { User } from './decorators/user.decorator';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: UserEntity) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user: UserEntity) {
    return { user };
  }
}
