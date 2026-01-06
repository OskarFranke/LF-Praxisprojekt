# Booking Class

## Description
Represents a complete booking/reservation with all ticket information, seats, and payment details.

## Variables/Attributes
- bookingId: string - Unique booking reference number
- userId: number - Reference to user who made booking
- movieId: number - Reference to movie being booked
- theaterId: number - Reference to theater showing the movie
- selectedSeats: Seat[] - Array of selected seats
- showtime: string - Selected showtime (e.g., "19:45")
- bookingDate: Date - When the booking was made
- totalPrice: number - Total cost of booking
- status: string - Booking status ("pending", "confirmed", "cancelled")
- ticketCount: number - Number of tickets
- adultTickets: number - Number of adult tickets
- childTickets: number - Number of child tickets
- paymentMethod: string - Selected payment method

## Methods
- calculateTotal(): number - Calculates total price for all seats and snacks
- addSeat(seat: Seat): void - Adds a seat to booking
- removeSeat(seatId: string): void - Removes a seat from booking
- getBookingDetails(): object - Returns complete booking information
- confirmBooking(): boolean - Confirms booking and locks seats
- generateQRCode(): string - Generates QR code for ticket
- getBookingReference(): string - Returns formatted booking reference
