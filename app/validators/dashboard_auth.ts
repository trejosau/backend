import vine from '@vinejs/vine'

export const dashboardLoginValidator = vine.create({
  username: vine.string().trim().minLength(2).maxLength(80),
  password: vine.string().trim().minLength(6).maxLength(255),
})
