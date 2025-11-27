import AddVoteForm from "@/components/AddVoteForm/AddVoteForm"
import TopCountries from "@/components/TopCountries"
import { getAllCountries } from "@/lib/countries"
import { Suspense } from "react"

export default async function Home() {
  const countries = await getAllCountries()

  return (
    <main className="flex w-full max-w-[1062px] mx-auto mt-10 flex-col p-4">
      <AddVoteForm countries={countries} />

      <h1 className="font-bold text-[32px] mt-12 mb-6">Top 10 Most Voted Countries</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <TopCountries />
      </Suspense>
    </main>
  )
}
