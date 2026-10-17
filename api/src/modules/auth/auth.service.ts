import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { OAuth2Client } from 'google-auth-library';

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

  /**
 * Verify Google ID token and issue JWT.
 */
async googleLogin(idToken: string): Promise<{ accessToken: string; user: any }> {
    const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
    if (!clientId) {
      throw new UnauthorizedException('GOOGLE_OAUTH_CLIENT_ID not configured');
    }

    const client = new OAuth2Client(clientId);

    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: clientId,
      });
      const payload = ticket.getPayload();

      if (!payload || !payload.email) {
        throw new UnauthorizedException('Invalid Google token');
      }

      const isAdmin = payload.email === process.env.ADMIN_EMAIL;
      const user = {
        sub: payload.sub,
        username: payload.email.split('@')[0],
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        role: isAdmin ? 'admin' : 'user',
      };

      const accessToken = await this.jwtService.signAsync({
        sub: payload.sub,
        username: user.username,
        email: user.email,
        role: user.role,
      });

      this.logger.log(`Google login: ${user.email} (${user.role})`);

      return { accessToken, user };
    } catch (err) {
      this.logger.warn(`Google token verify failed: ${err?.message ?? err}`);
      throw new UnauthorizedException('Invalid Google token');
    }
  }

  async verifyProfile(user: any) {
    return {
      username: user.username,
      role: user.role,
      userId: user.userId,
    };
  }
}
