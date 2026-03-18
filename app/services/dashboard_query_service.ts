import type {
  AccountDetailDto,
  AccountListItemDto,
  CheckinCardDto,
  NotificationDto,
  OverviewDto,
  ProjectCardDto,
} from '#dtos/dashboard'
import AccountSnapshot from '#models/account_snapshot'
import CheckinSnapshot from '#models/checkin_snapshot'
import ManagedAccount from '#models/managed_account'
import Notification from '#models/notification'
import ProjectSnapshot from '#models/project_snapshot'
import { AppException } from '#exceptions/app_exception'
import { toNumber } from '#utils/numbers'
import { formatRemainingHms, nowUnix, remainingFromReceiveTime } from '#utils/time'

export class DashboardQueryService {
  async overview(): Promise<OverviewDto> {
    const [accounts, projects, checkins, snapshots] = await Promise.all([
      ManagedAccount.query(),
      ProjectSnapshot.query(),
      CheckinSnapshot.query(),
      AccountSnapshot.query(),
    ])

    return {
      accountCount: accounts.length,
      activeTokens: accounts.filter((account) => account.tokenStatus === 'active').length,
      inactiveTokens: accounts.filter((account) => account.tokenStatus !== 'active').length,
      totalProfitMxn: snapshots.reduce((total, item) => total + toNumber(item.totalProfit), 0),
      pendingReceives: projects.filter((item) => item.runStatus === 1 && !item.isReceive).length,
      pendingCheckins: checkins.filter((item) => item.canCheckin).length,
    }
  }

  async listAccounts(): Promise<AccountListItemDto[]> {
    const [accounts, snapshots, projects, checkins] = await Promise.all([
      ManagedAccount.query().orderBy('createdAt', 'desc'),
      AccountSnapshot.query(),
      ProjectSnapshot.query(),
      CheckinSnapshot.query(),
    ])

    const snapshotMap = new Map(snapshots.map((snapshot) => [snapshot.managedAccountId, snapshot]))
    const checkinMap = new Map(checkins.map((checkin) => [checkin.managedAccountId, checkin]))
    const projectMap = new Map<number, ProjectSnapshot[]>()

    for (const project of projects) {
      const list = projectMap.get(project.managedAccountId) ?? []
      list.push(project)
      projectMap.set(project.managedAccountId, list)
    }

    return accounts.map((account) => this.serializeAccount(account, snapshotMap, projectMap, checkinMap))
  }

  async getAccountDetail(slug: string): Promise<AccountDetailDto> {
    const [accounts, snapshots, projects, checkins] = await Promise.all([
      ManagedAccount.query().where('slug', slug).limit(1),
      AccountSnapshot.query(),
      ProjectSnapshot.query(),
      CheckinSnapshot.query(),
    ])

    const account = accounts[0]
    if (!account) {
      throw new AppException('La cuenta solicitada no existe.', 404, 'ACCOUNT_NOT_FOUND')
    }

    const snapshotMap = new Map(snapshots.map((snapshot) => [snapshot.managedAccountId, snapshot]))
    const checkinMap = new Map(checkins.map((checkin) => [checkin.managedAccountId, checkin]))
    const projectMap = new Map<number, ProjectSnapshot[]>()

    for (const project of projects) {
      const list = projectMap.get(project.managedAccountId) ?? []
      list.push(project)
      projectMap.set(project.managedAccountId, list)
    }

    const accountDto = this.serializeAccount(account, snapshotMap, projectMap, checkinMap)
    const accountProjects = (projectMap.get(account.id) ?? []).map((project) =>
      this.serializeProject(project, accountDto)
    )
    const checkinDto = this.serializeCheckin(
      accountDto,
      checkinMap.get(account.id),
      snapshotMap.get(account.id)
    )

    return {
      account: accountDto,
      profile: (snapshotMap.get(account.id)?.payload ?? {}) as Record<string, unknown>,
      projects: accountProjects,
      checkin: checkinDto,
    }
  }

  async listProjects(): Promise<ProjectCardDto[]> {
    const [accounts, snapshots, projects] = await Promise.all([
      ManagedAccount.query(),
      AccountSnapshot.query(),
      ProjectSnapshot.query().orderBy('updatedAt', 'desc'),
    ])

    const accountMap = new Map(accounts.map((account) => [account.id, account]))
    const snapshotMap = new Map(snapshots.map((snapshot) => [snapshot.managedAccountId, snapshot]))

    return projects
      .map((project) => {
        const account = accountMap.get(project.managedAccountId)
        if (!account) {
          return null
        }

        const accountDto = this.serializeAccount(
          account,
          snapshotMap,
          new Map(),
          new Map()
        )
        return this.serializeProject(project, accountDto)
      })
      .filter((item): item is ProjectCardDto => item !== null)
  }

