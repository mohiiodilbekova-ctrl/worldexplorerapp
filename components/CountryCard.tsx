import Link from "next/link"
import Image from "next/image"
import type { Country } from "@/types"
import { formatPopulation } from "@/utils/formatters"

interface CountryCardProps {
  country: Country
  priority?: boolean
}

function getFlagUrl(code: string): string {
  return `https://flagcdn.com/w320/${code.toLowerCase()}.png`
}

export default function CountryCard({ country, priority }: CountryCardProps) {
  return (
    <Link
      href={`/country/${country.alpha3Code}`}
      className="group block rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-gray-900">
        <Image
          src={getFlagUrl(country.alpha2Code)}
          alt={country.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading={priority ? "eager" : "lazy"}
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
          {country.name}
        </h3>
        {country.capital && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {country.capital}
          </p>
        )}
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs font-medium text-[#D4AF37] uppercase tracking-wide">
            {country.region}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatPopulation(country.population)}
          </span>
        </div>
      </div>
    </Link>
  )
}