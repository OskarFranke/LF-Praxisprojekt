# Seat Class

## Description
Represents a single seat in a theater with its location, price, and booking status.

## Variables/Attributes
- id: string - Unique identifier (e.g., "A1", "B5")
- row: string - Row letter (e.g., "A", "B", "C")
- number: number - Seat number in row (e.g., 1, 2, 3)
- isOccupied: boolean - Whether seat is booked
- price: number - Ticket price for this seat
- seatType: string - Type of seat (e.g., "Standard", "Premium", "VIP")
- theaterId: number - Reference to parent theater

## Methods
- occupy(): void - Marks seat as booked
- release(): void - Marks seat as available
- getPosition(): string - Returns formatted position (e.g., "A1")
- getPrice(): number - Returns seat price
- isAvailable(): boolean - Checks if seat can be booked
