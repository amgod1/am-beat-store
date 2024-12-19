export const getUserNameFromEmail = (email: string) => {
  const [username] = email.split("@")
  return username || ""
}
