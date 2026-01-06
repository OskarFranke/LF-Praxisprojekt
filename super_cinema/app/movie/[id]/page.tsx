import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Star, Clock, Calendar, ArrowLeft, Users, Volume2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Mock data - in a real app this would come from a database
const movies = {
  "1": {
    id: 1,
    title: "Mad Max: Fury Road",
    duration: "120 min",
    rating: "8.1",
    genre: "Action, Adventure",
    director: "George Miller",
    cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult"],
    year: "2015",
    language: "English",
    subtitles: ["German", "French"],
    image: "/mad-max-fury-road-movie-poster.jpg",
    trailer: "https://www.youtube.com/watch?v=hEJnMQG9ev8",
    description:
      "In a post-apocalyptic wasteland, Max teams up with Furiosa to flee from cult leader Immortan Joe and his army in the ultimate high-speed chase.",
    longDescription:
      "An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and most everyone is crazed fighting for the necessities of life. Within this world exist two rebels on the run who just might be able to restore order.",
    showtimes: [
      { time: "14:30", theater: "Theater 1", type: "2D", price: 12.5 },
      { time: "17:15", theater: "Theater 2", type: "IMAX", price: 16.0 },
      { time: "20:00", theater: "Theater 1", type: "2D", price: 12.5 },
      { time: "22:45", theater: "Theater 3", type: "4DX", price: 18.0 },
    ],
  },
  "2": {
    id: 2,
    title: "Nobody 2",
    duration: "92 min",
    rating: "7.4",
    genre: "Action, Thriller",
    director: "Ilya Naishuller",
    cast: ["Bob Odenkirk", "Aleksey Serebryakov", "Connie Nielsen"],
    year: "2024",
    language: "English",
    subtitles: ["German", "Spanish"],
    image: "/nobody-2-movie-poster-action-thriller.jpg",
    description: "Nobody takes his family on a vacation, but trouble follows him wherever he goes.",
    longDescription:
      "Hutch Mansell fails to defend himself or his family when two thieves break into his suburban home one night. The aftermath of the incident soon strikes a match to his long-simmering rage.",
    showtimes: [
      { time: "15:00", theater: "Theater 2", type: "2D", price: 12.5 },
      { time: "18:30", theater: "Theater 1", type: "2D", price: 12.5 },
      { time: "21:15", theater: "Theater 3", type: "IMAX", price: 16.0 },
    ],
  },
  "3": {
    id: 3,
    title: "Dune: Part Two",
    duration: "166 min",
    rating: "8.8",
    genre: "Sci-Fi, Adventure",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    year: "2024",
    language: "English",
    subtitles: ["German", "French", "Spanish"],
    image: "/dune-part-two-movie-poster-sci-fi.jpg",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    longDescription:
      "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
    showtimes: [
      { time: "13:00", theater: "Theater 1", type: "IMAX", price: 16.0 },
      { time: "16:45", theater: "Theater 2", type: "2D", price: 12.5 },
      { time: "20:30", theater: "Theater 3", type: "4DX", price: 18.0 },
    ],
  },
  "4": {
    id: 4,
    title: "The Batman",
    duration: "176 min",
    rating: "7.8",
    genre: "Action, Crime",
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
    year: "2022",
    language: "English",
    subtitles: ["German", "French"],
    image: "/the-batman-movie-poster-dark-knight.jpg",
    description:
      "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues.",
    longDescription:
      "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    showtimes: [
      { time: "14:00", theater: "Theater 2", type: "2D", price: 12.5 },
      { time: "17:30", theater: "Theater 1", type: "IMAX", price: 16.0 },
      { time: "21:00", theater: "Theater 3", type: "2D", price: 12.5 },
    ],
  },
  "5": {
    id: 5,
    title: "Harry Potter and the Philosopher's Stone",
    duration: "152 min",
    rating: "7.6",
    genre: "Fantasy, Adventure",
    director: "Chris Columbus",
    cast: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint"],
    year: "2001",
    language: "English",
    subtitles: ["German", "French", "Spanish"],
    image: "/harry-potter-philosophers-stone-poster.jpg",
    description:
      "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and his terrible destiny.",
    longDescription:
      "Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard—with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry.",
    showtimes: [
      { time: "13:30", theater: "Theater 1", type: "2D", price: 12.5 },
      { time: "16:15", theater: "Theater 2", type: "2D", price: 12.5 },
      { time: "19:00", theater: "Theater 3", type: "IMAX", price: 16.0 },
    ],
  },
  "6": {
    id: 6,
    title: "Star Wars: A New Hope",
    duration: "121 min",
    rating: "8.6",
    genre: "Sci-Fi, Adventure",
    director: "George Lucas",
    cast: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"],
    year: "1977",
    language: "English",
    subtitles: ["German", "French"],
    image: "/star-wars-new-hope-poster.jpg",
    description:
      "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy.",
    longDescription:
      "Luke Skywalker begins a journey that will change the galaxy in this epic start to the legendary Star Wars saga. Nineteen years after the formation of the Empire, Luke is thrust into the struggle of the Rebel Alliance when he meets Obi-Wan Kenobi.",
    showtimes: [
      { time: "14:15", theater: "Theater 2", type: "2D", price: 12.5 },
      { time: "17:00", theater: "Theater 1", type: "IMAX", price: 16.0 },
      { time: "19:45", theater: "Theater 3", type: "2D", price: 12.5 },
    ],
  },
  "7": {
    id: 7,
    title: "Die Hard",
    duration: "132 min",
    rating: "8.2",
    genre: "Action, Thriller",
    director: "John McTiernan",
    cast: ["Bruce Willis", "Alan Rickman", "Bonnie Bedelia"],
    year: "1988",
    language: "English",
    subtitles: ["German", "French"],
    image: "/die-hard-movie-poster.jpg",
    description:
      "An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party.",
    longDescription:
      "New York City policeman John McClane is visiting his estranged wife and two daughters on Christmas Eve. He joins her at a holiday party in the headquarters of the Japanese-owned business she works for. But the festivities are interrupted by a group of terrorists.",
    showtimes: [
      { time: "15:30", theater: "Theater 1", type: "2D", price: 12.5 },
      { time: "18:15", theater: "Theater 2", type: "2D", price: 12.5 },
      { time: "21:00", theater: "Theater 3", type: "IMAX", price: 16.0 },
    ],
  },
  "8": {
    id: 8,
    title: "Stargate",
    duration: "116 min",
    rating: "7.1",
    genre: "Sci-Fi, Adventure",
    director: "Roland Emmerich",
    cast: ["Kurt Russell", "James Spader", "Jaye Davidson"],
    year: "1994",
    language: "English",
    subtitles: ["German", "French"],
    image: "/stargate-movie-poster.jpg",
    description:
      "An interstellar teleportation device found in Egypt leads to a planet with humans resembling ancient Egyptians.",
    longDescription:
      "An interstellar teleportation device, found in Egypt, leads to a planet with humans resembling ancient Egyptians who worship the god Ra. The device is activated, and a team of explorers travels through it to the distant planet.",
    showtimes: [
      { time: "16:00", theater: "Theater 2", type: "2D", price: 12.5 },
      { time: "18:45", theater: "Theater 1", type: "2D", price: 12.5 },
      { time: "21:30", theater: "Theater 3", type: "IMAX", price: 16.0 },
    ],
  },
  "9": {
    id: 9,
    title: "Stromberg - Der Film",
    duration: "123 min",
    rating: "6.8",
    genre: "Comedy",
    director: "Arne Feldhusen",
    cast: ["Christoph Maria Herbst", "Bjarne Mädel", "Diana Staehly"],
    year: "2014",
    language: "German",
    subtitles: ["English"],
    image: "/stromberg-der-film-poster.jpg",
    description:
      "Bernd Stromberg and his team face their biggest challenge yet when the insurance company faces a major crisis.",
    longDescription:
      "The incompetent but self-confident Bernd Stromberg is getting ready to make a big career jump. But then the company's new efficiency expert threatens to spoil his plans, and Stromberg has to fight for his department and his employees.",
    showtimes: [
      { time: "15:45", theater: "Theater 1", type: "2D", price: 12.5 },
      { time: "18:30", theater: "Theater 2", type: "2D", price: 12.5 },
      { time: "21:15", theater: "Theater 3", type: "2D", price: 12.5 },
    ],
  },
  "10": {
    id: 10,
    title: "Friedrich Merz Biography: Einigkeit, Recht und Blackrock",
    duration: "158 min",
    rating: "7.9",
    genre: "Biography, Drama",
    director: "Quentin Tarantino",
    cast: ["Christoph Waltz", "Diane Kruger", "Daniel Brühl"],
    year: "2024",
    language: "German",
    subtitles: ["English", "French"],
    image: "/friedrich-merz-biography-poster.jpg",
    description:
      "Quentin Tarantino's bold take on the rise of a German politician navigating the complex world of finance and politics.",
    longDescription:
      "In typical Tarantino fashion, this biographical drama explores the controversial rise of Friedrich Merz through the German political landscape, weaving together themes of power, finance, and political ambition in post-reunification Germany.",
    showtimes: [
      { time: "14:00", theater: "Theater 1", type: "2D", price: 12.5 },
      { time: "17:30", theater: "Theater 2", type: "IMAX", price: 16.0 },
      { time: "20:45", theater: "Theater 3", type: "2D", price: 12.5 },
    ],
  },
}

