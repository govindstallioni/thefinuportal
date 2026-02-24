"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function PublicHeader() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrolled
                ? "bg-white/90 backdrop-blur-xl border-b border-slate-100 py-3 shadow-sm"
                : "bg-transparent py-5"
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/">
                            <img src="/logo-full.png" alt="ThefinU Logo" className="h-9 w-auto" />
                        </Link>
                    </div>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/#features" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
                            Features
                        </Link>
                        <Link href="/#how-it-works" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
                            How it Works
                        </Link>
                        <Link href="/#what-people-say" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
                            Reviews
                        </Link>
                        <Link href="/#pricing" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
                            Pricing
                        </Link>
                    </div>


                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-slate-100 pt-4 space-y-1 animate-slide-up">
                        {[
                            { href: "/#features", label: "Features" },
                            { href: "/#how-it-works", label: "How it Works" },
                            { href: "/#what-people-say", label: "Reviews" },
                            { href: "/#pricing", label: "Pricing" },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-4 py-3 text-sm font-semibold text-slate-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
