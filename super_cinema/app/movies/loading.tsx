import { Card, CardContent } from "@/components/ui/card"

export default function MoviesLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="h-8 w-40 bg-muted animate-pulse rounded" />
              <div className="hidden md:flex space-x-6">
                <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                <div className="h-4 w-12 bg-muted animate-pulse rounded" />
                <div className="h-4 w-16 bg-muted animate-pulse rounded" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-muted animate-pulse rounded" />
              <div className="h-10 w-10 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </div>
      </header>

      {/* Page Header Skeleton */}
      <section className="py-12 px-4 bg-gradient-to-b from-card/30 to-background">
        <div className="container mx-auto">
          <div className="h-4 w-24 bg-muted animate-pulse rounded mb-4" />
          <div className="h-10 w-48 bg-muted animate-pulse rounded mb-4" />
          <div className="h-6 w-96 bg-muted animate-pulse rounded" />
        </div>
      </section>

      {/* Movies Grid Skeleton */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-[3/4] bg-muted animate-pulse" />
                  <div className="p-4">
                    <div className="h-5 w-3/4 bg-muted animate-pulse rounded mb-2" />
                    <div className="h-4 w-1/2 bg-muted animate-pulse rounded mb-2" />
                    <div className="h-3 w-full bg-muted animate-pulse rounded mb-1" />
                    <div className="h-3 w-2/3 bg-muted animate-pulse rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
