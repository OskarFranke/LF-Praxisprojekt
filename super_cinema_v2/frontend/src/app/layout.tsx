import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Film } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Super Cinema V2",
  description: "Experience movies like never before.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <nav className="sticky top-0 z-50 glass-panel border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <Film className="w-8 h-8 text-brand-500" />
            <span className="text-xl font-bold tracking-tight text-gradient">Super Cinema</span>
          </Link>
          <div className="flex gap-6 text-sm font-medium text-gray-300">
            <Link href="/" className="hover:text-white transition">Movies</Link>
            <Link href="/snacks" className="hover:text-white transition">Snacks</Link>
          </div>
        </nav>
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="py-8 text-center text-sm text-gray-500 border-t border-white/5 mt-10">
          <p>© {new Date().getFullYear()} Super Cinema V2. Powered by Headless TYPO3 & Next.js.</p>
        </footer>
      </body>
    </html>
  );
}
