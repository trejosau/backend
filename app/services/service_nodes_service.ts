import ServiceNode from '#models/service_node'
import db from '@adonisjs/lucid/services/db'

interface UpsertServiceNodeInput {
  code: string
  name: string
  baseUrl: string
  maxAccounts: number
  allocationOrder: number
  enabled?: boolean
}

interface BootstrapRailwayNodesInput {
  start: number
  end: number
  codePrefix?: string
  namePrefix?: string
  hostPrefix?: string
  hostSuffix?: string
  protocol?: 'http' | 'https'
  port?: number
  maxAccounts?: number
}

export class ServiceNodesService {
  async list() {
    const nodes = await ServiceNode.query().orderBy('allocationOrder', 'asc').orderBy('code', 'asc')
    const counts = (await db
      .from('managed_accounts')
      .whereNotNull('container_code')
      .select('container_code')
      .count('* as total')
      .groupBy('container_code')) as Array<{ container_code: string; total: string | number }>

    const countsMap = new Map(counts.map((row) => [row.container_code, Number(row.total || 0)]))

    return nodes.map((node) => {
      const currentLoad = countsMap.get(node.code) || 0
      return {
        code: node.code,
        name: node.name,
        baseUrl: node.baseUrl,
        maxAccounts: node.maxAccounts,
        allocationOrder: node.allocationOrder,
        enabled: node.enabled,
        healthy: node.healthy,
        lastHeartbeatAt: node.lastHeartbeatAt?.toISO() ?? null,
        currentLoad,
        availableSlots: Math.max(0, node.maxAccounts - currentLoad),
      }
    })
  }

  async upsert(input: UpsertServiceNodeInput) {
    const node = await ServiceNode.updateOrCreate(
      { code: input.code },
      {
        name: input.name,
        baseUrl: input.baseUrl,
        maxAccounts: input.maxAccounts,
        allocationOrder: input.allocationOrder,
        enabled: input.enabled ?? true,
      }
    )

    return node
  }

  async bootstrapRailwayNodes(input: BootstrapRailwayNodesInput) {
    const start = Math.min(input.start, input.end)
    const end = Math.max(input.start, input.end)
    const codePrefix = input.codePrefix || 'cuentas-'
    const namePrefix = input.namePrefix || 'Contenedor '
    const hostPrefix = input.hostPrefix || codePrefix
    const hostSuffix = input.hostSuffix || '.up.railway.app'
    const protocol = input.protocol || 'https'
    const maxAccounts = input.maxAccounts || 3

    const nodes: ServiceNode[] = []
    for (let index = start; index <= end; index++) {
      const code = `${codePrefix}${index}`
      const name = `${namePrefix}${String(index).padStart(2, '0')}`
      const host = `${hostPrefix}${index}${hostSuffix}`
      const baseUrl = this.buildBaseUrl(protocol, host, input.port)

      let node = await ServiceNode.findBy('code', code)
      if (!node) {
        node = await ServiceNode.create({
          code,
          name,
          baseUrl,
          maxAccounts,
          allocationOrder: index,
          enabled: true,
          healthy: false,
        })
      } else {
        node.name = name
        node.baseUrl = baseUrl
        node.maxAccounts = maxAccounts
        node.allocationOrder = index
        node.enabled = true
        await node.save()
      }

      nodes.push(node)
    }

    return nodes
  }

  private buildBaseUrl(protocol: 'http' | 'https', host: string, port?: number) {
    if (!port) {
      return `${protocol}://${host}`
    }

    return `${protocol}://${host}:${port}`
  }
}
