import AddVoteForm from "@/components/AddVoteForm/AddVoteForm"
import { getAllCountries, getTopTenCountries } from "@/lib/countries"
import { Suspense } from "react"

export default async function Home() {
  const countries = await getAllCountries()

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <AddVoteForm countries={countries} />

        <h1>Top 10 Countries</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <TopCountries />
        </Suspense>
      </main>
    </div>
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
