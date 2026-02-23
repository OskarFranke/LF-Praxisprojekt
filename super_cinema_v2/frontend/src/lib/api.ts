export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://backend.ddev.site';

export interface Movie {
    uid: number;
    title: string;
    description: string;
    release_date: number;
    rating: number;
    image: number;
}

export interface Snack {
    uid: number;
    title: string;
    description: string;
    price: number;
    category: string;
}

export interface Screening {
    uid: number;
    movie: number;
    start_time: number;
    room: string;
}

export async function fetchMovies(): Promise<Movie[]> {
    const res = await fetch(`${API_BASE_URL}/api/movies`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch movies');
    return res.json();
}

export async function fetchSnacks(): Promise<Snack[]> {
    const res = await fetch(`${API_BASE_URL}/api/snacks`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch snacks');
    return res.json();
}

export async function fetchScreenings(): Promise<Screening[]> {
    const res = await fetch(`${API_BASE_URL}/api/screenings`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch screenings');
    return res.json();
}
