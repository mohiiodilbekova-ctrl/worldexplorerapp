import type { Country } from "@/types"

const BASE_URL = "https://www.apicountries.com"

async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) {
    throw new Error(`API xatosi: ${res.status} ${res.statusText}`)
  }
  const data = (await res.json()) as T
  return data
}

let cachedAllCountries: Country[] | null = null

export async function getAllCountries(): Promise<Country[]> {
  if (cachedAllCountries) return cachedAllCountries
  try {
    const data = await fetchData<Country[]>(`${BASE_URL}/countries`)
    if (!Array.isArray(data)) {
      throw new Error("API noto'g'ri ma'lumot qaytardi")
    }
    cachedAllCountries = data.sort((a, b) => a.name.localeCompare(b.name))
    return cachedAllCountries
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Davlatlarni yuklashda xatolik yuz berdi"
    )
  }
}

export async function getCountryByCode(code: string): Promise<Country> {
  const all = await getAllCountries()
  const country = all.find(
    (c) => c.alpha3Code === code || c.alpha2Code === code
  )
  if (!country) {
    throw new Error("Davlat topilmadi")
  }
  return country
}

export async function searchCountries(name: string): Promise<Country[]> {
  try {
    const data = await fetchData<Country[]>(
      `${BASE_URL}/countries/name/${encodeURIComponent(name.toLowerCase())}`
    )
    if (!Array.isArray(data)) return []
    return data.sort((a, b) => a.name.localeCompare(b.name))
  } catch {
    return []
  }
}

export async function getCountriesByCodes(codes: string[]): Promise<Country[]> {
  const all = await getAllCountries()
  return all.filter((c) => codes.includes(c.alpha3Code))
}
