import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('dashboard_users', (table) => {
      table.increments('id').primary()
      table.string('username', 80).notNullable().unique()
      table.string('password_hash', 255).notNullable()
      table.string('role', 24).notNullable().defaultTo('user')
      table.boolean('active').notNullable().defaultTo(true)
      table.timestamp('last_login_at', { useTz: true }).nullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
      table.index(['role'])
      table.index(['active'])
    })
  }

  async down() {
    this.schema.dropTable('dashboard_users')
  }
}
