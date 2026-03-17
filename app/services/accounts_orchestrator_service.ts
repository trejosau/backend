import type { AccountDetailDto } from '#dtos/dashboard'
import ManagedAccount from '#models/managed_account'
import ProjectSnapshot from '#models/project_snapshot'
import { accountToSlug } from '#utils/slug'
import { AppException } from '#exceptions/app_exception'
import { DashboardQueryService } from '#services/dashboard_query_service'
import { InternalAccountsClient } from '#services/internal_accounts_client'
import { NodeAllocatorService } from '#services/node_allocator_service'
import { NotificationService } from '#services/notification_service'

interface RegisterAccountInput {
  account: string
  pwd: string
  containerCode?: string
}

export class AccountsOrchestratorService {
  constructor(
    private readonly nodeAllocator = new NodeAllocatorService(),
    private readonly internalClient = new InternalAccountsClient(),
    private readonly queryService = new DashboardQueryService(),
    private readonly notificationService = new NotificationService()
  ) {}

  async register(input: RegisterAccountInput): Promise<AccountDetailDto> {
    const slug = accountToSlug(input.account)
    const existing = await ManagedAccount.findBy('slug', slug)
    if (existing) {
      throw new AppException('La cuenta ya esta registrada.', 409, 'ACCOUNT_EXISTS')
    }

    const node = await this.nodeAllocator.pick(input.containerCode)
    await this.internalClient.registerAccount(node, {
      slug,
      account: input.account,
      pwd: input.pwd,
      containerCode: node.code,
    })

    await this.notificationService.push({
      level: 'success',
      scope: 'account',
      title: 'Cuenta vinculada',
      message: `La cuenta ${input.account} fue asignada al contenedor ${node.code}.`,
      accountSlug: slug,
      meta: { containerCode: node.code },
    })

    return this.queryService.getAccountDetail(slug)
  }

  async remove(slug: string) {
    const account = await ManagedAccount.findBy('slug', slug)
    if (!account) {
      throw new AppException('La cuenta no existe.', 404, 'ACCOUNT_NOT_FOUND')
    }

    await account.delete()

    await this.notificationService.push({
      level: 'info',
      scope: 'account',
      title: 'Cuenta eliminada',
      message: `La cuenta ${account.account} se elimino del orquestador.`,
      accountSlug: slug,
    })
  }

  async receiveProfit(projectId: number) {
    const project = await ProjectSnapshot.find(projectId)
    if (!project) {
      throw new AppException('El proyecto no existe.', 404, 'PROJECT_NOT_FOUND')
    }

    const account = await ManagedAccount.find(project.managedAccountId)
    if (!account) {
      throw new AppException('La cuenta del proyecto no existe.', 404, 'ACCOUNT_NOT_FOUND')
    }

    const { node } = await this.nodeAllocator.resolveForAccount(account.slug)
    const result = await this.internalClient.receiveProfit(node, account.slug, projectId)

    await this.notificationService.push({
      level: 'success',
      scope: 'profit',
      title: 'Cobro ejecutado',
      message: `Se cobro el proyecto ${project.projectName} de la cuenta ${account.account}.`,
      accountSlug: account.slug,
      meta: { projectId, received: result.data },
    })

    return result
  }

  async performCheckin(slug: string) {
    const { account, node } = await this.nodeAllocator.resolveForAccount(slug)
    const result = await this.internalClient.performCheckin(node, account.slug)

    await this.notificationService.push({
      level: 'success',
      scope: 'checkin',
      title: 'Check-In ejecutado',
      message: `Se realizo el check-in para la cuenta ${account.account}.`,
      accountSlug: account.slug,
      meta: { response: result.data ?? null },
    })

    return result
  }
}
