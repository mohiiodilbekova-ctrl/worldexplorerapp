"use client"

interface RegionFilterProps {
  selected: string
  onChange: (region: string) => void
}

const regions = [
  { value: "", label: "Barchasi" },
  { value: "Africa", label: "Africa" },
  { value: "Americas", label: "Americas" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Oceania", label: "Oceania" },
]

export default function RegionFilter({ selected, onChange }: RegionFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {regions.map((region) => (
        <button
          key={region.value}
          onClick={() => onChange(region.value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
            selected === region.value
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {region.label}
        </button>
      ))}
    </div>
  )
}
