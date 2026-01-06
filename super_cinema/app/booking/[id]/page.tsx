"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Volume2, Clock, Calendar, Minus, Plus } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { notFound } from "next/navigation"

// Mock data - in a real app this would come from a database
const movies = {
  "1": {
    id: 1,
    title: "Mad Max: Fury Road",
    duration: "120 min",
    rating: "8.1",
    genre: "Action, Adventure",
    image: "/mad-max-fury-road-movie-poster.jpg",
  },
  "2": {
    id: 2,
    title: "Nobody 2",
    duration: "92 min",
    rating: "7.4",
    genre: "Action, Thriller",
    image: "/nobody-2-movie-poster-action-thriller.jpg",
  },
  "3": {
    id: 3,
    title: "Dune: Part Two",
    duration: "166 min",
    rating: "8.5",
    genre: "Sci-Fi, Adventure",
    image: "/dune-part-two-movie-poster-sci-fi.jpg",
  },
  "4": {
    id: 4,
    title: "The Batman",
    duration: "176 min",
    rating: "7.8",
    genre: "Action, Crime",
    image: "/the-batman-movie-poster-dark-knight.jpg",
  },
  "5": {
    id: 5,
    title: "Harry Potter and the Philosopher's Stone",
    duration: "152 min",
    rating: "7.6",
    genre: "Fantasy, Adventure",
    image: "/harry-potter-philosophers-stone-poster.jpg",
  },
  "6": {
    id: 6,
    title: "Star Wars: A New Hope",
    duration: "121 min",
    rating: "8.6",
    genre: "Sci-Fi, Adventure",
    image: "/star-wars-new-hope-poster.jpg",
  },
  "7": {
    id: 7,
    title: "Die Hard",
    duration: "132 min",
    rating: "8.2",
    genre: "Action, Thriller",
    image: "/die-hard-movie-poster.jpg",
  },
  "8": {
    id: 8,
    title: "Stargate",
    duration: "116 min",
    rating: "7.1",
    genre: "Sci-Fi, Adventure",
    image: "/stargate-movie-poster.jpg",
  },
  "9": {
    id: 9,
    title: "Stromberg - Der Film",
    duration: "87 min",
    rating: "6.2",
    genre: "Comedy",
    image: "/stromberg-der-film-poster.jpg",
  },
  "10": {
    id: 10,
    title: "Friedrich Merz Biography: Einigkeit, Recht und Blackrock",
    duration: "143 min",
    rating: "7.9",
    genre: "Biography, Drama",
    image: "/friedrich-merz-biography-poster.jpg",
  },
}

// Theater layout - 0: available, 1: occupied, 2: selected
const initialSeats = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

// Add some occupied seats for realism
const occupiedSeats = [
  [2, 5],
  [2, 6],
  [4, 8],
  [4, 9],
  [6, 3],
  [6, 4],
  [6, 5],
  [7, 10],
  [7, 11],
  [9, 7],
  [9, 8],
  [10, 2],
  [10, 13],
]

interface BookingPageProps {
  params: {
    id: string
  }
}

