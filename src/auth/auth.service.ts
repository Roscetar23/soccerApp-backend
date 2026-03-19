import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<{ id: string }> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Devolvemos el id como solicitaste
    return { id: user._id.toString() };
  }
  
  async register(username: string, pass: string): Promise<{ id: string }> {
    const saltOrRounds = 10;
    const passwordHash = await bcrypt.hash(pass, saltOrRounds);
    const user = await this.usersService.create(username, passwordHash);
    
    return { id: user._id.toString() };
  }
}
