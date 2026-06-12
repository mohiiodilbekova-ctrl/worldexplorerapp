"use client"

interface SortDropdownProps {
  value: string
  onChange: (val: string) => void
}

const sortOptions = [
  { value: "name-asc", label: "Alifbo (A-Z)" },
  { value: "name-desc", label: "Alifbo (Z-A)" },
  { value: "population-desc", label: "Aholi (ko'pdan kamga)" },
  { value: "population-asc", label: "Aholi (kamdan ko'pga)" },
  { value: "area-desc", label: "Maydon (kattadan kichikka)" },
  { value: "area-asc", label: "Maydon (kichikdan kattaga)" },
]

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
    >
      {sortOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
