import { fetchScreenings, fetchMovies, fetchSnacks } from "@/lib/api";
import BookingFlow from "@/components/BookingFlow";

export default async function BookSeatPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [screenings, movies, snacks] = await Promise.all([
        fetchScreenings(),
        fetchMovies(),
        fetchSnacks()
    ]);

    const screening = screenings.find(s => s.uid.toString() === id);
    if (!screening) return <div className="p-10 text-center">Screening not found</div>;

    const movie = movies.find(m => m.uid === screening.movie);
    if (!movie) return <div className="p-10 text-center">Movie not found</div>;

    return (
        <div className="max-w-5xl mx-auto w-full px-6 py-12">
            <BookingFlow screening={screening} movie={movie} snacks={snacks} />
        </div>
    );
}
