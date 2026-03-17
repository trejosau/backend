import ManagedAccount from '#models/managed_account'
import ServiceNode from '#models/service_node'
import env from '#start/env'
import { AppException } from '#exceptions/app_exception'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

export class NodeAllocatorService {
  async pick(preferredCode?: string | null) {
    const maxDefault = env.get('DEFAULT_MAX_ACCOUNTS_PER_CONTAINER', 3)
    const minHeartbeat = DateTime.now().minus({ minutes: 3 })
    const nodes = await ServiceNode.query()
      .where('enabled', true)
      .where('healthy', true)
      .whereNotNull('lastHeartbeatAt')
      .where('lastHeartbeatAt', '>=', minHeartbeat.toSQL()!)
      .orderBy('allocationOrder', 'asc')
      .orderBy('createdAt', 'asc')

    const filtered = preferredCode
      ? nodes.filter((node) => node.code === preferredCode)
      : nodes

    for (const node of filtered) {
      const countRow = (await db
        .from('managed_accounts')
        .where('container_code', node.code)
        .count('* as total')
        .first()) as { total?: string | number } | null
      const currentLoad = Number(countRow?.total || 0)
      const limit = node.maxAccounts || maxDefault

      if (currentLoad < limit) {
        return node
      }
    }

    if (preferredCode) {
      throw new AppException(
        `El contenedor ${preferredCode} no esta disponible o ya alcanzo su limite.`,
        409,
        'NODE_UNAVAILABLE'
      )
    }

    throw new AppException(
      'No hay contenedores disponibles para registrar otra cuenta.',
      409,
      'NO_AVAILABLE_NODES'
    )
  }

  async resolveForAccount(slug: string) {
    const account = await ManagedAccount.findBy('slug', slug)
    if (!account) {
      throw new AppException('La cuenta solicitada no existe.', 404, 'ACCOUNT_NOT_FOUND')
    }

    if (!account.containerCode) {
      throw new AppException(
        'La cuenta no tiene un contenedor asignado.',
        409,
        'ACCOUNT_WITHOUT_NODE'
      )
    }

    const node = await ServiceNode.findBy('code', account.containerCode)
    if (!node) {
      throw new AppException(
        `No se encontro el contenedor ${account.containerCode}.`,
        404,
        'NODE_NOT_FOUND'
      )
    }

    return { account, node }
  }
}
