import test from 'node:test'
import assert from 'node:assert/strict'
import jwt from 'jsonwebtoken'
import { verifyAuthorization } from './jwt-auth.logic.ts'

const SECRET = 'test-secret-key'

function mockRequest(authorization?: string) {
    return { headers: authorization ? { authorization } : {} }
}

const jwtService = {
    verify: (token: string) => jwt.verify(token, SECRET),
}

test('rechaza cuando no hay header authorization', () => {
    assert.throws(() => verifyAuthorization(mockRequest(), jwtService), (error: any) => {
        assert.equal(error.getStatus(), 401)
        assert.deepEqual(error.getResponse(), { msg: 'Acceso Denegado' })
        return true
    })
})

test('rechaza cuando el header no empieza con Bearer', () => {
    assert.throws(() => verifyAuthorization(mockRequest('Token abc123'), jwtService), (error: any) => {
        assert.equal(error.getStatus(), 401)
        assert.deepEqual(error.getResponse(), { msg: 'Acceso Denegado' })
        return true
    })
})

test('rechaza un token invalido o expirado', () => {
    assert.throws(() => verifyAuthorization(mockRequest('Bearer token-invalido'), jwtService), (error: any) => {
        assert.equal(error.getStatus(), 401)
        assert.deepEqual(error.getResponse(), { msg: 'CIERRE DE SESIÓN AUTOMATICO' })
        return true
    })
})

test('permite el paso con un token valido', () => {
    const token = jwt.sign({ Uemail: 'user@example.com' }, SECRET)
    assert.equal(verifyAuthorization(mockRequest(`Bearer ${token}`), jwtService), true)
})
