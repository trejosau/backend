import vine from '@vinejs/vine'

export const createDashboardUserValidator = vine.create({
  username: vine.string().trim().minLength(2).maxLength(80),
  password: vine.string().trim().minLength(6).maxLength(255),
})

export const updateDashboardPasswordValidator = vine.create({
  password: vine.string().trim().minLength(6).maxLength(255),
})

export const updateDashboardAccessValidator = vine.create({
  active: vine.boolean(),
})
