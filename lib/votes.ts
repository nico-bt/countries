import prisma from "./prisma"

export async function createVote({ userId, countryId }: { userId: number; countryId: number }) {
  await prisma.$transaction([
    // Cretate the vote record for audit purposes
    prisma.vote.create({ data: { userId, countryId } }),

    // Increment the denormalized votes count on the country
    prisma.country.update({
      where: { id: countryId },
      data: { votesCount: { increment: 1 } },
    }),
  ])

  return { success: true }
}
