import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('service_nodes', (table) => {
      table.integer('allocation_order').notNullable().defaultTo(999999)
      table.boolean('enabled').notNullable().defaultTo(true)
      table.index(['allocation_order'])
      table.index(['enabled'])
    })
  }

  async down() {
    this.schema.alterTable('service_nodes', (table) => {
      table.dropIndex(['enabled'])
      table.dropIndex(['allocation_order'])
      table.dropColumn('enabled')
      table.dropColumn('allocation_order')
    })
  }
}
