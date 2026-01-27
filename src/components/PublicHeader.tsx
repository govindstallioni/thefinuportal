"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function PublicHeader() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md border-b border-slate-100 py-3" : "bg-transparent py-5"
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/">
                            <img src="/logo-full.png" alt="ThefinU Logo" className="h-10 w-auto" />
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/#features" className="text-sm font-semibold text-slate-600 hover:text-secondary transition-colors">Features</Link>
                        <Link href="/#how-it-works" className="text-sm font-semibold text-slate-600 hover:text-secondary transition-colors">How it Works</Link>
                        <Link href="/#pricing" className="text-sm font-semibold text-slate-600 hover:text-secondary transition-colors">Pricing</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
