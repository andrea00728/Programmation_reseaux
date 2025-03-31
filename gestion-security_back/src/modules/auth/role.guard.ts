import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true; 
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new ForbiddenException('Accès refusé: Aucun token fourni');
    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token);

      if (!requiredRoles.includes(decoded.role)) {
        throw new ForbiddenException("Accès interdit: Vous n'avez pas le bon rôle");
      }  
      return true;
    } catch {
      throw new ForbiddenException("Accès interdit: Token invalide ou expiré");
    }
  }
}
