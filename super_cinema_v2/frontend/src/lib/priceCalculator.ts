import { Snack } from './api';

export function calculateTotalPrice(
    seatsCount: number,
    ticketPrice: number,
    selectedSnacks: Record<number, number>,
    availableSnacks: Snack[]
): number {
    const totalTickets = seatsCount * ticketPrice;

    const totalSnacks = Object.keys(selectedSnacks).reduce((acc, id) => {
        const qty = selectedSnacks[parseInt(id)];
        if (qty <= 0) return acc;
        const snack = availableSnacks.find(s => s.uid === parseInt(id));
        return acc + (snack ? snack.price * qty : 0);
    }, 0);

    return totalTickets + totalSnacks;
}
