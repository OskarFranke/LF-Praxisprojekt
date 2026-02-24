import { fetchSnacks } from "@/lib/api";
import { Coffee, Popcorn, ShoppingBag } from "lucide-react";

export default async function SnacksPage() {
    const snacks = await fetchSnacks();

    const drinks = snacks.filter(s => s.category === 'drink');
    const food = snacks.filter(s => s.category === 'food' || !s.category);

    return (
        <div className="max-w-7xl mx-auto px-6 py-16 w-full animate-in slide-in-from-bottom-8 duration-700">
            <header className="mb-16 text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 flex items-center justify-center gap-4 text-gradient">
                    <Popcorn className="w-12 h-12 text-brand-500" />
                    Snacks & Drinks
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">Enhance your movie experience with our selection of premium refreshments.</p>
            </header>

            {food.length > 0 && (
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
                        <ShoppingBag className="w-8 h-8 text-brand-400" />
                        Food & Popcorn
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {food.map(snack => (
                            <SnackCard key={snack.uid} snack={snack} />
                        ))}
                    </div>
                </section>
            )}

            {drinks.length > 0 && (
                <section>
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
                        <Coffee className="w-8 h-8 text-brand-400" />
                        Beverages
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {drinks.map(snack => (
                            <SnackCard key={snack.uid} snack={snack} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

function SnackCard({ snack }: { snack: any }) {
    return (
        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4 border border-white/5 hover:border-brand-500/50 hover:bg-white/5 transition-all group">
            <div className="flex justify-between items-start gap-4">
                <h3 className="text-xl font-bold text-gray-100 group-hover:text-brand-400 transition-colors">{snack.title}</h3>
                <span className="text-lg font-black text-gold bg-gold/10 px-3 py-1 rounded-full whitespace-nowrap">
                    €{snack.price.toFixed(2)}
                </span>
            </div>
            {snack.description && (
                <div
                    className="text-gray-400 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: snack.description }}
                />
            )}
            <button className="mt-auto pt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-600/20 text-brand-400 font-semibold hover:bg-brand-500 hover:text-white transition-all">
                Add to Cart
            </button>
        </div>
    );
}
