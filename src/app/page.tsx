import { posts } from './posts/postsData';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gray-50 rounded-lg">
        <h1 className="text-4xl font-bold mb-4 text-black">Welcome to Giants Analysis</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Data-driven insights and analysis about the San Francisco Giants
        </p>
      </section>

      {/* Blog Posts Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Latest Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(posts).map(([slug, post]) => (
            <article key={slug} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.date}</p>
                <Link
                  href={`/posts/${slug}`}
                  className="text-orange-600 hover:text-orange-700"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
