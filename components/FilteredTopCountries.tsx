"use client"

import { Country } from "@/app/generated/prisma"
import { Work_Sans } from "next/font/google"
import { useMemo, useState } from "react"
import Searchbar from "./Searchbar"

const workSans = Work_Sans({
  subsets: ["latin"],
})

function FilteredTopCountries({ countries }: { countries: Country[] }) {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()

    if (!q) return countries

    return countries.filter((c) => {
      const name = c.name?.toLowerCase() || ""
      const capital = c.capital?.toLowerCase() || ""
      const region = c.region?.toLowerCase() || ""
      const subregion = c.subregion?.toLowerCase() || ""

      return name.includes(q) || capital.includes(q) || region.includes(q) || subregion.includes(q)
    })
  }, [search, countries])

  return (
    <>
      <Searchbar setSearch={setSearch} search={search} />

      <div className="w-full overflow-x-auto bg-white px-4 rounded-lg card-shadow mb-24 min-h-[580px]">
        <table className="min-w-[700px] w-full border-separate border-spacing-y-6.5">
          <thead>
            <tr className={`${workSans.className} text-sm font-bold text-left`}>
              <th>Country</th>
              <th>Capital City</th>
              <th>Region</th>
              <th>Sub Region</th>
              <th>Votes</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="py-10 text-center text-muted-foreground">
                  No countries found
                </td>
              </tr>
            )}

            {filtered.map((country) => (
              <tr key={country.id} className="text-[16px] font-medium">
                <td className="flex items-center gap-3 min-w-[180px]">
                  <img
                    src={country.flagUrl}
                    alt={country.name}
                    className="w-8 h-5 rounded-sm object-cover"
                  />
                  <span className="truncate">{country.name}</span>
                </td>

                <td className="min-w-40 truncate">{country.capital}</td>

                <td className="min-w-[130px] truncate">{country.region}</td>

                <td className="min-w-40 truncate">{country.subregion}</td>

                <td>{country.votesCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default FilteredTopCountries
