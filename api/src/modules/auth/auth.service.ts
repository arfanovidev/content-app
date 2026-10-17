import { Injectable, UnauthorizedException, ConflictException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from './users.service';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly users: UsersService,
  ) {}

  async signup(dto: SignupDto): Promise<{ accessToken: string; user: any }> {
    const existingEmail = await this.users.findByEmail(dto.email);
    if (existingEmail) {
      throw new ConflictException('Email already registered');
    }

    const existingUsername = await this.users.findByUsername(dto.username);
    if (existingUsername) {
      throw new ConflictException('Username already taken');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const record = await this.users.create({
      username: dto.username,
      email: dto.email,
      passwordHash,
    });

    const accessToken = await this.jwtService.signAsync({
      sub: record.id,
      username: record.username,
      email: record.email,
      role: record.role,
    });

    this.logger.log(`Signup: ${record.email}`);

    return {
      accessToken,
      user: {
        id: record.id,
        username: record.username,
        email: record.email,
        role: record.role,
      },
    };
  }

  async login(dto: LoginDto): Promise<{ accessToken: string; user: any }> {
    // 1. Check admin env credentials
    const adminUser = process.env.ADMIN_USER;
    const adminHash = process.env.ADMIN_PASS_HASH;

    if (
      adminUser &&
      adminHash &&
      dto.username === adminUser &&
      (await bcrypt.compare(dto.password, adminHash))
    ) {
      const payload = {
        sub: 'admin',
        username: adminUser,
        role: 'admin',
      };
      const accessToken = await this.jwtService.signAsync(payload);
      this.logger.log(`Admin login: ${adminUser}`);
      return {
        accessToken,
        user: { username: adminUser, role: 'admin' },
      };
    }

    // 2. Check database users (by username OR email)
    const record =
      (await this.users.findByUsername(dto.username)) ||
      (await this.users.findByEmail(dto.username));

    if (!record) {
      this.logger.warn(`Failed login: user not found "${dto.username}"`);
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!record.passwordHash) {
      throw new UnauthorizedException(
        'This account uses Google sign-in. Please sign in with Google.',
      );
    }

    const valid = await bcrypt.compare(dto.password, record.passwordHash);
    if (!valid) {
      this.logger.warn(`Failed login: wrong password for "${dto.username}"`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: record.id,
      username: record.username,
      email: record.email,
      role: record.role,
    });

    this.logger.log(`Login: ${record.email}`);

    return {
      accessToken,
      user: {
        id: record.id,
        username: record.username,
        email: record.email,
        role: record.role,
      },
    };
  }

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

      // Save user in database
      const record = isAdmin
        ? null
        : await this.users.upsertGoogleUser({
            email: payload.email,
            name: payload.name,
            provider: 'google',
          });

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
      this.logger.warn(`Google token verify failed: ${(err as Error)?.message ?? err}`);
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