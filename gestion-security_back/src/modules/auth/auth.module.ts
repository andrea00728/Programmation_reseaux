import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RoleGuard } from './role.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: '2002andrea',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtStrategy, RoleGuard],
  exports: [JwtModule, RoleGuard],
})
export class AuthModule {}
