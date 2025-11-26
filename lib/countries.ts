import prisma from "./prisma"

export async function getAllCountries() {
  return prisma.country.findMany({ orderBy: { name: "asc" } })
}

export async function getTopTenCountries() {
  return prisma.country.findMany({
    orderBy: { votesCount: "desc" },
    take: 10,
  })
}
