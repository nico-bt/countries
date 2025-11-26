import AddVoteForm from "@/components/AddVoteForm/AddVoteForm"
import { getAllCountries, getTopTenCountries } from "@/lib/countries"
import { Suspense } from "react"

export default async function Home() {
  const countries = await getAllCountries()

  return (
    <main className="flex w-full max-w-[1062px] mx-auto mt-10 flex-col p-4">
      <AddVoteForm countries={countries} />

      <h1>Top 10 Countries</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TopCountries />
      </Suspense>
    </main>
  )
}

async function TopCountries() {
  const countries = await getTopTenCountries()

  return (
    <div>
      {countries.map((country) => (
        <div key={country.id} className="flex gap-2 mb-2">
          <img src={country.flagUrl} alt={country.name} width={32} height={20} />
          <p>{country.name}</p>
          <p>Votes: {country.votesCount}</p>
        </div>
      ))}
    </div>
  )
}
