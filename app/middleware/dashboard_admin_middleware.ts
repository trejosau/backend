import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { DashboardAuthService } from '#services/dashboard_auth_service'

export default class DashboardAdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const service = new DashboardAuthService()
    await service.ensureAdmin(ctx)
    return next()
  }
}
