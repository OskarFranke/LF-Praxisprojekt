# Theater Class

## Description
Represents a physical theater/hall within the cinema with its seat configuration and capacity information.

## Variables/Attributes
- id: number - Unique identifier for the theater
- name: string - Theater name (e.g., "Theater 1")
- capacity: number - Total number of seats
- rows: number - Number of rows (e.g., 12)
- seatsPerRow: number - Number of seats per row (e.g., 16)
- type: string - Theater type (e.g., "2D", "3D", "IMAX")
- features: string[] - Special features (e.g., ["Dolby Atmos", "4K Projection"])

## Methods
- getSeats(): Seat[] - Returns all seats in the theater
- getAvailableSeats(): Seat[] - Returns only available/not booked seats
- getOccupiedSeats(): Seat[] - Returns booked seats
- getSeatsByRow(row: number): Seat[] - Returns seats for specific row
- calculateCapacityPercentage(): number - Returns percentage of booked seats
