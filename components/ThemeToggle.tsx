"use client"

import { useState, useEffect } from "react"

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  // Sahifa yuklanganda oldingi tanlangan rejimni tiklash
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark"
    setDark(isDark)
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggle = () => {
    const nextDark = !dark
    setDark(nextDark)
    
    if (nextDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "gold")
    }
  }

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg text-2xl hover:scale-105 active:scale-95 transition-transform cursor-pointer bg-black/5 dark:bg-white/10 backdrop-blur-sm"
      aria-label={dark ? "Sariq rejim" : "Qora rejim"}
    >
      {dark ? "✨" : "🌙"}
    </button>
  )
}