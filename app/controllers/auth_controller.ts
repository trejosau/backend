import type { HttpContext } from '@adonisjs/core/http'
import { AppException } from '#exceptions/app_exception'
import { DashboardAuthService } from '#services/dashboard_auth_service'
import { dashboardLoginValidator } from '#validators/dashboard_auth'

export default class AuthController {
  async login(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(dashboardLoginValidator)
      const service = new DashboardAuthService()

      return ctx.response.ok({
        data: await service.login(ctx, payload.username, payload.password),
        message: 'Acceso concedido.',
      })
    } catch (error) {
      if (error instanceof AppException) {
        return ctx.response.status(error.status).send({ error: error.message, code: error.code })
      }

      throw error
    }
  }

  async me(ctx: HttpContext) {
    const service = new DashboardAuthService()
    const user = await service.current(ctx)

    if (!user) {
      return ctx.response.status(401).send({ error: 'Sesion no iniciada.', code: 'AUTH_REQUIRED' })
    }

    return ctx.response.ok({ data: service.serialize(user) })
  }

  async logout(ctx: HttpContext) {
    const service = new DashboardAuthService()
    await service.logout(ctx)
    return ctx.response.ok({ message: 'Sesion cerrada.' })
  }
}
