import { fetchMovies } from "@/lib/api";
import Link from "next/link";
import { Star, Clock } from "lucide-react";

export default async function Home() {
  const movies = await fetchMovies();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 w-full">
      <section className="mb-16">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Now <span className="text-brand-500">Showing</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl">
          Book your tickets for the latest blockbusters. Experience cinema with unmatched quality and comfort.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <Link key={movie.uid} href={`/movie/${movie.uid}`} className="group block">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-4 bg-dark-800 border border-white/5">
              {/* Fallback pattern if no image */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 to-dark-900 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                {movie.image ? (
                  <img src={`http://backend.ddev.site/${movie.image}`} alt={movie.title} className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition" />
                ) : (
                  <span className="text-gray-500 font-medium">No Poster Available</span>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition flex justify-between items-end">
                <div className="flex bg-black/60 backdrop-blur px-2 py-1 rounded gap-1 items-center text-gold font-semibold text-sm">
                  <Star className="w-4 h-4 fill-gold" />
                  {movie.rating.toFixed(1)}
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold group-hover:text-brand-500 transition line-clamp-1">{movie.title}</h2>
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">{movie.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
