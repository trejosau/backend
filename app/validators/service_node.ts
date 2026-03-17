import vine from '@vinejs/vine'

export const upsertServiceNodeValidator = vine.create({
  code: vine.string().trim().minLength(2).maxLength(120),
  name: vine.string().trim().minLength(2).maxLength(180),
  baseUrl: vine.string().trim().maxLength(255),
  maxAccounts: vine.number().min(1).max(1000),
  allocationOrder: vine.number().min(1).max(1000000),
  enabled: vine.boolean().optional(),
})

export const bootstrapRailwayNodesValidator = vine.create({
  start: vine.number().min(1).max(1000000),
  end: vine.number().min(1).max(1000000),
  codePrefix: vine.string().trim().maxLength(120).optional(),
  namePrefix: vine.string().trim().maxLength(180).optional(),
  hostPrefix: vine.string().trim().maxLength(120).optional(),
  hostSuffix: vine.string().trim().maxLength(180).optional(),
  protocol: vine.enum(['http', 'https'] as const).optional(),
  port: vine.number().min(1).max(65535).optional(),
  maxAccounts: vine.number().min(1).max(1000).optional(),
})
