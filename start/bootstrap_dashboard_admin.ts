import logger from '@adonisjs/core/services/logger'
import { DashboardUsersService } from '#services/dashboard_users_service'

async function bootstrapDashboardAdmin() {
  try {
    const service = new DashboardUsersService()
    await service.ensureDefaultAdmin()
  } catch (error) {
    logger.error({ err: error }, 'No se pudo asegurar el usuario administrador del dashboard')
  }
}

await bootstrapDashboardAdmin()
