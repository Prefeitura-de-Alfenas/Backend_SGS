import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';

export function matchRoles(requiredRoles: string[], userRoles: string[]): boolean {
  return userRoles.some(userRole => requiredRoles.includes(userRole));
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    
    const requiredRoles = this.reflector.get<string[]>(Roles, context.getHandler());
    console.log('matchRoles',requiredRoles)
    if (!requiredRoles || !requiredRoles.length) {
        return true; // No roles are required, so access is granted.
      }
  
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      
      if (!user || !user.role) {
        return false; // User has no role, access denied.
      }
      
       const verifyRole = matchRoles(requiredRoles, user.role); 
       if(verifyRole){
        return true;
       }
       throw new UnauthorizedException();
  }
}