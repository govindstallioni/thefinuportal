import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function PublicFooter() {
    return (
        <footer className="bg-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-1">
                        <Link href="/">
                            <img src="/logo-full.png" alt="ThefinU Logo" className="h-8 mb-6" />
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                            Bridging the gap between your bank and your favorite spreadsheet. Secure, automatic, and simple.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Product</h4>
                        <ul className="space-y-4 text-sm text-slate-500 font-medium">
                            <li><Link href="/#features" className="hover:text-primary transition-colors">Features</Link></li>
                            <li><Link href="/#how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
                            <li><Link href="/#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Legal</h4>
                        <ul className="space-y-4 text-sm text-slate-500 font-medium">
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Contact</h4>
                        <ul className="space-y-4 text-sm text-slate-500 font-medium">
                            <li><a href="mailto:support@thefinu.com" className="hover:text-primary transition-colors">support@thefinu.com</a></li>
                            <li className="flex items-center">
                                Denver, Colorado <ExternalLink className="ml-2 h-3 w-3 opacity-50" />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 gap-4">
                    <p>&copy; {new Date().getFullYear()} ThefinU, LLC. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <span className="font-mono text-[10px] uppercase tracking-tighter text-slate-300">v1.0.0</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
