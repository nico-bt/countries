import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast"
import Header from "@/components/Header"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Loop Country",
  description: "Vote for your favorite country",
  keywords: ["loopstudio", "voting", "countries"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased max-w-[1440px] mx-auto`}>
        <Header />
        {children}

        <Toaster position="top-center" />
      </body>
    </html>
  )
}