export default function BookingPage({ params }: BookingPageProps) {
  const searchParams = useSearchParams()
  const movie = movies[params.id as keyof typeof movies]

  const [seats, setSeats] = useState(initialSeats.map((row) => [...row]))
  const [adultTickets, setAdultTickets] = useState(0)
  const [childTickets, setChildTickets] = useState(0)

  const time = searchParams.get("time") || "20:00"
  const theater = searchParams.get("theater") || "Theater 1"
  const type = searchParams.get("type") || "2D"
  const basePrice = Number.parseFloat(searchParams.get("price") || "12.50")

  const adultPrice = basePrice
  const childPrice = basePrice * 0.75 // 25% discount for children

  useEffect(() => {
    // Set occupied seats
    const newSeats = initialSeats.map((row) => [...row])
    occupiedSeats.forEach(([row, col]) => {
      if (newSeats[row] && newSeats[row][col] !== undefined) {
        newSeats[row][col] = 1
      }
    })
    setSeats(newSeats)
  }, [])

  if (!movie) {
    notFound()
  }

  const handleSeatClick = (rowIndex: number, seatIndex: number) => {
    const totalSelectedTickets = adultTickets + childTickets
    const currentlySelectedSeats = seats.flat().filter((seat) => seat === 2).length

    if (seats[rowIndex][seatIndex] === 1) return // Can't select occupied seats

    const newSeats = [...seats]

    if (newSeats[rowIndex][seatIndex] === 2) {
      // Deselecting a seat
      newSeats[rowIndex][seatIndex] = 0
    } else if (currentlySelectedSeats < totalSelectedTickets) {
      // Selecting a seat (only if we haven't reached the ticket limit)
      newSeats[rowIndex][seatIndex] = 2
    }

    setSeats(newSeats)
  }

  const selectedSeats = seats
    .flatMap((row, rowIndex) =>
      row.map((seat, seatIndex) => (seat === 2 ? `${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}` : null)),
    )
    .filter(Boolean)

  const totalPrice = adultTickets * adultPrice + childTickets * childPrice
  const canProceed = selectedSeats.length === adultTickets + childTickets && selectedSeats.length > 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link
                href={`/movie/${params.id}`}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Movie</span>
              </Link>
              <h1 className="text-2xl font-bold text-foreground">SUPER CINEMA</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Seat Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">{movie.title}</CardTitle>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {time}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {theater}
                  </div>
                  <div className="flex items-center">
                    <Volume2 className="h-4 w-4 mr-1" />
                    {type}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Screen */}
                <div className="mb-8">
                  <div className="w-full h-2 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mb-2"></div>
                  <p className="text-center text-sm text-muted-foreground">SCREEN</p>
                </div>

                {/* Seat Map */}
                <div className="bg-card/50 p-6 rounded-lg">
                  <div className="space-y-2">
                    {seats.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex items-center justify-center gap-2">
                        <span className="text-sm text-muted-foreground w-6 text-center">
                          {String.fromCharCode(65 + rowIndex)}
                        </span>
                        <div className="flex gap-1">
                          {row.map((seat, seatIndex) => (
                            <button
                              key={seatIndex}
                              onClick={() => handleSeatClick(rowIndex, seatIndex)}
                              disabled={seat === 1}
                              className={`
                                w-8 h-8 rounded-t-lg border-2 transition-all duration-200 text-xs font-medium
                                ${seat === 0 ? "bg-blue-500 border-blue-600 hover:bg-blue-400 cursor-pointer" : ""}
                                ${seat === 1 ? "bg-gray-600 border-gray-700 cursor-not-allowed" : ""}
                                ${seat === 2 ? "bg-green-500 border-green-600 cursor-pointer" : ""}
                              `}
                              title={`Seat ${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}`}
                            >
                              {seatIndex + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex justify-center gap-6 mt-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 border border-blue-600 rounded-t"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 border border-green-600 rounded-t"></div>
                      <span>Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-600 border border-gray-700 rounded-t"></div>
                      <span>Occupied</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Your Tickets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Ticket Selection */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Adult</span>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => setAdultTickets(Math.max(0, adultTickets - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{adultTickets}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => setAdultTickets(adultTickets + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-muted-foreground ml-2">€{adultPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Child</span>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => setChildTickets(Math.max(0, childTickets - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{childTickets}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => setChildTickets(childTickets + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-muted-foreground ml-2">€{childPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Selected Seats */}
                {selectedSeats.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Selected Seats</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedSeats.map((seat) => (
                        <Badge key={seat} variant="secondary">
                          {seat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Movie Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Movie:</span>
                    <span>{movie.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span>{type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Length:</span>
                    <span>{movie.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span>19. August 2025, {time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Theater:</span>
                    <span>{theater}</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-2 text-sm border-t pt-4">
                  {adultTickets > 0 && (
                    <div className="flex justify-between">
                      <span>{adultTickets}x Adult</span>
                      <span>€{(adultTickets * adultPrice).toFixed(2)}</span>
                    </div>
                  )}
                  {childTickets > 0 && (
                    <div className="flex justify-between">
                      <span>{childTickets}x Child</span>
                      <span>€{(childTickets * childPrice).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-base border-t pt-2">
                    <span>Total:</span>
                    <span>€{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Instructions */}
                <div className="text-sm text-muted-foreground">
                  <p>1. Select number of tickets</p>
                  <p>2. Choose your seats on the map</p>
                  <p>3. Proceed to checkout</p>
                </div>

                {/* Next Button */}
                <Link
                  href={
                    canProceed
                      ? `/checkout/${params.id}?time=${time}&theater=${encodeURIComponent(theater)}&type=${type}&price=${basePrice}&adult=${adultTickets}&child=${childTickets}&seats=${selectedSeats.join(",")}`
                      : "#"
                  }
                >
                  <Button className="w-full" disabled={!canProceed}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Next
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
