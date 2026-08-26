import test from 'node:test'
import assert from 'node:assert/strict'
import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import validateToken from './validateToken.ts'

process.env.SECRET_KEY = 'test-secret-key'

function mockResponse() {
    const res: Partial<Response> & { statusCode?: number; body?: unknown } = {}
    res.status = function (code: number) {
        res.statusCode = code
        return res as Response
    }
    res.json = function (payload: unknown) {
        res.body = payload
        return res as Response
    }
    return res as Response & { statusCode?: number; body?: unknown }
}

function mockRequest(authorization?: string): Request {
    return { headers: authorization ? { authorization } : {} } as unknown as Request
}

test('rechaza cuando no hay header authorization', () => {
    const req = mockRequest()
    const res = mockResponse()
    let nextCalled = false
    const next: NextFunction = () => { nextCalled = true }

    validateToken(req, res, next)

    assert.equal(nextCalled, false)
    assert.equal(res.statusCode, 401)
    assert.deepEqual(res.body, { msg: 'Acceso Denegado' })
})

test('rechaza cuando el header no empieza con Bearer', () => {
    const req = mockRequest('Token abc123')
    const res = mockResponse()
    let nextCalled = false
    const next: NextFunction = () => { nextCalled = true }

    validateToken(req, res, next)

    assert.equal(nextCalled, false)
    assert.equal(res.statusCode, 401)
})

test('rechaza un token invalido o expirado', () => {
    const req = mockRequest('Bearer token-invalido')
    const res = mockResponse()
    let nextCalled = false
    const next: NextFunction = () => { nextCalled = true }

    validateToken(req, res, next)

    assert.equal(nextCalled, false)
    assert.equal(res.statusCode, 401)
    assert.deepEqual(res.body, { msg: 'CIERRE DE SESIÓN AUTOMATICO' })
})

test('permite el paso con un token valido', () => {
    const token = jwt.sign({ Uemail: 'user@example.com' }, process.env.SECRET_KEY as string)
    const req = mockRequest(`Bearer ${token}`)
    const res = mockResponse()
    let nextCalled = false
    const next: NextFunction = () => { nextCalled = true }

    validateToken(req, res, next)

    assert.equal(nextCalled, true)
    assert.equal(res.statusCode, undefined)
})
