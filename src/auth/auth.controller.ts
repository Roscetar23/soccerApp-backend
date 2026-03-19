import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.validateUser(loginDto.username, loginDto.password);
  }

  @Post('register')
  async register(@Body() registerDto: LoginDto) {
    return this.authService.register(registerDto.username, registerDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout() {
    // Al ser una API simple que no maneja cookies o JWT por el momento,
    // el logout real ocurre en el frontend eliminando el "id". 
    // Sin embargo, este endpoint sirve para mantener la estructura y consistencia.
    return { message: 'Sesión cerrada correctamente' };
  }
}
