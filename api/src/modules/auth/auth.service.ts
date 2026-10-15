import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly jwtService: JwtService) {}

  async login(dto: LoginDto): Promise<{ accessToken: string; user: any }> {
    const adminUser = process.env.ADMIN_USER;
    const adminHash = process.env.ADMIN_PASS_HASH;

    if (!adminUser || !adminHash) {
      throw new UnauthorizedException('Admin credentials not configured');
    }

    if (dto.username !== adminUser) {
      this.logger.warn(`Failed login: username "${dto.username}"`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(dto.password, adminHash);
    if (!isValid) {
      this.logger.warn(`Failed login: wrong password for "${dto.username}"`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: 'admin',
      username: dto.username,
      role: 'admin',
    };

    const accessToken = await this.jwtService.signAsync(payload);

    this.logger.log(`Successful login: ${dto.username}`);

    return {
      accessToken,
      user: {
        username: dto.username,
        role: 'admin',
      },
    };
  }

  async verifyProfile(user: any) {
    return {
      username: user.username,
      role: user.role,
      userId: user.userId,
    };
  }
}
