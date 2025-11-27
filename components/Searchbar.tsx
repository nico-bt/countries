import { SearchIcon, XIcon } from "lucide-react"
import { useState, ChangeEvent, MouseEvent } from "react"
import { useDebouncedCallback } from "use-debounce"

function Searchbar({ search, setSearch }: { search: string; setSearch: (query: string) => void }) {
  const WAITING_TIME_DEBOUNCE = 300

  const [searchInput, setSearchInput] = useState("")

  const debouncedUpdate = useDebouncedCallback((value: string) => {
    setSearch(value)
  }, WAITING_TIME_DEBOUNCE)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
    debouncedUpdate(e.target.value)
  }

  const handleClose = (e: MouseEvent<SVGSVGElement>) => {
    setSearchInput("")
    setSearch("")
  }

  return (
    <div className="relative max-w-[417px] mb-6">
      <input
        className="w-full peer bg-white p-2 pl-10 border-2 text-gray-500 focus:text-black focus:outline-none h-11"
        type="text"
        name="query"
        id="query"
        placeholder="Search Country, Capital City, Region or Subregion"
        autoComplete="off"
        onChange={handleChange}
        value={searchInput}
      />

      {/* Icons: Magnifying Glass and Close search */}
      <SearchIcon className="absolute left-4 top-3.5 opacity-50 peer-focus:opacity-100 text-black w-4.5 h-4.5" />

      {search && (
        <XIcon
          onClick={handleClose}
          className="absolute right-4 top-3 cursor-pointer hover:bg-slate-600 hover:text-white text-black h-4.5 w-4.5"
        />
      )}
    </div>
  )
}

export default Searchbar
