export interface OverviewDto {
  accountCount: number
  activeTokens: number
  inactiveTokens: number
  totalProfitMxn: number
  pendingReceives: number
  pendingCheckins: number
}

export interface AccountListItemDto {
  slug: string
  account: string
  containerCode: string | null
  status: string
  tokenStatus: string
  availableBalanceMxn: number
  totalProfitMxn: number
  todayProfitMxn: number
  activeProjects: number
  pendingReceives: number
  continueDays: number
  canCheckin: boolean
  lastError: string | null
  lastSyncedAt: string | null
}

export interface ProjectCardDto {
  id: number
  accountSlug: string
  account: string
  containerCode: string | null
  name: string
  priceMxn: number
  dailyProfitMxn: number
  totalIncomeMxn: number
  totalRevenueMxn: number
  availableBalanceMxn: number
  periodDays: number
  endTime: number
  receiveTime: number | null
  remainingSeconds: number
  remainingLabel: string
  canReceive: boolean
  isReceived: boolean
  extraFlag: number
  descriptionHtml: string | null
  iconUrl: string | null
}

export interface CheckinCardDto {
  accountSlug: string
  account: string
  availableBalanceMxn: number
  totalRevenueMxn: number
  continueDays: number
  canCheckin: boolean
  currentDay: number | null
  todayFlag: number | null
  calendar: Array<Record<string, unknown>>
  rewards: Array<Record<string, unknown>>
}

export interface NotificationDto {
  id: number
  level: string
  scope: string
  title: string
  message: string
  accountSlug: string | null
  createdAt: string
  meta: Record<string, unknown>
}

export interface AccountDetailDto {
  account: AccountListItemDto
  profile: Record<string, unknown>
  projects: ProjectCardDto[]
  checkin: CheckinCardDto
}
