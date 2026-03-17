import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class DashboardUser extends BaseModel {
  static table = 'dashboard_users'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column({ columnName: 'password_hash', serializeAs: null })
  declare passwordHash: string

  @column()
  declare role: 'admin' | 'user'

  @column()
  declare active: boolean

  @column.dateTime()
  declare lastLoginAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
