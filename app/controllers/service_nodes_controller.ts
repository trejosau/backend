import type { HttpContext } from '@adonisjs/core/http'
import { AppException } from '#exceptions/app_exception'
import { ServiceNodesService } from '#services/service_nodes_service'
import {
  bootstrapRailwayNodesValidator,
  upsertServiceNodeValidator,
} from '#validators/service_node'

export default class ServiceNodesController {
  async index({ response }: HttpContext) {
    const service = new ServiceNodesService()
    return response.ok({ data: await service.list() })
  }

  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(upsertServiceNodeValidator)
      const service = new ServiceNodesService()
      const node = await service.upsert(payload)

      return response.ok({
        data: node,
        message: 'Contenedor guardado.',
      })
    } catch (error) {
      if (error instanceof AppException) {
        return response.status(error.status).send({ error: error.message, code: error.code })
      }

      throw error
    }
  }

  async bootstrapRailway({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(bootstrapRailwayNodesValidator)
      const service = new ServiceNodesService()
      const nodes = await service.bootstrapRailwayNodes(payload)

      return response.ok({
        data: nodes,
        message: 'Contenedores Railway configurados.',
      })
    } catch (error) {
      if (error instanceof AppException) {
        return response.status(error.status).send({ error: error.message, code: error.code })
      }

      throw error
    }
  }
}
