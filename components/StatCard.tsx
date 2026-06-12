interface StatCardProps {
  icon: string
  label: string
  value: string
}

export default function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
      <span className="text-2xl shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {label}
        </p>
        <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
          {value}
        </p>
      </div>
    </div>
  )
}
