import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from 'src/user/dto/UserDto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() auth: AuthUserDto) {
    try {
      console.log('Login attempt with:', auth);
      const login = await this.authService.authenticate(auth);
      console.log('Login successful:', login);
      return login
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    try {
      return this.authService.getProfile(req.user);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req) {
    try {
      return this.authService.refreshToken(req.user);
    } catch (error) {
      throw error;
    }
  }
}
