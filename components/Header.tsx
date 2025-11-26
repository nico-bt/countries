import { Montserrat } from "next/font/google"
import logo from "@/app/icon.png"
import Image from "next/image"
const montserrat = Montserrat({ subsets: ["latin"] })

function Header() {
  return (
    <header className="flex gap-2 items-center mt-4 p-4">
      <div className="flex items-center gap-2">
        <Image src={logo} alt="Loopstudio logo" height={42} />
        <p className="text-lg font-semibold">loopstudio</p>
      </div>
      <p className="w-0.5 h-6 bg-[#939599] inline-block"></p>
      <p className={`text-sm font-semibold ${montserrat.className}`}>
        Frontend Developer Challenge
      </p>
    </header>
  )
}

export default Header
