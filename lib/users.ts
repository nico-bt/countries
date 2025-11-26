import prisma from "./prisma"

export async function createUser({ name, email }: { name: string; email: string }) {
  return prisma.user.create({
    data: { email, name },
  })
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } })
}
