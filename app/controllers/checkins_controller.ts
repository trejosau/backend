import type { HttpContext } from '@adonisjs/core/http'
import { AppException } from '#exceptions/app_exception'
import { DashboardQueryService } from '#services/dashboard_query_service'
import { AccountsOrchestratorService } from '#services/accounts_orchestrator_service'

export default class CheckinsController {
  async index({ response }: HttpContext) {
    const service = new DashboardQueryService()
    return response.ok({ data: await service.listCheckins() })
  }

  async perform({ params, response }: HttpContext) {
    try {
      const service = new AccountsOrchestratorService()
      return response.ok(await service.performCheckin(params.slug))
    } catch (error) {
      if (error instanceof AppException) {
        return response.status(error.status).send({ error: error.message, code: error.code })
      }

      throw error
    }
  }
}
