"use client";
import { useState } from "react";
import { Movie, Screening, Snack } from "@/lib/api";
import { calculateTotalPrice } from "@/lib/priceCalculator";
import { Armchair, Popcorn, CreditCard, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";

export default function BookingFlow({ screening, movie, snacks }: { screening: Screening, movie: Movie, snacks: Snack[] }) {
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [selectedSnacks, setSelectedSnacks] = useState<Record<number, number>>({});
    const [formData, setFormData] = useState({ name: "", email: "", payment: "arrival" });

    const toggleSeat = (id: string) => {
        if (selectedSeats.includes(id)) {
            setSelectedSeats(selectedSeats.filter(s => s !== id));
        } else {
            setSelectedSeats([...selectedSeats, id]);
        }
    };

    const handleSnackQty = (id: number, delta: number) => {
        const current = selectedSnacks[id] || 0;
        const next = Math.max(0, current + delta);
        setSelectedSnacks({ ...selectedSnacks, [id]: next });
    };

    const submitOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedSeats.length === 0) return alert("Please select at least one seat.");
        if (!formData.name || !formData.email) return alert("Please fill in your details.");

        // In a real app we'd send to the backend here. For PoC, we send to our Next.js API route or just show success.
        try {
            await fetch('/api/booking-success', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    screening: screening.uid,
                    movie: movie.title,
                    seats: selectedSeats,
                    snacks: selectedSnacks,
                    customer: formData
                })
            });
            setStep(4);
        } catch (e) {
            console.error(e);
            setStep(4); // just advance for PoC
        }
    };

    const date = new Date(screening.start_time * 1000).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });

    return (
        <div className="bg-dark-800 border border-white/10 rounded-3xl p-8 shadow-2xl animate-in slide-in-from-bottom-5">

            {/* Header Info */}
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-extrabold mb-2">{movie.title}</h2>
                <p className="text-brand-500 font-medium">{date} &bull; {screening.room}</p>
            </div>

            {/* Progress */}
            <div className="flex justify-between items-center mb-12 max-w-2xl mx-auto relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -z-10 -translate-y-1/2 rounded"></div>
                <div className="absolute top-1/2 left-0 h-1 bg-brand-500 -z-10 -translate-y-1/2 rounded transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>

                {[{ s: 1, icon: Armchair, label: "Seats" }, { s: 2, icon: Popcorn, label: "Snacks" }, { s: 3, icon: CreditCard, label: "Checkout" }, { s: 4, icon: CheckCircle2, label: "Done" }].map((item) => (
                    <div key={item.s} className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${step >= item.s ? "bg-brand-500 border-dark-800 text-white script-check" : "bg-dark-800 border-white/20 text-gray-500"}`}>
                            <item.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-xs mt-2 font-medium ${step >= item.s ? "text-white" : "text-gray-500"}`}>{item.label}</span>
                    </div>
                ))}
            </div>

            {/* STEP 1: SEATS */}
            {step === 1 && (
                <div className="animate-in fade-in zoom-in duration-300">
                    <div className="w-full max-w-lg mx-auto mb-12">
                        <div className="w-full h-4 bg-gradient-to-b from-white/20 to-transparent rounded shadow-[0_10px_20px_rgba(255,255,255,0.05)] text-center text-xs text-white/50 pt-5">SCREEN</div>
                    </div>

                    <div className="grid grid-cols-8 gap-y-4 gap-x-2 max-w-2xl mx-auto mb-10">
                        {Array.from({ length: 48 }).map((_, i) => {
                            const row = String.fromCharCode(65 + Math.floor(i / 8));
                            const num = (i % 8) + 1;
                            const id = `${row}${num}`;
                            const isSelected = selectedSeats.includes(id);
                            // Randomly disable some seats for PoC
                            const isOccupied = (i % 7 === 0) || (i === 12);

                            return (
                                <button
                                    key={id} disabled={isOccupied}
                                    onClick={() => toggleSeat(id)}
                                    className={`aspect-square rounded-t-lg rounded-b-sm flex items-center justify-center text-xs font-bold transition-all ${isOccupied ? "bg-white/5 text-transparent cursor-not-allowed" :
                                        isSelected ? "bg-brand-500 text-white shadow-[0_0_15px_rgba(229,9,20,0.5)] scale-110" :
                                            "bg-white/20 text-white/50 hover:bg-white/30 hover:text-white"
                                        }`}
                                >
                                    {id}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex justify-between items-center bg-black/30 p-4 rounded-xl">
                        <div>
                            <p className="text-gray-400 text-sm mb-1">Selected Seats ({selectedSeats.length})</p>
                            <p className="font-bold text-lg">{selectedSeats.length > 0 ? selectedSeats.join(', ') : "None"}</p>
                        </div>
                        <button disabled={selectedSeats.length === 0} onClick={() => setStep(2)} className="flex items-center gap-2 bg-brand-500 enabled:hover:bg-brand-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-bold transition">
                            Next Step <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 2: SNACKS */}
            {step === 2 && (
                <div className="animate-in fade-in zoom-in duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {snacks.map(snack => {
                            const qty = selectedSnacks[snack.uid] || 0;
                            return (
                                <div key={snack.uid} className="flex flex-col sm:flex-row items-center justify-between p-4 glass-panel rounded-xl hover:border-brand-500/50 transition duration-300">
                                    <div>
                                        <h4 className="font-bold text-lg">{snack.title}</h4>
                                        <p className="text-sm text-gray-400 mb-2">{snack.description}</p>
                                        <span className="text-gold font-mono font-bold">${snack.price.toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center gap-4 mt-4 sm:mt-0 bg-dark-900 rounded-full p-1 border border-white/10">
                                        <button onClick={() => handleSnackQty(snack.uid, -1)} className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition">-</button>
                                        <span className="font-bold w-4 text-center">{qty}</span>
                                        <button onClick={() => handleSnackQty(snack.uid, 1)} className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition">+</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="flex justify-between items-center bg-black/30 p-4 rounded-xl">
                        <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-400 hover:text-white font-bold transition">
                            <ChevronLeft className="w-5 h-5" /> Back
                        </button>
                        <button onClick={() => setStep(3)} className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-lg font-bold transition">
                            Checkout <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 3: CHECKOUT */}
            {step === 3 && (
                <form onSubmit={submitOrder} className="animate-in fade-in zoom-in duration-300">
                    <div className="grid md:grid-cols-2 gap-10 mb-10">
                        <div className="space-y-4">
                            <label className="block">
                                <span className="text-sm font-semibold text-gray-400">Full Name</span>
                                <input required type="text" className="mt-1 block w-full rounded-lg bg-dark-900 border-white/10 focus:border-brand-500 focus:ring-brand-500 text-white p-3 border"
                                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Jane Doe" />
                            </label>
                            <label className="block">
                                <span className="text-sm font-semibold text-gray-400">Email Address</span>
                                <input required type="email" className="mt-1 block w-full rounded-lg bg-dark-900 border-white/10 focus:border-brand-500 focus:ring-brand-500 text-white p-3 border"
                                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="jane@example.com" />
                            </label>

                            <div className="pt-4 border-t border-white/10 mt-6 !mb-2">
                                <span className="text-sm font-semibold text-gray-400 mb-3 block">Payment Method</span>
                                <div className="flex gap-4">
                                    <label className="flex-1 text-center cursor-pointer">
                                        <input type="radio" className="peer sr-only" name="payment" value="arrival" checked={formData.payment === 'arrival'} onChange={e => setFormData({ ...formData, payment: e.target.value })} />
                                        <div className="p-4 rounded-lg border border-white/20 peer-checked:border-brand-500 peer-checked:bg-brand-500/10 transition font-medium">Pay on Arrival</div>
                                    </label>
                                    <label className="flex-1 text-center cursor-pointer">
                                        <input type="radio" className="peer sr-only" name="payment" value="card" checked={formData.payment === 'card'} onChange={e => setFormData({ ...formData, payment: e.target.value })} />
                                        <div className="p-4 rounded-lg border border-white/20 peer-checked:border-brand-500 peer-checked:bg-brand-500/10 transition font-medium">Credit Card</div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl h-fit">
                            <h3 className="font-bold text-xl mb-4 border-b border-white/10 pb-4">Order Summary</h3>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-400">Movie Tickets ({selectedSeats.length}x)</span>
                                <span className="font-mono">${(selectedSeats.length * 15).toFixed(2)}</span>
                            </div>
                            {Object.keys(selectedSnacks).map(id => {
                                const qty = selectedSnacks[parseInt(id)];
                                if (qty <= 0) return null;
                                const snack = snacks.find(s => s.uid === parseInt(id));
                                if (!snack) return null;
                                return (
                                    <div key={id} className="flex justify-between mb-2">
                                        <span className="text-gray-400">{snack.title} ({qty}x)</span>
                                        <span className="font-mono">${(snack.price * qty).toFixed(2)}</span>
                                    </div>
                                )
                            })}
                            <div className="border-t border-white/10 mt-6 pt-4 flex justify-between font-bold text-xl text-brand-500">
                                <span>Total</span>
                                <span className="font-mono">
                                    ${calculateTotalPrice(selectedSeats.length, 15, selectedSnacks, snacks).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center bg-black/30 p-4 rounded-xl">
                        <button type="button" onClick={() => setStep(2)} className="flex items-center gap-2 text-gray-400 hover:text-white font-bold transition">
                            <ChevronLeft className="w-5 h-5" /> Back
                        </button>
                        <button type="submit" className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 rounded-lg font-bold transition">
                            Confirm Booking <CheckCircle2 className="w-5 h-5 ml-1" />
                        </button>
                    </div>
                </form>
            )}

            {/* STEP 4: SUCCESS */}
            {step === 4 && (
                <div className="text-center py-16 animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h2 className="text-4xl font-extrabold mb-4">You're all set!</h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-lg mx-auto">
                        Your tickets for <strong className="text-white">{movie.title}</strong> have been booked. An email confirmation has been sent to {formData.email}.
                    </p>
                    <a href="/" className="inline-block bg-white text-black font-bold px-8 py-3 rounded-lg hover:bg-gray-200 transition">
                        Back to Home
                    </a>
                </div>
            )}

        </div>
    );
}
