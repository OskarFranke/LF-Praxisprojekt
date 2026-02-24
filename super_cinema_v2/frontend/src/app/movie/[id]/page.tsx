import { fetchMovies, fetchScreenings } from "@/lib/api";
import Link from "next/link";
import { Clock, Calendar, Star, Armchair, ChevronRight } from "lucide-react";

export default async function MovieDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const movies = await fetchMovies();
    const screenings = await fetchScreenings();

    const movie = movies.find(m => m.uid.toString() === id);
    const movieScreenings = screenings.filter(s => s.movie.toString() === id);

    if (!movie) return <div className="p-10 text-center">Movie not found</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 w-full animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row gap-12">
                {/* Poster */}
                <div className="md:w-1/3 flex-shrink-0">
                    <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-dark-800 border border-white/10 shadow-2xl">
                        {movie.image ? (
                            <img src={`http://backend.ddev.site/${movie.image}`} alt={movie.title} className="object-cover w-full h-full" />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/30 to-dark-900 flex items-center justify-center">
                                <span className="text-gray-500 font-medium tracking-wider">SUPER CINEMA</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Info & Booking */}
                <div className="md:w-2/3 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-brand-500/20 text-brand-500 rounded text-sm font-bold uppercase tracking-wider border border-brand-500/20">Now Showing</span>
                        <div className="flex items-center gap-1 text-gold font-bold">
                            <Star className="w-5 h-5 fill-gold" />
                            {movie.rating.toFixed(1)} / 10
                        </div>
                    </div>

                    <h1 className="text-5xl font-extrabold tracking-tight mb-6">{movie.title}</h1>
                    <div
                        className="text-xl text-gray-300 leading-relaxed mb-10"
                        dangerouslySetInnerHTML={{ __html: movie.description }}
                    />

                    <div className="glass-panel rounded-2xl p-8 border border-white/5">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-brand-500" />
                            Select a Show Time
                        </h2>

                        {movieScreenings.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {movieScreenings.map(screening => {
                                    const date = new Date(screening.start_time * 1000);
                                    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                    const dateString = date.toLocaleDateString([], { month: 'short', day: 'numeric' });

                                    return (
                                        <Link href={`/book/${screening.uid}`} key={screening.uid}
                                            className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/10 hover:border-brand-500 hover:bg-brand-500/10 transition-all cursor-pointer group">
                                            <span className="text-sm text-gray-400 mb-1">{dateString}</span>
                                            <span className="text-2xl font-bold mb-1 group-hover:text-brand-500">{timeString}</span>
                                            <span className="text-xs text-gray-500">{screening.room}</span>
                                        </Link>
                                    )
                                })}
                            </div>
                        ) : (
                            <p className="text-gray-400 italic">No showtimes available currently.</p>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
