import type { HttpContext } from '@adonisjs/core/http'
import { AppException } from '#exceptions/app_exception'
import { DashboardQueryService } from '#services/dashboard_query_service'
import { AccountsOrchestratorService } from '#services/accounts_orchestrator_service'

export default class ProjectsController {
  async index({ response }: HttpContext) {
    const service = new DashboardQueryService()
    return response.ok({ data: await service.listProjects() })
  }

  async receive({ params, response }: HttpContext) {
    try {
      const projectId = Number(params.id)
      if (!Number.isInteger(projectId) || projectId <= 0) {
        throw new AppException('El proyecto solicitado no es valido.', 400, 'INVALID_PROJECT_ID')
      }

      const service = new AccountsOrchestratorService()
      return response.ok(await service.receiveProfit(projectId))
    } catch (error) {
      if (error instanceof AppException) {
        return response.status(error.status).send({ error: error.message, code: error.code })
      }

      throw error
    }
  }
}
