export default function Loading({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 animate-pulse"
        >
          <div className="h-48 bg-gray-300 dark:bg-gray-700" />
          <div className="p-4 space-y-3">
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3" />
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}
