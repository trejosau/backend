import type { HttpContext } from '@adonisjs/core/http'
import { DashboardQueryService } from '#services/dashboard_query_service'

export default class NotificationsController {
  async index({ request, response }: HttpContext) {
    const limit = Number(request.input('limit', 80))
    const service = new DashboardQueryService()
    return response.ok({ data: await service.listNotifications(limit) })
  }
}
