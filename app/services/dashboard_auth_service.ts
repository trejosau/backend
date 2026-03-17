import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import DashboardUser from '#models/dashboard_user'
import { AppException } from '#exceptions/app_exception'
import { PasswordService } from '#services/password_service'

const SESSION_KEY = 'dashboard_user_id'

export class DashboardAuthService {
  constructor(private readonly passwordService = new PasswordService()) {}

  async login(ctx: HttpContext, username: string, password: string) {
    const user = await DashboardUser.findBy('username', username.trim().toLowerCase())
    if (!user || !user.active || !this.passwordService.verify(password, user.passwordHash)) {
      throw new AppException('Credenciales invalidas.', 401, 'INVALID_CREDENTIALS')
    }

    ctx.session.put(SESSION_KEY, user.id)
    user.lastLoginAt = DateTime.now()
    await user.save()

    return this.serialize(user)
  }

  async logout(ctx: HttpContext) {
    ctx.session.forget(SESSION_KEY)
  }

  async current(ctx: HttpContext) {
    const userId = Number(ctx.session.get(SESSION_KEY))
    if (!userId) {
      return null
    }

    const user = await DashboardUser.find(userId)
    if (!user || !user.active) {
      ctx.session.forget(SESSION_KEY)
      return null
    }

    return user
  }

  async ensureAuthenticated(ctx: HttpContext) {
    const user = await this.current(ctx)
    if (!user) {
      throw new AppException('Debes iniciar sesion.', 401, 'AUTH_REQUIRED')
    }
    return user
  }

  async ensureAdmin(ctx: HttpContext) {
    const user = await this.ensureAuthenticated(ctx)
    if (user.username !== 'sau' || user.role !== 'admin') {
      throw new AppException('No tienes permisos para esta accion.', 403, 'FORBIDDEN')
    }
    return user
  }

  serialize(user: DashboardUser) {
    return {
      id: user.id,
      username: user.username,
      role: user.role,
      active: user.active,
      lastLoginAt: user.lastLoginAt?.toISO() ?? null,
      isAdmin: user.username === 'sau' && user.role === 'admin',
    }
  }
}
