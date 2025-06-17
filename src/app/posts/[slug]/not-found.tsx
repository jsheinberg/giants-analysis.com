import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="text-center py-16">
      <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
      <p className="text-gray-600 mb-8">
        Sorry, we couldn't find the analysis post you're looking for.
      </p>
      <Link
        href="/"
        className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
} 