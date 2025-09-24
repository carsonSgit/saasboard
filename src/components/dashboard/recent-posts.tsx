'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function RecentPosts() {
  const posts = [
    'test',
    'test',
    'Unlock Savings Galore with Mobbin Weekly Deals!'
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {posts.map((post, index) => (
            <div key={index} className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">
              {post}
            </div>
          ))}
        </div>
        <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
          All Posts →
        </button>
      </CardContent>
    </Card>
  )
}
