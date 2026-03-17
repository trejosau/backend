import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

export class PasswordService {
  hash(password: string) {
    const salt = randomBytes(16).toString('hex')
    const hash = scryptSync(password, salt, 64).toString('hex')
    return `${salt}:${hash}`
  }

  verify(password: string, storedHash: string) {
    const [salt, originalHash] = storedHash.split(':')
    if (!salt || !originalHash) {
      return false
    }

    const passwordHash = scryptSync(password, salt, 64)
    const stored = Buffer.from(originalHash, 'hex')

    if (stored.length !== passwordHash.length) {
      return false
    }

    return timingSafeEqual(stored, passwordHash)
  }
}
