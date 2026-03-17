import type { HttpContext } from '@adonisjs/core/http'
import { DashboardQueryService } from '#services/dashboard_query_service'

export default class OverviewController {
  async index({ response }: HttpContext) {
    const service = new DashboardQueryService()
    return response.ok({ data: await service.overview() })
  }
}
