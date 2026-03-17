import type { HttpContext } from '@adonisjs/core/http'
import { AppException } from '#exceptions/app_exception'
import { DashboardQueryService } from '#services/dashboard_query_service'
import { AccountsOrchestratorService } from '#services/accounts_orchestrator_service'
import { addAccountValidator } from '#validators/add_account'

export default class AccountsController {
  async index({ response }: HttpContext) {
    const service = new DashboardQueryService()
    return response.ok({ data: await service.listAccounts() })
  }

  async show({ params, response }: HttpContext) {
    try {
      const service = new DashboardQueryService()
      return response.ok({ data: await service.getAccountDetail(params.slug) })
    } catch (error) {
      if (error instanceof AppException) {
        return response.status(error.status).send({ error: error.message, code: error.code })
      }

      throw error
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(addAccountValidator)
      const service = new AccountsOrchestratorService()

      return response.created({
        data: await service.register(payload),
        message: 'Cuenta agregada y sincronizada.',
      })
    } catch (error) {
      if (error instanceof AppException) {
        return response.status(error.status).send({ error: error.message, code: error.code })
      }

      throw error
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const service = new AccountsOrchestratorService()
      await service.remove(params.slug)
      return response.ok({ message: 'Cuenta eliminada.' })
    } catch (error) {
      if (error instanceof AppException) {
        return response.status(error.status).send({ error: error.message, code: error.code })
      }

      throw error
    }
  }

  async sync({ params, response }: HttpContext) {
    try {
      const service = new AccountsOrchestratorService()
      return response.ok({
        data: await service.sync(params.slug),
        message: 'Cuenta resincronizada.',
      })
    } catch (error) {
      if (error instanceof AppException) {
        return response.status(error.status).send({ error: error.message, code: error.code })
      }

      throw error
    }
  }
}
