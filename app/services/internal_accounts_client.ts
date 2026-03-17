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

  private async sleep(ms: number) {
    await new Promise((resolve) => setTimeout(resolve, ms))
  }

  private buildSnippet(rawText: string) {
    return rawText.replace(/\s+/g, ' ').trim().slice(0, 180) || 'sin detalle'
  }

  private isNetworkError(error: unknown) {
    if (!(error instanceof Error)) {
      return false
    }

    const text = `${error.message} ${'cause' in error ? String((error as Error & { cause?: unknown }).cause ?? '') : ''}`.toLowerCase()
    return text.includes('fetch failed') || text.includes('timeout') || text.includes('econnreset')
  }

  private async warmup(node: ServiceNode) {
    try {
      await fetch(`${node.baseUrl}/health`, {
        headers: {
          accept: 'application/json',
        },
      })
    } catch {
      // no-op: the warmup call is best effort only
    }
  }

  private async request<T>(
    node: ServiceNode,
    path: string,
    init: RequestInit = {}
  ): Promise<JsonResponse<T>> {
    const attemptRequest = async () =>
      fetch(`${node.baseUrl}${path}`, {
        ...init,
        headers: {
          'content-type': 'application/json',
          'x-internal-token': this.token,
          ...(init.headers ?? {}),
        },
      })

    let response: Response
    try {
      response = await attemptRequest()
    } catch (error) {
      if (!this.isNetworkError(error)) {
        throw error
      }

      await this.warmup(node)
      await this.sleep(1200)

      try {
        response = await attemptRequest()
      } catch (retryError) {
        const message =
          retryError instanceof Error ? retryError.message : 'No se pudo contactar el contenedor remoto.'
        throw new AppException(
          `No se pudo contactar ${node.code} en ${node.baseUrl}: ${message}.`,
          502,
          'INTERNAL_SERVICE_UNREACHABLE'
        )
      }
    }

    const rawText = await response.text()
    let payload = {} as JsonResponse<T>
    if (rawText) {
      try {
        payload = JSON.parse(rawText) as JsonResponse<T>
      } catch {
        throw new AppException(
          `El contenedor ${node.code} devolvio una respuesta no JSON: ${this.buildSnippet(rawText)}.`,
          502,
          'INTERNAL_SERVICE_INVALID_RESPONSE'
        )
      }
    }
    if (!response.ok) {
      throw new AppException(
        payload.error ||
          payload.message ||
          `No se pudo completar la solicitud al servicio de cuentas: ${this.buildSnippet(rawText)}.`,
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

  syncAccount(node: ServiceNode, slug: string) {
    return this.request(node, `/internal/accounts/${slug}/sync`, {
      method: 'POST',
    })
  }
}
