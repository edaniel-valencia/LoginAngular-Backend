import test from 'node:test'
import assert from 'node:assert/strict'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Estos tests cubren el mismo flujo de hashing y firma de token que usan
// CreateUser/LoginUser en user.ts, sin depender de una base de datos.

test('bcrypt: un password hasheado valida correctamente contra el original', async () => {
    const hash = await bcrypt.hash('secret123', 10)

    assert.notEqual(hash, 'secret123')
    assert.equal(await bcrypt.compare('secret123', hash), true)
    assert.equal(await bcrypt.compare('otra-cosa', hash), false)
})

test('jwt: un token firmado con SECRET_KEY se puede verificar con la misma key', () => {
    const secret = 'test-secret-key'
    const token = jwt.sign({ Uemail: 'user@example.com' }, secret)

    const decoded = jwt.verify(token, secret) as jwt.JwtPayload
    assert.equal(decoded.Uemail, 'user@example.com')
})

test('jwt: un token firmado con otra key no verifica', () => {
    const token = jwt.sign({ Uemail: 'user@example.com' }, 'clave-correcta')

    assert.throws(() => jwt.verify(token, 'clave-incorrecta'))
})
