import { Suspense } from "react"
import { getAllCountries } from "@/lib/api"
import CountriesClient from "@/components/CountriesClient"
import Loading from "@/components/Loading"

export default async function HomePage() {
  const countries = await getAllCountries()

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            World<span className="text-[#D4AF37]">Explorer</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {countries.length} ta davlat ma'lumoti
          </p>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
        </div>

        <Suspense fallback={<Loading count={12} />}>
          <CountriesClient countries={countries} />
        </Suspense>
      </div>
    </div>
  )
}