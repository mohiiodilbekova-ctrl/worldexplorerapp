"use client"

import { useFavorites } from "@/hooks/useFavorites"

interface FavoriteButtonProps {
  cca3: string
  countryName: string
}

export default function FavoriteButton({ cca3, countryName }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, ready } = useFavorites()
  const fav = isFavorite(cca3)

  if (!ready) {
    return (
      <button
        disabled
        className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
      >
        <span className="text-xl">🤍</span>
        <span>Yuklanmoqda...</span>
      </button>
    )
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(cca3)
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 cursor-pointer select-none ${
        fav
          ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
      }`}
      aria-label={
        fav
          ? `${countryName} sevimlilardan olib tashlash`
          : `${countryName} sevimlilarga qo'shish`
      }
    >
      <span
        className={`text-xl transition-all duration-300 ${
          fav ? "scale-110" : "scale-100"
        }`}
      >
        {fav ? "❤️" : "🤍"}
      </span>
      <span>{fav ? "Sevimli" : "Sevimliga qo'shish"}</span>
    </button>
  )
}
