import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Booking Not Found</h1>
        <p className="text-muted-foreground mb-8">The booking page you're looking for doesn't exist.</p>
        <Link href="/">
          <Button>Back to Movies</Button>
        </Link>
      </div>
    </div>
  )
}
