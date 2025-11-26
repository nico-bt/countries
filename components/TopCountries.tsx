import { getTopTenCountries } from "@/lib/countries"
import { Work_Sans } from "next/font/google"

const workSans = Work_Sans({
  subsets: ["latin"],
})
async function TopCountries() {
  const countries = await getTopTenCountries()

  return (
    <div className="w-full overflow-x-auto bg-white px-4 rounded-lg card-shadow mb-24">
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
          {countries.map((country) => (
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
  )
}
export default TopCountries
