import { HttpException, HttpStatus } from '@nestjs/common'

export interface RequestWithHeaders {
    headers: Record<string, string | string[] | undefined>
}

export interface TokenVerifier {
    verify(token: string): unknown
}

// Sin decoradores a propósito: node:test ejecuta los *.test.ts directo con el
// strip-only mode de Node, que no soporta sintaxis de decoradores (@Injectable, etc).
// Esta lógica pura se testea sola; jwt-auth.guard.ts es solo el wrapper decorado para Nest.
export function verifyAuthorization(request: RequestWithHeaders, jwtService: TokenVerifier): true {
    const headerToken = request.headers['authorization']

    if (typeof headerToken === 'string' && headerToken.startsWith('Bearer ')) {
        try {
            const token = headerToken.slice(7)
            jwtService.verify(token)
            return true
        } catch (error) {
            throw new HttpException({ msg: `CIERRE DE SESIÓN AUTOMATICO` }, HttpStatus.UNAUTHORIZED)
        }
    }

    throw new HttpException({ msg: `Acceso Denegado` }, HttpStatus.UNAUTHORIZED)
}
