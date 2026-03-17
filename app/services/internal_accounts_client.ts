import env from '#start/env'
import ServiceNode from '#models/service_node'
import { AppException } from '#exceptions/app_exception'

interface JsonResponse<T> {
  data?: T
  message?: string
  error?: string
}

export class InternalAccountsClient {
  private token = env.get('INTERNAL_API_TOKEN')

  private async request<T>(
    node: ServiceNode,
    path: string,
    init: RequestInit = {}
  ): Promise<JsonResponse<T>> {
    const response = await fetch(`${node.baseUrl}${path}`, {
      ...init,
      headers: {
        'content-type': 'application/json',
        'x-internal-token': this.token,
        ...(init.headers ?? {}),
      },
    })

    const payload = (await response.json().catch(() => ({}))) as JsonResponse<T>
    if (!response.ok) {
      throw new AppException(
        payload.error || payload.message || 'No se pudo completar la solicitud al servicio de cuentas.',
        response.status,
        'INTERNAL_SERVICE_ERROR'
      )
    }

    if (payload.error) {
      throw new AppException(payload.error, 400, 'INTERNAL_SERVICE_ERROR')
    }

    return payload
  }

  registerAccount(
    node: ServiceNode,
    payload: { slug: string; account: string; pwd: string; containerCode: string }
  ) {
    return this.request(node, '/internal/accounts', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }

  receiveProfit(node: ServiceNode, slug: string, projectId: number) {
    return this.request(node, `/internal/accounts/${slug}/projects/${projectId}/receive`, {
      method: 'POST',
    })
  }

  performCheckin(node: ServiceNode, slug: string) {
    return this.request(node, `/internal/accounts/${slug}/checkin`, {
      method: 'POST',
    })
  }
}
