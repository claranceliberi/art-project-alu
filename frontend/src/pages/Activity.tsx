import React from 'react'

export default function Activity() {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-6">Activity Feed</h1>
      <div className="space-y-6">
        {/* Placeholder for activity feed */}
        <div className="p-6 border rounded-lg shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-muted rounded-full" />
            <div>
              <h3 className="font-semibold">New Artwork Listed</h3>
              <p className="text-sm text-muted-foreground">
                Artist Name posted a new artwork "Untitled"
              </p>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-muted rounded-full" />
            <div>
              <h3 className="font-semibold">Artwork Sold</h3>
              <p className="text-sm text-muted-foreground">
                "Abstract Landscape" by Artist Name was purchased
              </p>
              <span className="text-xs text-muted-foreground">5 hours ago</span>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-muted rounded-full" />
            <div>
              <h3 className="font-semibold">New Artist Joined</h3>
              <p className="text-sm text-muted-foreground">
                Welcome Artist Name to our community!
              </p>
              <span className="text-xs text-muted-foreground">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 