interface MoviePageProps {
  params: {
    id: string
  }
}

export default function MoviePage({ params }: MoviePageProps) {
  const movie = movies[params.id as keyof typeof movies]

  if (!movie) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Movies</span>
              </Link>
              <h1 className="text-2xl font-bold text-foreground">SUPER CINEMA</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Movie Details */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Movie Poster */}
            <div className="lg:col-span-1">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4]">
                    <img
                      src={movie.image || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      size="lg"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary/20 backdrop-blur-sm border border-primary/30 hover:bg-primary/30"
                    >
                      <Play className="h-6 w-6 mr-2" />
                      Watch Trailer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Movie Information */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="secondary" className="text-sm">
                      {movie.genre}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                      {movie.rating}/10
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {movie.duration}
                    </div>
                    <Badge variant="outline">{movie.year}</Badge>
                  </div>
                  <h1 className="text-4xl font-bold mb-4 text-balance">{movie.title}</h1>
                  <p className="text-lg text-muted-foreground mb-6 text-pretty">{movie.description}</p>
                </div>

                {/* Movie Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Movie Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Director:</span>
                        <span>{movie.director}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span>{movie.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Language:</span>
                        <span>{movie.language}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Year:</span>
                        <span>{movie.year}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Cast</h3>
                    <div className="space-y-1 text-sm">
                      {movie.cast.map((actor, index) => (
                        <div key={index} className="text-muted-foreground">
                          {actor}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Synopsis */}
                <div>
                  <h3 className="font-semibold mb-3">Synopsis</h3>
                  <p className="text-muted-foreground text-pretty">{movie.longDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showtimes Selection */}
      <section className="py-8 px-4 bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Select Showtime</h2>
          <div className="grid gap-4 max-w-4xl mx-auto">
            {movie.showtimes.map((showtime, index) => (
              <Card key={index} className="hover:bg-accent/50 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{showtime.time}</div>
                        <div className="text-sm text-muted-foreground">Today</div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          {showtime.theater}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Volume2 className="h-4 w-4 mr-1" />
                          {showtime.type}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-lg font-semibold">€{showtime.price.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">per ticket</div>
                      </div>
                      <Link
                        href={`/booking/${movie.id}?time=${showtime.time}&theater=${encodeURIComponent(showtime.theater)}&type=${showtime.type}&price=${showtime.price}`}
                      >
                        <Button className="group-hover:bg-primary group-hover:text-primary-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          Select Seats
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2025 SUPER CINEMA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
