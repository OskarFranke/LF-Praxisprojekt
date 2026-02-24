import { calculateTotalPrice } from './priceCalculator';
import { Snack } from './api';

describe('calculateTotalPrice', () => {
    const mockSnacks: Snack[] = [
        { uid: 1, title: 'Popcorn', price: 5, description: '', category: 'food' },
        { uid: 2, title: 'Soda', price: 3, description: '', category: 'drink' }
    ];

    it('calculates price for only tickets', () => {
        expect(calculateTotalPrice(2, 12.50, {}, mockSnacks)).toBe(25);
    });

    it('calculates price for tickets and snacks', () => {
        expect(calculateTotalPrice(1, 15, { 1: 2, 2: 1 }, mockSnacks)).toBe(28); // 15 + (2*5) + (1*3)
    });

    it('returns 0 for no tickets and no snacks', () => {
        expect(calculateTotalPrice(0, 15, {}, mockSnacks)).toBe(0);
    });

    it('ignores snacks that do not exist', () => {
        expect(calculateTotalPrice(1, 10, { 999: 2 }, mockSnacks)).toBe(10);
    });
});
