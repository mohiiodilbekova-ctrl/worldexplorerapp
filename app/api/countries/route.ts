import { getAllCountries, getCountryByCode } from "@/lib/api"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const codes = searchParams.get("codes")

  try {
    if (codes) {
      const codeList = codes.split(",")
      const all = await getAllCountries()
      const filtered = all.filter((c) => codeList.includes(c.alpha3Code))
      return NextResponse.json(filtered)
    }

    const code = searchParams.get("code")
    if (code) {
      const country = await getCountryByCode(code)
      return NextResponse.json(country)
    }

    const countries = await getAllCountries()
    return NextResponse.json(countries)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Xatolik yuz berdi" },
      { status: 500 }
    )
  }
}
