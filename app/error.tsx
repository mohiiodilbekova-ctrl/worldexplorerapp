"use client"

import ErrorMessage from "@/components/ErrorMessage"

export default function HomeError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <ErrorMessage
        message={error.message || "Ma'lumotlarni yuklashda xatolik yuz berdi"}
        onRetry={reset}
      />
    </div>
  )
}
