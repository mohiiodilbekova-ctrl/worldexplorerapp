"use client"

import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY = "world-explorer-favorites"

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setFavorites(parsed)
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
      } catch {
        // localStorage to'la bo'lishi mumkin
      }
    }
  }, [favorites, ready])

  const toggleFavorite = useCallback((cca3: string) => {
    setFavorites((prev) => {
      if (prev.includes(cca3)) {
        return prev.filter((c) => c !== cca3)
      }
      return [...prev, cca3]
    })
  }, [])

  const isFavorite = useCallback(
    (cca3: string): boolean => {
      return favorites.includes(cca3)
    },
    [favorites]
  )

  const clearAll = useCallback(() => {
    setFavorites([])
  }, [])

  return { favorites, toggleFavorite, isFavorite, clearAll, ready }
}
