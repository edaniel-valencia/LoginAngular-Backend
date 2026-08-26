import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { verifyAuthorization, RequestWithHeaders } from './jwt-auth.logic'

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<RequestWithHeaders>()
        return verifyAuthorization(request, this.jwtService)
    }
}
