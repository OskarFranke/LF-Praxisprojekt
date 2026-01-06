"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Download, Mail, Calendar, MapPin, Clock, Users } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

// Mock data
const movies = {
  "1": {
    id: 1,
    title: "Mad Max: Fury Road",
    duration: "120 min",
    image: "/mad-max-fury-road-movie-poster.jpg",
  },
  "2": {
    id: 2,
    title: "Nobody 2",
    duration: "92 min",
    image: "/nobody-2-movie-poster-action-thriller.jpg",
  },
}

interface ConfirmationPageProps {
  params: {
    id: string
  }
}

export default function ConfirmationPage({ params }: ConfirmationPageProps) {
  const searchParams = useSearchParams()
  const movie = movies[params.id as keyof typeof movies]
  const orderNumber = searchParams.get("orderNumber") || "12345"

  if (!movie) {
    return <div>Movie not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold text-foreground">SUPER CINEMA</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground">Your tickets have been successfully booked. Order #{orderNumber}</p>
          </div>

          {/* Ticket Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Calendar className="h-5 w-5" />
                Your Cinema Tickets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Code Placeholder */}
              <div className="flex justify-center">
                <div className="w-32 h-32 bg-muted border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                  <div className="text-center text-sm text-muted-foreground">
                    <div className="w-16 h-16 bg-foreground/10 rounded mx-auto mb-2"></div>
                    QR Code
                  </div>
                </div>
              </div>

              {/* Movie Information */}
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-semibold">{movie.title}</p>
                      <p className="text-sm text-muted-foreground">SUPER CINEMA</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-semibold">19. August 2025, 20:00</p>
                      <p className="text-sm text-muted-foreground">{movie.duration}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-semibold">Theater 1</p>
                      <p className="text-sm text-muted-foreground">2D</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold">Seats: A5, A6</p>
                    <p className="text-sm text-muted-foreground">Row A</p>
                  </div>
                </div>
              </div>

              {/* Important Information */}
              <div className="bg-muted/50 p-4 rounded-lg text-left">
                <h4 className="font-semibold mb-2">Important Information:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Please arrive 15 minutes before showtime</li>
                  <li>• Present this QR code at the entrance</li>
                  <li>• No outside food or drinks allowed</li>
                  <li>• Tickets are non-refundable</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Tickets
            </Button>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Mail className="h-4 w-4" />
              Email Tickets
            </Button>
            <Link href="/">
              <Button variant="outline">Back to Movies</Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p>A confirmation email has been sent to your email address.</p>
            <p>Need help? Contact us at support@supercinema.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
