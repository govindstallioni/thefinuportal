"use client";

import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import {
    ArrowRight,
    ShieldCheck,
    Zap,
    Layers,
    CheckCircle2,
    Table as TableIcon,
    RefreshCw,
    Lock,
    Star,
    CreditCard,
    TrendingUp,
    PiggyBank,
    Building2,
    Landmark,
    BadgeCheck,
    ChevronRight,
    Sparkles,
    BarChart3,
    Clock,
    Globe,
    Smartphone,
    FileSpreadsheet,
    DollarSign,
    LineChart,
    Wallet,
    CircleDollarSign,
    Users,
    Plus,
    Minus,
    ArrowUpRight
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const INSTALL_LINK = "https://workspace.google.com/marketplace/app/thefinu/123456789";

function useReveal() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.querySelectorAll('.reveal').forEach(child => child.classList.add('revealed'));
                    el.classList.add('revealed');
                }
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return ref;
}

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    let current = 0;
                    const increment = end / 60;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= end) { setCount(end); clearInterval(timer); }
                        else setCount(Math.floor(current));
                    }, 33);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end]);
    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-slate-100 last:border-0">
            <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
                <span className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors pr-4">{q}</span>
                <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${open ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                </div>
            </button>
            <div className={`faq-answer ${open ? 'open' : ''}`}>
                <div><p className="pb-5 text-slate-500 leading-relaxed text-sm">{a}</p></div>
            </div>
        </div>
    );
}

const bankRows = [
    ["Chase", "Bank of America", "Wells Fargo", "Citi", "Capital One", "US Bank", "PNC", "TD Bank", "Ally", "Discover", "American Express", "Charles Schwab"],
    ["Fidelity", "Vanguard", "USAA", "Navy Federal", "SoFi", "Marcus", "Robinhood", "Coinbase", "PayPal", "Venmo", "Chime", "Wealthfront"]
];

