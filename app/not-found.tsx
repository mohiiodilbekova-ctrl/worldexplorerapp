import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-8xl mb-6">404</div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Sahifa topilmadi
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
        Qidirgan sahifa mavjud emas yoki olib tashlangan. Bosh sahifaga qayting.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  )
}
