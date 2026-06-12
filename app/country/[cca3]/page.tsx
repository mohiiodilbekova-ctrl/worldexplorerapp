import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getCountryByCode, getCountriesByCodes } from "@/lib/api"
import { formatPopulation, formatArea } from "@/utils/formatters"
import FavoriteButton from "@/components/FavoriteButton"

interface Props {
  params: Promise<{ cca3: string }>
}

function getFlagUrl(alpha2: string): string {
  return `https://flagcdn.com/w640/${alpha2.toLowerCase()}.png`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { cca3 } = await params
    const country = await getCountryByCode(cca3)
    return {
      title: `${country.name}`,
      description: `${country.name} haqida ma'lumot`,
    }
  } catch {
    return { title: "Davlat topilmadi" }
  }
}

export default async function CountryDetailPage({ params }: Props) {
  const { cca3 } = await params

  let country
  try {
    country = await getCountryByCode(cca3)
  } catch {
    notFound()
  }

  const languages = country.languages?.map((l) => l.name).join(", ") || "Noma'lum"
  const currencies = country.currencies?.map((c) => `${c.name} (${c.symbol})`).join(", ") || "Noma'lum"
  const tld = country.topLevelDomain?.join(", ") || "Noma'lum"

  let borderCountries: { code: string; name: string }[] = []
  if (country.borders?.length) {
    const borderData = await getCountriesByCodes(country.borders)
    borderCountries = borderData.map((c) => ({ code: c.alpha3Code, name: c.name }))
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors mb-6"
        >
          ← Orqaga
        </Link>

        {/* Flag + Title row */}
        <div className="border-2 border-black dark:border-[#D4AF37] bg-white dark:bg-black overflow-hidden mb-6">
          <div className="relative h-56 sm:h-64 md:h-72 w-full">
            <Image
              src={getFlagUrl(country.alpha2Code)}
              alt={country.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {country.name}
              </h1>
              {country.nativeName && (
                <p className="text-[#D4AF37] text-lg mt-1">{country.nativeName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left column */}
          <div className="space-y-4">
            <div className="border-2 border-black dark:border-[#D4AF37] bg-white dark:bg-black p-5">
              <p className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold mb-1">POYTAXT</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">{country.capital || "Noma'lum"}</p>
            </div>

            <div className="border-2 border-black dark:border-[#D4AF37] bg-white dark:bg-black p-5">
              <p className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold mb-1">REGION</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">{country.region}</p>
              {country.subregion && (
                <p className="text-gray-500 dark:text-gray-400 mt-1">{country.subregion}</p>
              )}
            </div>

            <div className="border-2 border-black dark:border-[#D4AF37] bg-white dark:bg-black p-5">
              <p className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold mb-1">MAYDON</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">{formatArea(country.area)}</p>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <div className="border-2 border-black dark:border-[#D4AF37] bg-white dark:bg-black p-5">
              <p className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold mb-1">AHOLI</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">{formatPopulation(country.population)}</p>
            </div>

            <div className="border-2 border-black dark:border-[#D4AF37] bg-white dark:bg-black p-5">
              <p className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold mb-1">TILLAR</p>
              <p className="text-base text-gray-900 dark:text-white">{languages}</p>
            </div>

            <div className="border-2 border-black dark:border-[#D4AF37] bg-white dark:bg-black p-5">
              <p className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold mb-1">VALYUTALAR</p>
              <p className="text-base text-gray-900 dark:text-white">{currencies}</p>
            </div>
          </div>
        </div>

        {/* Bottom info row - 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="border-2 border-black dark:border-[#D4AF37] bg-white dark:bg-black p-4">
            <p className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold">TLD</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{tld}</p>
          </div>
          <div className="border-2 border-black dark:border-[#D4AF37] bg-white dark:bg-black p-4">
            <p className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold">TELEFON KODI</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{country.callingCodes?.join(", ") || "Noma'lum"}</p>
          </div>
          <div className="border-2 border-black dark:border-[#D4AF37] bg-white dark:bg-black p-4">
            <p className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold">VAQT MINTAQASI</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{country.timezones?.[0] || "Noma'lum"}</p>
          </div>
        </div>

        {/* Favorite Button */}
        <div className="mt-6 flex justify-end">
          <FavoriteButton cca3={country.alpha3Code} countryName={country.name} />
        </div>

        {/* Border Countries */}
        {borderCountries.length > 0 && (
          <div className="mt-8 border-2 border-black dark:border-[#D4AF37] bg-white dark:bg-black p-6">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-[#D4AF37] text-lg">✦</span> Chegaradosh davlatlar
            </h2>
            <div className="flex flex-wrap gap-3">
              {borderCountries.map((bc) => (
                <Link
                  key={bc.code}
                  href={`/country/${bc.code}`}
                  className="px-5 py-2 border-2 border-black dark:border-[#D4AF37] bg-white dark:bg-black text-gray-900 dark:text-white text-sm font-medium hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-300"
                >
                  {bc.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}