export default function HomePage() {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => { setIsVisible(true); }, []);

    const statsRef = useReveal();
    const featuresRef = useReveal();
    const howRef = useReveal();
    const testimonialsRef = useReveal();
    const securityRef = useReveal();
    const pricingRef = useReveal();
    const faqRef = useReveal();

    return (
        <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans selection:bg-primary/10">
            <PublicHeader />

            <main className="flex-grow">

                {/* ── HERO ── */}
                <section className="relative pt-28 pb-16 lg:pt-40 lg:pb-24 overflow-hidden hero-gradient">
                    <div className="absolute inset-0 dot-pattern" />
                    <div className="absolute top-20 left-[8%] w-80 h-80 bg-primary/[0.03] rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-10 right-[5%] w-[28rem] h-[28rem] bg-secondary/[0.02] rounded-full blur-3xl animate-float-delayed" />

                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-3xl mx-auto">
                            <div className={`inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary/10 rounded-full px-4 py-1.5 mb-7 shadow-sm transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                                <span className="text-xs font-semibold text-slate-600">Trusted by thousands of spreadsheet lovers</span>
                            </div>

                            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 mb-5 leading-[1.1] transition-all duration-1000 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                Automate Your Finances
                                <br className="hidden md:block" />
                                <span className="relative inline-block mt-1">
                                    in <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Google Sheets</span>
                                </span>
                            </h1>

                            <p className={`text-sm md:text-base font-medium text-slate-500 mb-8 max-w-xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                ThefinU syncs your bank transactions, balances, and investments directly into Google Sheets — track your finances with zero effort.
                            </p>

                            <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <a href={INSTALL_LINK} target="_blank" rel="noopener noreferrer"
                                    className="group w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-white px-8 py-3.5 rounded-xl text-base font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2">
                                    Install on Google Sheets
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>

                            <div className={`mt-5 flex items-center justify-center gap-5 text-xs text-slate-400 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <span className="flex items-center gap-1"><BadgeCheck className="h-3.5 w-3.5 text-emerald-500" /> Free trial</span>
                                <span className="flex items-center gap-1"><CreditCard className="h-3.5 w-3.5 text-slate-400" /> No card needed</span>
                                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-slate-400" /> 2-min setup</span>
                            </div>

                            <div className={`mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 transition-all duration-1000 delay-[900ms] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                                <span>Powered by <span className="font-semibold text-slate-500">Plaid</span> — bank-level security</span>
                            </div>
                        </div>

                        {/* Dashboard Preview */}
                        <div className={`mt-12 lg:mt-16 relative max-w-5xl mx-auto transition-all duration-1000 delay-[900ms] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary/8 via-transparent to-secondary/8 rounded-[2rem] blur-2xl" />
                            <div className="relative bg-white rounded-2xl p-2 shadow-2xl shadow-slate-900/8 border border-slate-200/80">
                                <div className="bg-white rounded-xl overflow-hidden flex flex-col md:flex-row">
                                    {/* Sidebar */}
                                    <div className="hidden md:flex flex-col w-52 bg-slate-50 border-r border-slate-100 p-3.5">
                                        <div className="flex items-center gap-2 mb-5">
                                            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                                <DollarSign className="h-3.5 w-3.5 text-white" />
                                            </div>
                                            <span className="font-bold text-slate-800 text-xs">ThefinU</span>
                                        </div>
                                        <div className="space-y-0.5 mb-5">
                                            {[
                                                { label: "Transactions", icon: FileSpreadsheet, active: true },
                                                { label: "Balances", icon: Wallet, active: false },
                                                { label: "Analytics", icon: LineChart, active: false },
                                                { label: "Budget", icon: PiggyBank, active: false },
                                            ].map((item, i) => (
                                                <div key={i} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] font-semibold ${item.active ? 'bg-primary/10 text-primary' : 'text-slate-400'}`}>
                                                    <item.icon className="h-3 w-3" />{item.label}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-auto space-y-2">
                                            <div className="bg-white p-2.5 rounded-lg border border-slate-100">
                                                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Net Worth</div>
                                                <div className="text-base font-bold text-slate-900">$48,230</div>
                                                <div className="flex items-center gap-0.5 mt-0.5">
                                                    <ArrowUpRight className="h-2.5 w-2.5 text-emerald-500" />
                                                    <span className="text-[9px] font-bold text-emerald-600">+4.2%</span>
                                                </div>
                                            </div>
                                            <div className="bg-white p-2.5 rounded-lg border border-slate-100">
                                                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Spending</div>
                                                <div className="text-base font-bold text-slate-900">$3,240</div>
                                                <div className="w-full h-1 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: '65%' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Main */}
                                    <div className="flex-1 flex flex-col">
                                        <div className="h-9 border-b border-slate-100 flex items-center px-3 justify-between bg-slate-50/60">
                                            <div className="flex space-x-1.5">
                                                <div className="w-2 h-2 rounded-full bg-red-300/80" />
                                                <div className="w-2 h-2 rounded-full bg-amber-300/80" />
                                                <div className="w-2 h-2 rounded-full bg-emerald-300/80" />
                                            </div>
                                            <div className="px-2.5 py-1 bg-white border border-slate-200 rounded text-[10px] font-medium text-slate-400 flex items-center">
                                                <Lock className="h-2 w-2 mr-1 text-emerald-500" />docs.google.com/spreadsheets
                                            </div>
                                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30" />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-slate-50/80 text-[9px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-100">
                                                        <th className="px-3 py-2 border-r border-slate-100">Date</th>
                                                        <th className="px-3 py-2 border-r border-slate-100">Description</th>
                                                        <th className="px-3 py-2 border-r border-slate-100 hidden sm:table-cell">Category</th>
                                                        <th className="px-3 py-2">Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-xs font-medium">
                                                    {[
                                                        { date: "Feb 24", desc: "Whole Foods", cat: "Groceries", amt: "-$84.32", catColor: "bg-emerald-50 text-emerald-700" },
                                                        { date: "Feb 23", desc: "Apple Music", cat: "Subscriptions", amt: "-$10.99", catColor: "bg-violet-50 text-violet-700" },
                                                        { date: "Feb 23", desc: "Shell Gas", cat: "Transport", amt: "-$45.00", catColor: "bg-blue-50 text-blue-700" },
                                                        { date: "Feb 22", desc: "Salary Deposit", cat: "Income", amt: "+$4,200", color: "text-emerald-600", catColor: "bg-emerald-50 text-emerald-700" },
                                                        { date: "Feb 21", desc: "Starbucks", cat: "Dining", amt: "-$6.50", catColor: "bg-amber-50 text-amber-700" },
                                                        { date: "Feb 20", desc: "Rent Payment", cat: "Housing", amt: "-$2,100", catColor: "bg-rose-50 text-rose-700" },
                                                    ].map((row, i) => (
                                                        <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                                            <td className="px-3 py-2.5 border-r border-slate-50 text-slate-400 text-[11px]">{row.date}</td>
                                                            <td className="px-3 py-2.5 border-r border-slate-50 font-semibold text-slate-800">{row.desc}</td>
                                                            <td className="px-3 py-2.5 border-r border-slate-50 hidden sm:table-cell">
                                                                <span className={`text-[8px] uppercase tracking-wide font-bold px-1.5 py-0.5 rounded-full ${row.catColor}`}>{row.cat}</span>
                                                            </td>
                                                            <td className={`px-3 py-2.5 font-bold tabular-nums ${row.color || 'text-slate-900'}`}>{row.amt}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                {/* ── BANK LOGOS ── */}
                <section className="py-12 bg-slate-50/50 border-y border-slate-100 overflow-hidden">
                    <p className="text-center text-sm text-slate-500 mb-8 px-4">
                        Connects with <span className="font-bold text-primary">12,000+</span> financial institutions via Plaid
                    </p>
                    <div className="space-y-3">
                        {bankRows.map((row, rowIndex) => (
                            <div key={rowIndex} className="relative">
                                <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-slate-50/50 to-transparent z-10" />
                                <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-slate-50/50 to-transparent z-10" />
                                <div className={`flex gap-3 ${rowIndex === 0 ? 'animate-marquee' : 'animate-marquee-reverse'}`}>
                                    {[...row, ...row].map((bank, i) => {
                                        const colors = ["text-rose-400", "text-blue-400", "text-emerald-400", "text-violet-400", "text-amber-400", "text-cyan-400", "text-pink-400", "text-indigo-400", "text-teal-400", "text-orange-400", "text-fuchsia-400", "text-sky-400"];
                                        return (
                                            <div key={i} className="flex-shrink-0 px-4 py-2.5 bg-white rounded-lg border border-slate-100 text-sm font-semibold text-slate-500 whitespace-nowrap flex items-center gap-2">
                                                <Building2 className={`h-3.5 w-3.5 ${colors[i % colors.length]}`} />{bank}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                {/* ── STATS ── */}
                <section className="py-16 bg-gradient-to-b from-white to-slate-50/30" ref={statsRef}>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { value: 12000, suffix: "+", label: "Institutions", icon: Landmark, iconBg: "bg-rose-50", iconColor: "text-rose-500" },
                                { value: 50, suffix: "+", label: "Countries", icon: Globe, iconBg: "bg-blue-50", iconColor: "text-blue-500" },
                                { value: 256, suffix: "-bit", label: "Encryption", icon: ShieldCheck, iconBg: "bg-emerald-50", iconColor: "text-emerald-500" },
                                { value: 99, suffix: ".9%", label: "Uptime", icon: Zap, iconBg: "bg-amber-50", iconColor: "text-amber-500" },
                            ].map((stat, i) => (
                                <div key={i} className={`reveal reveal-delay-${i + 1} group text-center p-5 rounded-xl bg-white border border-slate-200 transition-all duration-300`}>
                                    <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${stat.iconBg} ${stat.iconColor} mb-3`}>
                                        <stat.icon className="h-4 w-4" />
                                    </div>
                                    <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">
                                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div className="w-8 h-0.5 bg-gradient-to-r from-primary/40 to-secondary/20 rounded-full mx-auto mb-2" />
                                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                {/* ── FEATURES ── */}
                <section id="features" className="py-20 bg-slate-50/40" ref={featuresRef}>
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 reveal">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-3">Everything you need to manage money</h2>
                            <p className="text-slate-500 max-w-lg mx-auto text-sm">Finance app power meets spreadsheet flexibility.</p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {[
                                { title: "Automatic daily syncs", desc: "Transactions, balances, and accounts sync multiple times per day. No CSV imports needed.", icon: RefreshCw, iconColor: "text-emerald-500", iconBg: "bg-emerald-50" },
                                { title: "Ready-made templates", desc: "Budget trackers, net worth dashboards, expense reports — pro templates out of the box.", icon: Layers, iconColor: "text-violet-500", iconBg: "bg-violet-50" },
                                { title: "100% customizable", desc: "Add formulas, pivot tables, charts — anything Sheets supports. Your data, your rules.", icon: TableIcon, iconColor: "text-blue-500", iconBg: "bg-blue-50" },
                                { title: "Multi-account support", desc: "Banks, credit cards, investments, loans, crypto — all visible in one spreadsheet.", icon: CreditCard, iconColor: "text-rose-500", iconBg: "bg-rose-50" },
                                { title: "Smart categorization", desc: "Transactions auto-categorize so you instantly see where your money goes.", icon: BarChart3, iconColor: "text-amber-500", iconBg: "bg-amber-50" },
                                { title: "Works on any device", desc: "Desktop, tablet, or phone — Google Sheets works seamlessly everywhere.", icon: Smartphone, iconColor: "text-cyan-500", iconBg: "bg-cyan-50" }
                            ].map((item, i) => (
                                <div key={i} className={`reveal reveal-delay-${(i % 3) + 1} group card-shine bg-white rounded-xl p-6 border border-slate-200 transition-all duration-300`}>
                                    <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center ${item.iconColor} mb-4 group-hover:scale-110 transition-transform`}>
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <h4 className="text-sm font-bold text-slate-950 mb-1.5">{item.title}</h4>
                                    <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                {/* ── HOW IT WORKS ── */}
                <section id="how-it-works" className="py-20 bg-white" ref={howRef}>
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 reveal">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-3">Get started in three simple steps</h2>
                            <p className="text-slate-500 max-w-lg mx-auto text-sm">Three simple steps to automated finance tracking.</p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-5">
                            {[
                                { step: "01", title: "Link your accounts", icon: CreditCard, iconBg: "bg-blue-50", iconColor: "text-blue-500",
                                  points: ["Connect with 12,000+ banks via Plaid", "Link checking, savings, cards, investments", "Get transaction history imported instantly"] },
                                { step: "02", title: "Get automatic updates", icon: RefreshCw, iconBg: "bg-emerald-50", iconColor: "text-emerald-500",
                                  points: ["Multiple daily updates — completely hands-free", "Transactions and balances always current", "Never manually enter data again"] },
                                { step: "03", title: "Make it your own", icon: TrendingUp, iconBg: "bg-violet-50", iconColor: "text-violet-500",
                                  points: ["Start with premade budget templates", "Add formulas, charts, and pivot tables", "Build dashboards on top of live data"] }
                            ].map((step, i) => (
                                <div key={i} className={`reveal reveal-delay-${i + 1} group ${i < 2 ? 'timeline-connector' : ''}`}>
                                    <div className="bg-white p-6 rounded-xl border border-slate-200 transition-all duration-300 h-full flex flex-col">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold shrink-0">
                                                {i + 1}
                                            </div>
                                            <div className={`w-11 h-11 rounded-xl ${step.iconBg} flex items-center justify-center ${step.iconColor} group-hover:scale-105 transition-transform`}>
                                                <step.icon className="h-5 w-5" />
                                            </div>
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-950 mb-3">{step.title}</h4>
                                        <ul className="space-y-2 mb-auto">
                                            {step.points.map((point, j) => (
                                                <li key={j} className="flex items-start text-sm text-slate-500 leading-relaxed">
                                                    <CheckCircle2 className={`h-3.5 w-3.5 ${step.iconColor} mr-2 shrink-0 mt-0.5`} />
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                {/* ── TESTIMONIALS ── */}
                <section id="what-people-say" className="py-20 bg-slate-50/40" ref={testimonialsRef}>
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 reveal">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-3">Loved by spreadsheet enthusiasts</h2>
                            <p className="text-slate-500 max-w-lg mx-auto text-sm">See why thousands trust ThefinU for finance tracking.</p>
                        </div>

                        {/* Featured */}
                        <div className="reveal mb-8">
                            <div className="relative bg-white rounded-xl border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center shadow-sm">
                                <div className="absolute top-4 right-6 text-6xl font-serif text-primary/[0.07] leading-none select-none">&ldquo;</div>
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-lg font-bold shrink-0">JR</div>
                                <div>
                                    <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 text-amber-400 fill-amber-400" />)}</div>
                                    <p className="text-sm text-slate-700 leading-relaxed mb-3">
                                        &ldquo;I&apos;ve tried every budgeting app — Mint, YNAB, Copilot — but nothing gives me the control a spreadsheet does. ThefinU is the missing piece.&rdquo;
                                    </p>
                                    <div className="text-sm"><span className="font-bold text-slate-900">Jason Rivera</span> <span className="text-slate-400">/ Product Manager</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-5">
                            {[
                                { quote: "Makes budgeting in Sheets so convenient. I finally have a system I stick with!", author: "Cameron Kelley", role: "Designer", avatar: "CK", gradient: "from-violet-500 to-purple-600" },
                                { quote: "Customer support is exceptional. They genuinely care about making a great product.", author: "Sarah Mason", role: "Business Owner", avatar: "SM", gradient: "from-rose-500 to-pink-600" },
                                { quote: "Templates are incredibly well-designed. Combined with auto-sync, it's perfect.", author: "Matt Loh", role: "Engineer", avatar: "ML", gradient: "from-blue-500 to-cyan-600" }
                            ].map((t, i) => (
                                <div key={i} className={`reveal reveal-delay-${i + 1} bg-white p-5 rounded-xl border border-slate-200 transition-all duration-300 flex flex-col`}>
                                    <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, j) => <Star key={j} className="h-3 w-3 text-amber-400 fill-amber-400" />)}</div>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">&ldquo;{t.quote}&rdquo;</p>
                                    <div className="flex items-center gap-2.5">
                                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-[10px] font-bold`}>{t.avatar}</div>
                                        <div><div className="font-bold text-slate-900 text-sm">{t.author}</div><div className="text-sm text-slate-400">{t.role}</div></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                {/* ── SECURITY ── */}
                <section className="py-20 bg-white" ref={securityRef}>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="reveal bg-slate-50/60 rounded-2xl border border-slate-200 overflow-hidden">
                            <div className="grid md:grid-cols-2 gap-0">
                                <div className="bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/30 p-8 md:p-10 flex flex-col justify-center items-center">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/15 mb-6">
                                        <ShieldCheck className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="flex gap-3">
                                        {[
                                            { icon: Lock, label: "256-bit", iconColor: "text-blue-500", bg: "bg-blue-50" },
                                            { icon: BadgeCheck, label: "SOC 2", iconColor: "text-emerald-500", bg: "bg-emerald-50" },
                                            { icon: ShieldCheck, label: "Read-only", iconColor: "text-amber-500", bg: "bg-amber-50" },
                                        ].map((b, i) => (
                                            <div key={i} className="bg-white rounded-lg p-2.5 text-center border border-slate-200">
                                                <div className={`w-7 h-7 rounded-md ${b.bg} flex items-center justify-center mx-auto mb-1`}>
                                                    <b.icon className={`h-3.5 w-3.5 ${b.iconColor}`} />
                                                </div>
                                                <div className="text-xs font-bold text-slate-600">{b.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-8 md:p-10 flex flex-col justify-center">
                                    <h2 className="text-xl md:text-2xl font-bold text-slate-950 mb-3">Private and secure</h2>
                                    <p className="text-sm text-slate-500 leading-relaxed mb-5">
                                        ThefinU never accesses your bank credentials and never sells your data. Plaid&apos;s bank-level security keeps your info safe.
                                    </p>
                                    <ul className="space-y-2.5 mb-5">
                                        {["Credentials never touch our servers", "Data encrypted in transit and at rest", "Read-only — we can never move money", "Disconnect accounts anytime"].map((p, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />{p}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href="/privacy" className="text-sm text-primary font-bold hover:underline inline-flex items-center gap-1 group w-fit">
                                        Privacy policy <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                {/* ── PRICING ── */}
                <section id="pricing" className="py-20 bg-slate-50/40" ref={pricingRef}>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10 reveal">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-3">Simple, transparent pricing</h2>
                            <p className="text-slate-500 text-sm">One plan. Everything included.</p>
                        </div>

                        <div className="reveal grid md:grid-cols-2 gap-6 items-start max-w-3xl mx-auto">
                            <div className="gradient-border-card glow-primary bg-white rounded-2xl p-7 relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-secondary text-white text-[9px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Best value</div>
                                <div className="text-sm font-bold text-primary mb-1.5">ThefinU Pro</div>
                                <div className="flex items-end gap-1 mb-0.5">
                                    <span className="text-4xl font-bold text-slate-950">$29</span>
                                    <span className="text-sm font-medium text-slate-400 pb-0.5">/ year</span>
                                </div>
                                <div className="text-sm text-slate-500 mb-5">That&apos;s just <span className="font-bold text-primary">$2.42/month</span></div>
                                <div className="h-px bg-slate-100 mb-5" />
                                <ul className="space-y-2.5 mb-6">
                                    {["Unlimited bank connections", "Multiple daily auto-syncs", "Full transaction history", "Free templates", "Smart categorization", "Priority support", "14-day free trial"].map((f, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />{f}
                                        </li>
                                    ))}
                                </ul>
                                <a href={INSTALL_LINK} target="_blank" rel="noopener noreferrer"
                                    className="group w-full bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl text-sm font-bold shadow-sm shadow-primary/20 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-1.5">
                                    Install on Google Sheets <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                </a>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-slate-950">Why it&apos;s worth it</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">Most people spend 2-4 hours/month manually tracking finances. ThefinU saves all that — for less than a coffee per month.</p>
                                {[
                                    { icon: Clock, title: "Save 30+ hours/year", desc: "No more manual data entry or CSV exports.", iconBg: "bg-blue-50", iconColor: "text-blue-500" },
                                    { icon: CircleDollarSign, title: "Cheaper than alternatives", desc: "YNAB: $99/yr. Copilot: $96/yr. ThefinU: $29/yr.", iconBg: "bg-emerald-50", iconColor: "text-emerald-500" },
                                    { icon: LineChart, title: "Better awareness", desc: "Tracking spending reduces unnecessary expenses by 15%.", iconBg: "bg-amber-50", iconColor: "text-amber-500" },
                                    { icon: Users, title: "Share with partner", desc: "Collaborate using Google Sheets sharing.", iconBg: "bg-violet-50", iconColor: "text-violet-500" },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3 p-3.5 rounded-xl bg-white border border-slate-200 transition-all">
                                        <div className={`w-9 h-9 rounded-lg ${item.iconBg} flex items-center justify-center ${item.iconColor} shrink-0`}>
                                            <item.icon className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">{item.title}</div>
                                            <div className="text-sm text-slate-500 mt-0.5">{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                {/* ── FAQ ── */}
                <section className="py-20 bg-white" ref={faqRef}>
                    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10 reveal">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-3">Frequently asked questions</h2>
                            <p className="text-slate-500 text-sm">Everything you need to know.</p>
                        </div>
                        <div className="reveal bg-white rounded-xl border border-slate-200 p-6 md:p-8">
                            {[
                                { q: "How does ThefinU connect to my bank?", a: "Via Plaid — the same service used by Venmo, Robinhood, and thousands of apps. Your credentials go directly to Plaid; we never see them." },
                                { q: "Is my financial data secure?", a: "Yes. 256-bit encryption, read-only access only. We can never initiate transactions or move your money." },
                                { q: "What banks are supported?", a: "Over 12,000 institutions across 50+ countries — Chase, BofA, Wells Fargo, Fidelity, Vanguard, and many more." },
                                { q: "How often does data sync?", a: "Multiple times per day automatically. New transactions typically appear within hours of posting." },
                                { q: "Can I cancel anytime?", a: "Absolutely. Cancel from settings anytime. Your spreadsheet stays yours — it's a regular Google Sheet." },
                                { q: "Do I need advanced spreadsheet skills?", a: "Not at all! Templates work out of the box. Power users can customize everything." },
                            ].map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
                        </div>
                    </div>
                </section>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                {/* ── FINAL CTA ── */}
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
                    <div className="absolute inset-0 grid-pattern opacity-40" />
                    <div className="absolute top-10 left-[10%] w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-10 right-[10%] w-48 h-48 bg-secondary/15 rounded-full blur-3xl animate-float-delayed" />

                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Ready to take control of your finances?
                        </h2>
                        <p className="text-sm text-slate-400 mb-8 max-w-lg mx-auto">
                            Join thousands managing money smarter with ThefinU and Google Sheets.
                        </p>
                        <div className="relative inline-flex">
                            <div className="absolute -inset-1 bg-white/20 rounded-2xl blur-md animate-pulse-glow" />
                            <a href={INSTALL_LINK} target="_blank" rel="noopener noreferrer"
                                className="relative group inline-flex bg-white text-slate-900 px-8 py-3.5 rounded-xl text-base font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 items-center gap-2">
                                Install on Google Sheets <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                        <div className="mt-5 flex items-center justify-center gap-5 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><BadgeCheck className="h-3.5 w-3.5 text-emerald-400" /> Free trial</span>
                            <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Secure</span>
                            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-slate-500" /> 2-min setup</span>
                        </div>
                    </div>
                </section>
            </main>

            <PublicFooter />
        </div>
    );
}