  async listCheckins(): Promise<CheckinCardDto[]> {
    const [accounts, snapshots, checkins] = await Promise.all([
      ManagedAccount.query().orderBy('createdAt', 'desc'),
      AccountSnapshot.query(),
      CheckinSnapshot.query(),
    ])

    const snapshotMap = new Map(snapshots.map((snapshot) => [snapshot.managedAccountId, snapshot]))
    const checkinMap = new Map(checkins.map((checkin) => [checkin.managedAccountId, checkin]))

    return accounts.map((account) => {
      const accountDto = this.serializeAccount(account, snapshotMap, new Map(), checkinMap)
      return this.serializeCheckin(accountDto, checkinMap.get(account.id), snapshotMap.get(account.id))
    })
  }

  async listNotifications(limit = 80): Promise<NotificationDto[]> {
    const notifications = await Notification.query().orderBy('createdAt', 'desc').limit(limit)

    return notifications.map((notification) => ({
      id: notification.id,
      level: notification.level,
      scope: notification.scope,
      title: notification.title,
      message: notification.message,
      accountSlug: notification.accountSlug,
      createdAt: notification.createdAt.toISO() ?? '',
      meta: notification.meta ?? {},
    }))
  }

  private serializeAccount(
    account: ManagedAccount,
    snapshotMap: Map<number, AccountSnapshot>,
    projectMap: Map<number, ProjectSnapshot[]>,
    checkinMap: Map<number, CheckinSnapshot>
  ): AccountListItemDto {
    const snapshot = snapshotMap.get(account.id)
    const projects = projectMap.get(account.id) ?? []
    const checkin = checkinMap.get(account.id)

    return {
      slug: account.slug,
      account: account.account,
      containerCode: account.containerCode,
      status: account.status,
      tokenStatus: account.tokenStatus,
      availableBalanceMxn: toNumber(snapshot?.availableBalance),
      totalProfitMxn: toNumber(snapshot?.totalProfit),
      todayProfitMxn: toNumber(snapshot?.todayProfit),
      activeProjects: projects.filter((project) => project.runStatus === 1).length,
      pendingReceives: projects.filter((project) => project.runStatus === 1 && !project.isReceive).length,
      continueDays: checkin?.continueDays ?? 0,
      canCheckin: checkin?.canCheckin ?? false,
      lastError: account.lastError,
      lastSyncedAt: account.lastSyncedAt?.toISO() ?? null,
    }
  }

  private serializeProject(project: ProjectSnapshot, account: AccountListItemDto): ProjectCardDto {
    const payload = (project.payload ?? {}) as Record<string, unknown>
    const currentUnix = nowUnix()
    const payloadRemainingSeconds = Math.max(0, Math.floor(Number(payload.time_remaining || 0)))
    const projectRemainingSeconds = Math.max(0, project.endTime - currentUnix)
    const payoutRemainingSeconds =
      projectRemainingSeconds <= 0
        ? 0
        : project.isReceive
          ? Math.max(
              payloadRemainingSeconds,
              remainingFromReceiveTime(project.receiveTime, currentUnix)
            )
          : payloadRemainingSeconds
    const canReceive = project.runStatus === 1 && !project.isReceive
    const paymentStatus: ProjectCardDto['paymentStatus'] = canReceive
      ? 'available'
      : projectRemainingSeconds <= 0
        ? 'completed'
        : project.isReceive
          ? 'received'
          : 'pending'

    return {
      id: project.id,
      accountSlug: account.slug,
      account: account.account,
      containerCode: account.containerCode,
      name: project.projectName,
      buyTime: payload.buy_time ? Number(payload.buy_time) : null,
      priceMxn: toNumber(project.payAmount),
      dailyProfitMxn: toNumber(project.dailyProfit),
      totalIncomeMxn: toNumber(project.totalIncome),
      totalRevenueMxn: toNumber(project.totalRevenue),
      availableBalanceMxn: account.availableBalanceMxn,
      periodDays: project.periodDays,
      sendNums: Number(payload.send_nums || 0),
      endTime: project.endTime,
      receiveTime: project.receiveTime,
      payoutRemainingSeconds,
      payoutRemainingLabel: formatRemainingHms(payoutRemainingSeconds),
      projectRemainingSeconds,
      projectRemainingLabel: formatRemainingHms(projectRemainingSeconds),
      canReceive,
      isReceived: project.isReceive,
      paymentStatus,
      extraFlag: project.extraFlag,
      descriptionHtml: project.descriptionHtml,
      iconUrl: project.iconUrl,
    }
  }

  private serializeCheckin(
    account: AccountListItemDto,
    checkin: CheckinSnapshot | undefined,
    snapshot: AccountSnapshot | undefined
  ): CheckinCardDto {
    return {
      accountSlug: account.slug,
      account: account.account,
      availableBalanceMxn: toNumber(snapshot?.availableBalance),
      totalRevenueMxn: toNumber(checkin?.totalRevenue),
      continueDays: checkin?.continueDays ?? 0,
      canCheckin: checkin?.canCheckin ?? false,
      currentDay: checkin?.currentDay ?? null,
      todayFlag: checkin?.todayFlag ?? null,
      calendar: checkin?.calendar ?? [],
      rewards: checkin?.rewards ?? [],
    }
  }
}
