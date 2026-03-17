import vine from '@vinejs/vine'

export const addAccountValidator = vine.create({
  account: vine.string().trim().minLength(5).maxLength(64),
  pwd: vine.string().trim().minLength(3).maxLength(255),
  containerCode: vine.string().trim().maxLength(120).optional(),
})
