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
  
  if (slug !== 'sample-post') {
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
      
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Matt Chapman's 2025 Performance</h1>
        <div className="text-gray-600">
          <time>June 9, 2025</time>
          <span className="mx-2">•</span>
          <span>5 min read</span>
        </div>
      </header>

      <Tabs labels={['Analysis', 'Code']}>
        <div className="prose prose-lg max-w-none">
          <p className="lead">
            Matt Chapman's baseline statisitcs this year are a bit confusing. His batting average is essentially the league average,
            he leads the giants with 12 home runs, which is tied for 28th in the league. He is obviously one of the best fielers in baseball.
          </p>
          <br />
          <p>
            All things considered, he is having a great year. Interestingly, he is 8th in baseball in WAR at 2.9. Meanwhile, he isn't top ten in an 
            other offensice category asside from walks. 
          </p>
          <br />
          <p>
            So what's the deal? Lets take a dive into the numbers.

          </p>
          <br />
          <h2>Key Statistics</h2>
          <p>
          
          </p>

          <h2>Analysis</h2>
          <p>
            As we can see from the chart above Chapman's batting average is approaching the leagy average. 
            The regression also tends toward Chapmans career average, 241.
          </p>

          <h2>Conclusion</h2>
          <p>
            Wrap up your analysis with key takeaways and predictions for future games or seasons.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">
{`# Python code for Matt Chapman analysis
import pandas as pd
import numpy as np
from baseball_stats import get_player_stats

# Get Chapman's 2025 stats
chapman_stats = get_player_stats('Matt Chapman', year=2025)

# Calculate key metrics
batting_avg = chapman_stats['hits'] / chapman_stats['at_bats']
war = chapman_stats['war']
home_runs = chapman_stats['home_runs']

# Fielding metrics
defensive_runs_saved = chapman_stats['drs']
outs_above_average = chapman_stats['oaa']

print(f"Batting Average: {batting_avg:.3f}")
print(f"WAR: {war}")
print(f"Home Runs: {home_runs}")
print(f"Defensive Runs Saved: {defensive_runs_saved}")
print(f"Outs Above Average: {outs_above_average}")`}
            </code>
          </pre>
        </div>
      </Tabs>
    </article>
  )
} 