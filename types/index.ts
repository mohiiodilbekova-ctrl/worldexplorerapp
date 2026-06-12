export interface CountryFlag {
  png: string
  svg: string
}

export interface CountryCurrency {
  code: string
  name: string
  symbol: string
}

export interface CountryLanguage {
  iso639_1?: string
  iso639_2: string
  name: string
  nativeName?: string
}

export interface RegionalBloc {
  acronym: string
  name: string
}

export interface Country {
  name: string
  topLevelDomain: string[]
  alpha2Code: string
  alpha3Code: string
  callingCodes: string[]
  capital: string
  altSpellings: string[]
  subregion: string
  region: string
  population: number
  latlng: number[]
  demonym: string
  area: number
  timezones: string[]
  borders: string[]
  nativeName: string
  numericCode: string
  flags: CountryFlag
  currencies: CountryCurrency[]
  languages: CountryLanguage[]
  translations: Record<string, string>
  flag: string
  regionalBlocs: RegionalBloc[]
  cioc: string
  independent: boolean
}
