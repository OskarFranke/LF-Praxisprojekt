import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Star, Clock, Calendar, User, Search } from 'lucide-react'
import Link from "next/link"

export default function HomePage() {
  const featuredMovies = [
    {
      id: 1,
      title: "Mad Max: Fury Road",
      duration: "120 min",
      rating: "8.1",
      genre: "Action, Adventure",
      image: "/mad-max-fury-road-movie-poster.jpg",
      showtimes: ["14:30", "17:15", "20:00", "22:45"],
      description:
        "In a post-apocalyptic wasteland, Max teams up with Furiosa to flee from cult leader Immortan Joe and his army.",
    },
    {
      id: 2,
      title: "Nobody 2",
      duration: "92 min",
      rating: "7.4",
      genre: "Action, Thriller",
      image: "/nobody-2-movie-poster-action-thriller.jpg",
      showtimes: ["15:00", "18:30", "21:15"],
      description: "Nobody takes his family on a vacation, but trouble follows him wherever he goes.",
    },
    {
      id: 3,
      title: "Dune: Part Two",
      duration: "166 min",
      rating: "8.8",
      genre: "Sci-Fi, Adventure",
      image: "/dune-part-two-movie-poster-sci-fi.jpg",
      showtimes: ["13:00", "16:45", "20:30"],
      description:
        "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    },
    {
      id: 4,
      title: "The Batman",
      duration: "176 min",
      rating: "7.8",
      genre: "Action, Crime",
      image: "/the-batman-movie-poster-dark-knight.jpg",
      showtimes: ["14:00", "17:30", "21:00"],
      description:
        "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues.",
    },
    {
      id: 5,
      title: "Harry Potter and the Philosopher's Stone",
      duration: "152 min",
      rating: "7.6",
      genre: "Fantasy, Adventure",
      image: "/harry-potter-philosophers-stone-poster.jpg",
      showtimes: ["13:30", "16:15", "19:00"],
      description:
        "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and his terrible destiny.",
    },
    {
      id: 6,
      title: "Star Wars: A New Hope",
      duration: "121 min",
      rating: "8.6",
      genre: "Sci-Fi, Adventure",
      image: "/star-wars-new-hope-poster.jpg",
      showtimes: ["14:15", "17:00", "19:45"],
      description:
        "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy.",
    },
    {
      id: 7,
      title: "Die Hard",
      duration: "132 min",
      rating: "8.2",
      genre: "Action, Thriller",
      image: "/die-hard-movie-poster.jpg",
      showtimes: ["15:30", "18:15", "21:00"],
      description:
        "An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party.",
    },
    {
      id: 8,
      title: "Stargate",
      duration: "116 min",
      rating: "7.1",
      genre: "Sci-Fi, Adventure",
      image: "/stargate-movie-poster.jpg",
      showtimes: ["16:00", "18:45", "21:30"],
      description:
        "An interstellar teleportation device found in Egypt leads to a planet with humans resembling ancient Egyptians.",
    },
    {
      id: 9,
      title: "Stromberg - Der Film",
      duration: "123 min",
      rating: "6.8",
      genre: "Comedy",
      image: "/stromberg-der-film-poster.jpg",
      showtimes: ["15:45", "18:30", "21:15"],
      description:
        "Bernd Stromberg and his team face their biggest challenge yet when the insurance company faces a major crisis.",
    },
    {
      id: 10,
      title: "Friedrich Merz Biography: Einigkeit, Recht und Blackrock",
      duration: "158 min",
      rating: "7.9",
      genre: "Biography, Drama",
      image: "/friedrich-merz-biography-poster.jpg",
      showtimes: ["14:00", "17:30", "20:45"],
      description:
        "Quentin Tarantino's bold take on the rise of a German politician navigating the complex world of finance and politics.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-foreground">SUPER CINEMA</h1>
              <nav className="hidden md:flex space-x-6">
                <Link href="/movies" className="text-muted-foreground hover:text-foreground transition-colors">
                  MOVIES
                </Link>
                <Link href="/bookings" className="text-muted-foreground hover:text-foreground transition-colors">
                  MY BOOKINGS
                </Link>
                <Link href="/news" className="text-muted-foreground hover:text-foreground transition-colors">
                  NEWS
                </Link>
                <Link href="/snacks" className="text-muted-foreground hover:text-foreground transition-colors">
                  SNACKS
                </Link>
                {/* Removed Docs link */}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-balance">
              FRESH IN <span className="text-primary">CINEMA</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Experience the latest blockbusters in premium comfort with state-of-the-art sound and projection
            </p>
          </div>

          {/* Featured Movie */}
          <div className="mb-20">
            <Card className="overflow-hidden bg-gradient-to-r from-card to-card/50 border-border">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-[3/4] md:aspect-video">
                    <img
                      src={featuredMovies[0].image || "/placeholder.svg"}
                      alt={featuredMovies[0].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Button
                      size="lg"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary/20 backdrop-blur-sm border border-primary/30 hover:bg-primary/30"
                    >
                      <Play className="h-6 w-6 mr-2" />
                      Watch Trailer
                    </Button>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary">{featuredMovies[0].genre}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        {featuredMovies[0].rating}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {featuredMovies[0].duration}
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{featuredMovies[0].title}</h3>
                    <p className="text-muted-foreground mb-6 text-pretty">{featuredMovies[0].description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredMovies[0].showtimes.map((time) => (
                        <Button key={time} variant="outline" size="sm">
                          {time}
                        </Button>
                      ))}
                    </div>
                    <Link href={`/movie/${featuredMovies[0].id}`}>
                      <Button size="lg" className="w-full md:w-auto">
                        <Calendar className="h-5 w-5 mr-2" />
                        Book Tickets
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">PROGRAMM</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMovies.slice(1).map((movie) => (
              <Card key={movie.id} className="group overflow-hidden hover:scale-105 transition-transform duration-300">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4]">
                    <img
                      src={movie.image || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="font-bold text-white mb-2 text-balance">{movie.title}</h3>
                      <p className="text-sm text-white/80 mb-3">{movie.genre}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center text-sm text-white">
                          <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                          {movie.rating}
                        </div>
                        <div className="flex items-center text-sm text-white">
                          <Clock className="h-3 w-3 mr-1" />
                          {movie.duration}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {movie.showtimes.slice(0, 2).map((time) => (
                          <Badge key={time} variant="secondary" className="text-xs">
                            {time}
                          </Badge>
                        ))}
                      </div>
                      <Link href={`/movie/${movie.id}`}>
                        <Button size="sm" className="w-full">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="p-4 group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="font-semibold mb-2 text-balance">{movie.title}</h3>
                    <p className="text-sm text-muted-foreground">{movie.genre}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">SUPER CINEMA</h3>
              <p className="text-sm text-muted-foreground">
                Premium movie experience with the latest technology and comfortable seating.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/movies" className="hover:text-foreground transition-colors">
                    Movies
                  </Link>
                </li>
                <li>
                  <Link href="/showtimes" className="hover:text-foreground transition-colors">
                    Showtimes
                  </Link>
                </li>
                <li>
                  <Link href="/tickets" className="hover:text-foreground transition-colors">
                    Tickets
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-foreground transition-colors">
                    Help
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/imprint" className="hover:text-foreground transition-colors">
                    Imprint
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 SUPER CINEMA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
