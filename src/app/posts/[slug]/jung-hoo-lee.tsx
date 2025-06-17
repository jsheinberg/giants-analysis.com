import { notFound } from 'next/navigation'
import Link from 'next/link'
import Tabs from '@/components/Tabs'

interface PostPageProps {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  // This is where you would typically fetch the post data based on the slug
  // For now, we'll just show a sample post
  const slug = await Promise.resolve(params.slug)
  
  if (slug !== 'jung-hoo-lee') {
    notFound()
  }

  return (
    <article className="max-w-3xl mx-auto">
      <Link 
        href="/"
        className="inline-block mb-8 text-orange-600 hover:text-orange-700"
      >
        ← Back to Home
      </Link>
      </article>
  )
} 
