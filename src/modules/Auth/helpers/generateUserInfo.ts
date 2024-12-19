export const generateUserInfo = (id: string, email: string) => ({
  id,
  email,
})

export type ShortUserInfo = Awaited<ReturnType<typeof generateUserInfo>>
