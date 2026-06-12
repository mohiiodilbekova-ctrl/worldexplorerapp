export function formatPopulation(num: number): string {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)} mlrd`
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)} mln`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)} ming`
  return num.toLocaleString("uz-UZ")
}

export function formatNumber(num: number): string {
  return num.toLocaleString("uz-UZ")
}

export function formatArea(area: number): string {
  return `${formatNumber(area)} km²`
}
