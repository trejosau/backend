import type { HttpContext } from '@adonisjs/core/http'
import { AppException } from '#exceptions/app_exception'
import { DashboardUsersService } from '#services/dashboard_users_service'
import {
  createDashboardUserValidator,
  updateDashboardAccessValidator,
  updateDashboardPasswordValidator,
} from '#validators/dashboard_user'

export default class UsersController {
  async index({ response }: HttpContext) {
    const service = new DashboardUsersService()
    return response.ok({ data: await service.list() })
  }

  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createDashboardUserValidator)
      const service = new DashboardUsersService()
      return response.status(201).send({ data: await service.create(payload), message: 'Usuario creado.' })
    } catch (error) {
      if (error instanceof AppException) {
        return response.status(error.status).send({ error: error.message, code: error.code })
      }

      throw error
    }
  }

  async updatePassword({ params, request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(updateDashboardPasswordValidator)
      const service = new DashboardUsersService()
      return response.ok({
        data: await service.updatePassword(Number(params.id), payload.password),
        message: 'Contrasena actualizada.',
      })
    } catch (error) {
      if (error instanceof AppException) {
        return response.status(error.status).send({ error: error.message, code: error.code })
      }

      throw error
    }
  }

  async updateAccess({ params, request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(updateDashboardAccessValidator)
      const service = new DashboardUsersService()
      return response.ok({
        data: await service.updateAccess(Number(params.id), payload.active),
        message: 'Acceso actualizado.',
      })
    } catch (error) {
      if (error instanceof AppException) {
        return response.status(error.status).send({ error: error.message, code: error.code })
      }

      throw error
    }
  }
}
