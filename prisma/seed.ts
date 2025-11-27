import { PrismaClient, Prisma } from "../app/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
})

const URL = "https://restcountries.com/v3.1/all?fields=cca3,flags,name,capital,region,subregion"

async function main() {
  console.log("Fetching countries…")

  const res = await fetch(URL)
  const data = await res.json()

  console.log(`Fetched ${data.length} countries, seeding…`)

  for (const element of data) {
    await prisma.country.create({
      data: {
        name: element.name.common,
        code: element.cca3,
        capital: element.capital ? element.capital[0] : null,
        region: element.region,
        subregion: element.subregion,
        flagUrl: element.flags?.svg || null,
      },
    })
  }

  console.log("Seed completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
