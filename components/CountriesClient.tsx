"use client"

import { useState, useMemo, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import type { Country } from "@/types"
import CountryCard from "./CountryCard"
import SearchBar from "./SearchBar"
import RegionFilter from "./RegionFilter"
import SortDropdown from "./SortDropdown"
import { useDebounce } from "@/hooks/useDebounce"

interface CountriesClientProps {
  countries: Country[]
}

export default function CountriesClient({ countries }: CountriesClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [selectedRegion, setSelectedRegion] = useState(
    searchParams.get("region") || ""
  )
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "name-asc")

  const debouncedQuery = useDebounce(searchQuery, 300)

  const updateURL = useCallback(
    (q: string, region: string, sort: string) => {
      const params = new URLSearchParams()
      if (q) params.set("q", q)
      if (region) params.set("region", region)
      if (sort && sort !== "name-asc") params.set("sort", sort)
      const query = params.toString()
      router.replace(query ? `/?${query}` : "/", { scroll: false })
    },
    [router]
  )

  const handleSearchChange = useCallback(
    (val: string) => {
      setSearchQuery(val)
      updateURL(val, selectedRegion, sortBy)
    },
    [selectedRegion, sortBy, updateURL]
  )

  const handleRegionChange = useCallback(
    (region: string) => {
      setSelectedRegion(region)
      updateURL(searchQuery, region, sortBy)
    },
    [searchQuery, sortBy, updateURL]
  )

  const handleSortChange = useCallback(
    (sort: string) => {
      setSortBy(sort)
      updateURL(searchQuery, selectedRegion, sort)
    },
    [searchQuery, selectedRegion, updateURL]
  )

  const handleClearFilters = useCallback(() => {
    setSearchQuery("")
    setSelectedRegion("")
    setSortBy("name-asc")
    router.replace("/", { scroll: false })
  }, [router])

  const filteredCountries = useMemo(() => {
    let result = [...countries]

    if (selectedRegion) {
      result = result.filter((c) => c.region === selectedRegion)
    }

    if (debouncedQuery) {
      const query = debouncedQuery.toLowerCase()
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.nativeName?.toLowerCase().includes(query) ||
          c.capital?.toLowerCase().includes(query) ||
          c.altSpellings?.some((s) => s.toLowerCase().includes(query))
      )
    }

    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "population-desc":
        result.sort((a, b) => b.population - a.population)
        break
      case "population-asc":
        result.sort((a, b) => a.population - b.population)
        break
      case "area-desc":
        result.sort((a, b) => b.area - a.area)
        break
      case "area-asc":
        result.sort((a, b) => a.area - b.area)
        break
    }

    return result
  }, [countries, selectedRegion, debouncedQuery, sortBy])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
        <SortDropdown value={sortBy} onChange={handleSortChange} />
      </div>

      <RegionFilter selected={selectedRegion} onChange={handleRegionChange} />

      {filteredCountries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl mb-4">🔍</span>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            Davlat topilmadi
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer"
          >
            Filtrlarni tozalash
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredCountries.length} ta davlat topildi
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCountries.map((country, i) => (
              <CountryCard key={country.alpha3Code} country={country} priority={i < 4} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
