import { HomeIcon } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-4xl mt-24">Not Found</h2>
      <p className="mt-2">Could not find requested resource</p>

      <Link
        href={"/"}
        className="flex gap-2 mt-12 font-bold text-lg text-center bg-red text-white tracking-wider border py-2 px-4 rounded-lg bg-red-700"
      >
        <HomeIcon /> Back Home
      </Link>
    </main>
  )
}
