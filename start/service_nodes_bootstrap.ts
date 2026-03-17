import logger from '@adonisjs/core/services/logger'
import env from '#start/env'
import { ServiceNodesService } from '#services/service_nodes_service'

async function bootstrapServiceNodes() {
  if (!env.get('SERVICE_NODES_BOOTSTRAP_ENABLED', false)) {
    return
  }

  const service = new ServiceNodesService()
  const nodes = await service.bootstrapRailwayNodes({
    start: env.get('SERVICE_NODES_START', 1),
    end: env.get('SERVICE_NODES_END', 20),
    codePrefix: env.get('SERVICE_NODES_CODE_PREFIX', 'cuentas-'),
    namePrefix: env.get('SERVICE_NODES_NAME_PREFIX', 'Contenedor '),
    hostPrefix: env.get('SERVICE_NODES_HOST_PREFIX', 'cuentas-'),
    hostSuffix: env.get('SERVICE_NODES_HOST_SUFFIX', '.up.railway.app'),
    protocol: env.get('SERVICE_NODES_PROTOCOL', 'https'),
    port: env.get('SERVICE_NODES_PORT'),
    maxAccounts: env.get('SERVICE_NODES_MAX_ACCOUNTS', 3),
  })

  logger.info({ total: nodes.length }, 'Bootstrap de service_nodes aplicado')
}

await bootstrapServiceNodes()
