import Notification from '#models/notification'

interface NotifyInput {
  level: string
  scope: string
  title: string
  message: string
  accountSlug?: string | null
  meta?: Record<string, unknown>
}

export class NotificationService {
  async push(input: NotifyInput) {
    await Notification.create({
      level: input.level,
      scope: input.scope,
      title: input.title,
      message: input.message,
      accountSlug: input.accountSlug ?? null,
      meta: input.meta ?? {},
    })
  }
}
