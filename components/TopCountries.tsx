import { getTopTenCountries } from "@/lib/countries"
import FilteredTopCountries from "./FilteredTopCountries"

async function TopCountries() {
  const countries = await getTopTenCountries()

  return <FilteredTopCountries countries={countries} />
}
export default TopCountries
