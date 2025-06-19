import { notFound } from 'next/navigation'
import Link from 'next/link'
import Tabs from '@/components/Tabs'
import { posts } from '../postsData'

export default function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const post = posts[slug];
  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto">
      <Link href="/" className="inline-block mb-8 text-orange-600 hover:text-orange-700">
        ← Back to Home
      </Link>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-600">
          <time>{post.date}</time>
        </div>
      </header>
      <Tabs labels={['Analysis', 'Code']}>
        <div className="prose prose-lg max-w-none">{post.content}</div>
        <div className="prose prose-lg max-w-none">{post.code}</div>
      </Tabs>
    </article>
  );
}