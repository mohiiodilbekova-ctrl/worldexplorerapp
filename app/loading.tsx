import Loading from "@/components/Loading"

export default function HomeLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="h-10 w-72 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-2" />
      </div>
      <Loading count={12} />
    </div>
  )
}
