import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity'; // Import your user entity
import { JwtPayload } from './jwt-payload.interface'; // Import your JWT payload interface
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Inject user repository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Bearer token
      secretOrKey: 'topSecret51', // Use your JWT secret from environment variables
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userRepository.findOne({
      where: { username: payload.username },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user; // Return the user object if found
  }
}
