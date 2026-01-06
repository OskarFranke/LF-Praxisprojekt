# Movie Class

## Description
Represents a movie available in the cinema system with all its metadata and showtime information.

## Variables/Attributes
- id: number - Unique identifier for the movie
- title: string - Movie title
- duration: string - Runtime (e.g., "120 min")
- rating: string - IMDb/audience rating (e.g., "8.1")
- genre: string - Movie genre (e.g., "Action, Adventure")
- image: string - Path to movie poster image
- showtimes: string[] - Array of available showtimes (e.g., ["14:30", "17:15", "20:00"])
- description: string - Movie plot description
- director: string - Director name
- cast: string[] - Array of actor names

## Methods
- getShowtimes(): string[] - Returns all available showtimes for the movie
- getMovieDetails(): object - Returns complete movie information
- getRuntime(): number - Returns duration in minutes
- getGenres(): string[] - Returns array of genres
- isNowShowing(): boolean - Checks if movie has any upcoming showtimes
