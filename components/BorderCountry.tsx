import Link from "next/link"

interface BorderCountryProps {
  code: string
  name: string
}

export default function BorderCountry({ code, name }: BorderCountryProps) {
  return (
    <Link
      href={`/country/${code}`}
      className="inline-block px-3 py-1 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-all border border-gray-200 dark:border-gray-700"
    >
      {name}
    </Link>
  )
}
