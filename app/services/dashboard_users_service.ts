import db from '@adonisjs/lucid/services/db'
import env from '#start/env'
import DashboardUser from '#models/dashboard_user'
import { AppException } from '#exceptions/app_exception'
import { PasswordService } from '#services/password_service'
import { DashboardAuthService } from '#services/dashboard_auth_service'

export class DashboardUsersService {
  constructor(
    private readonly passwordService = new PasswordService(),
    private readonly authService = new DashboardAuthService()
  ) {}

  async ensureDefaultAdmin() {
    const tableCheck = (await db.rawQuery("select to_regclass('public.dashboard_users') as table_name")) as {
      rows?: Array<{ table_name?: string | null }>
    }
    if (!tableCheck.rows?.[0]?.table_name) return

    const username = env.get('DASHBOARD_ADMIN_USERNAME', 'sau')
    const password = env.get('DASHBOARD_ADMIN_PASSWORD', 'sau123456')
    const existing = await DashboardUser.findBy('username', username)

    if (existing) {
      let dirty = false

      if (existing.role !== 'admin') {
        existing.role = 'admin'
        dirty = true
      }

      if (!existing.active) {
        existing.active = true
        dirty = true
      }

      if (!this.passwordService.verify(password, existing.passwordHash)) {
        existing.passwordHash = this.passwordService.hash(password)
        dirty = true
      }

      if (dirty) {
        await existing.save()
      }
      return
    }

    await DashboardUser.create({
      username,
      passwordHash: this.passwordService.hash(password),
      role: 'admin',
      active: true,
    })
  }

  async list() {
    const users = await DashboardUser.query().orderBy('username', 'asc')
    return users.map((user) => this.authService.serialize(user))
  }

  async create(input: { username: string; password: string }) {
    const username = input.username.trim().toLowerCase()
    const existing = await DashboardUser.findBy('username', username)
    if (existing) {
      throw new AppException('Ese usuario ya existe.', 409, 'USER_EXISTS')
    }

    const user = await DashboardUser.create({
      username,
      passwordHash: this.passwordService.hash(input.password),
      role: username === 'sau' ? 'admin' : 'user',
      active: true,
    })

    return this.authService.serialize(user)
  }

  async updatePassword(id: number, password: string) {
    const user = await DashboardUser.find(id)
    if (!user) {
      throw new AppException('El usuario no existe.', 404, 'USER_NOT_FOUND')
    }

    user.passwordHash = this.passwordService.hash(password)
    await user.save()
    return this.authService.serialize(user)
  }

  async updateAccess(id: number, active: boolean) {
    const user = await DashboardUser.find(id)
    if (!user) {
      throw new AppException('El usuario no existe.', 404, 'USER_NOT_FOUND')
    }

    if (user.username === 'sau' && !active) {
      throw new AppException('No puedes desactivar al administrador principal.', 409, 'CANNOT_DISABLE_ADMIN')
    }

    user.active = active
    await user.save()
    return this.authService.serialize(user)
  }
}
