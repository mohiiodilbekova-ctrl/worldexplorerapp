"use client"

import { useState, useEffect } from "react"
import { useFavorites } from "@/hooks/useFavorites"
import CountryCard from "@/components/CountryCard"
import Loading from "@/components/Loading"
import ErrorMessage from "@/components/ErrorMessage"
import type { Country } from "@/types"

export default function FavoritesPage() {
  const { favorites, clearAll } = useFavorites()
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true)
      setError(null)
      try {
        if (favorites.length === 0) {
          setCountries([])
          setLoading(false)
          return
        }
        const res = await fetch(`/api/countries?codes=${favorites.join(",")}`)
        if (!res.ok) throw new Error("Ma'lumotlarni yuklashda xatolik")
        const data: Country[] = await res.json()
        setCountries(data)
      } catch {
        setError("Sevimli davlatlarni yuklashda xatolik yuz berdi")
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [favorites])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            ❤️ Sevimli Davlatlar
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {favorites.length} ta sevimli davlat
          </p>
        </div>
        {favorites.length > 0 && (
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl font-medium transition-colors cursor-pointer"
          >
            Hammasini tozalash
          </button>
        )}
      </div>

      {loading && <Loading count={4} />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && favorites.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-6xl mb-6">❤️</span>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Hali sevimli davlat qo&apos;shilmagan
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Davlatlar sahifasidan davlatlarni sevimliga qo&apos;shing
          </p>
          <a
            href="/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
          >
            Davlatlarni ko&apos;rish
          </a>
        </div>
      )}

      {!loading && !error && countries.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {countries.map((country) => (
            <CountryCard key={country.alpha3Code} country={country} />
          ))}
        </div>
      )}
    </div>
  )
}
