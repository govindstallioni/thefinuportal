"use client";

import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import {
    ArrowRight,
    BarChart3,
    ShieldCheck,
    Zap,
    Layers,
    CheckCircle2,
    Play,
    Database,
    Table as TableIcon,
    RefreshCw,
    Lock
} from "lucide-react";
import { useState, useEffect } from "react";

// The custom link for Google Workspace Marketplace or Add-on installation
const INSTALL_LINK = "https://workspace.google.com/marketplace/app/thefinu/123456789"; // Placeholder link

export default function HomePage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans selection:bg-secondary/30 scroll-smooth">
            <PublicHeader />

            <main className="flex-grow">
                {/* Modern Hero Section */}
                <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
                    {/* Abstract Background Elements */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden text-sm">
                        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-50 rounded-full blur-[120px] opacity-60" />
                        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-slate-50 rounded-full blur-[100px] opacity-80" />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center">
                            <div className={`inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-1.5 mb-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">The Modern Way to Track Money</span>
                            </div>

                            <h1 className={`text-5xl lg:text-7xl font-bold tracking-tight text-slate-950 mb-8 max-w-5xl mx-auto leading-[1.1] transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                Your Bank, <br className="hidden md:block" />
                                <span className="text-secondary italic">Now in Sync</span> with Sheets.
                            </h1>

                            <p className={`text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                Connect your accounts directly to Google Sheets. No more manual exports or broken formulas. Get real-time financial clarity in the tool you already love.
                            </p>

                            <div className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-1000 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <a href={INSTALL_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-xl text-base font-bold shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center">
                                    Install on Google Sheet <ArrowRight className="ml-2 h-4 w-4" />
                                </a>
                                <button className="w-full sm:w-auto group bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl text-base font-bold hover:bg-slate-50 transition-all flex items-center justify-center">
                                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center mr-2.5 group-hover:bg-secondary group-hover:text-white transition-colors">
                                        <Play className="h-3 w-3 fill-current ml-0.5" />
                                    </div>
                                    Watch How
                                </button>
                            </div>
                        </div>

                        {/* Interactive App Teaser */}
                        <div className={`mt-20 relative max-w-4xl mx-auto transition-all duration-1000 delay-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                            <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent blur-3xl -z-10 rounded-[2rem]" />
                            <div className="bg-slate-900 rounded-[2rem] p-2 shadow-2xl border border-white/5 ring-1 ring-slate-800">
                                <div className="bg-white rounded-[1.4rem] overflow-hidden shadow-inner flex flex-col aspect-[16/10]">
                                    {/* App Bar Simulation */}
                                    <div className="h-10 border-b border-slate-100 flex items-center px-4 justify-between bg-slate-50/50">
                                        <div className="flex space-x-1">
                                            <div className="w-2.5 h-2.5 rounded-full bg-rose-200" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-amber-200" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-200" />
                                        </div>
                                        <div className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-bold text-slate-400 flex items-center tracking-tight text-sm">
                                            <Lock className="h-2 w-2 mr-1" /> app.thefinu.com
                                        </div>
                                        <div className="w-5 h-5 rounded-full bg-slate-200" />
                                    </div>
                                    {/* Dashboard Content Simulation */}
                                    <div className="flex-1 p-5 flex gap-5 bg-white overflow-hidden text-sm">
                                        <div className="w-36 space-y-3 border-r border-slate-50 pr-4">
                                            <div className="h-6 w-full bg-secondary/10 rounded animate-pulse" />
                                            {[1, 2, 3, 4].map(i => <div key={i} className="h-5 w-3/4 bg-slate-50 rounded" />)}
                                        </div>
                                        <div className="flex-1 space-y-5">
                                            <div className="grid grid-cols-3 gap-3">
                                                {[1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-50 rounded-xl border border-slate-50" />)}
                                            </div>
                                            <div className="h-32 w-full bg-emerald-50/20 rounded-2xl border border-emerald-50 relative overflow-hidden">
                                                <div className="absolute inset-0 flex items-end px-3 py-4">
                                                    <div className="flex items-end space-x-1.5 w-full h-full">
                                                        {[30, 60, 40, 80, 50, 70, 90].map((h, i) => (
                                                            <div key={i} className="flex-1 bg-secondary/15 rounded-t-md transition-all duration-1000" style={{ 'height': isVisible ? `${h}%` : '0%' }} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Social Proof trust bar - Modernized */}
                <section className="py-16 border-y border-slate-100 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-10 opacity-70">Powering better budgeting for people at</p>
                        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 invert-[0.1]">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-6 w-auto grayscale" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" alt="Samsung" className="h-4 w-auto grayscale" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-5 w-auto grayscale" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-6 w-auto grayscale" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" alt="LinkedIn" className="h-5 w-auto grayscale" />
                        </div>
                    </div>
                </section>

                {/* Modern Features Grid */}
                <section id="features" className="py-24 bg-slate-50/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-secondary font-black text-[10px] uppercase tracking-[0.2em] mb-4">Why ThefinU?</h2>
                                <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-950 mb-6 tracking-tight">Financial data, <br />without the manual labor.</h3>
                                <p className="text-base text-slate-500 mb-10 leading-relaxed">
                                    We've removed the bottleneck from financial tracking. No more downloading CSVs, no more checking multiple bank portals, and no more outdated spreadsheets.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        { title: "Direct Plaid Integration", icon: Database },
                                        { title: "Custom Formatting Support", icon: TableIcon },
                                        { title: "Weekly Sync Summaries", icon: RefreshCw }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-secondary border border-slate-100">
                                                <item.icon className="h-4 w-4" />
                                            </div>
                                            <span className="font-bold text-slate-800 text-sm">{item.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { icon: Zap, title: "Instant Sync", desc: "Data matches your bank almost immediately.", color: "hover:border-amber-100" },
                                    { icon: ShieldCheck, title: "SOC2 Security", desc: "Bank-level encryption for every packet.", color: "hover:border-secondary/20" },
                                    { icon: BarChart3, title: "Report Ready", desc: "Formulas stay intact after sync.", color: "hover:border-primary/20" },
                                    { icon: Layers, title: "Multi-Source", desc: "Banks, credit cards, and investments.", color: "hover:border-slate-200" }
                                ].map((feature, i) => (
                                    <div key={i} className={`bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 group ${feature.color} hover:-translate-y-1`}>
                                        <feature.icon className="h-6 w-6 text-slate-800 mb-5 group-hover:text-secondary transition-colors" />
                                        <h4 className="font-bold text-slate-900 mb-2 text-base">{feature.title}</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works - Visual Timeline */}
                <section id="how-it-works" className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-secondary font-black text-[10px] uppercase tracking-[0.2em] mb-4">The Process</h2>
                            <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-950">Setup in sixty seconds.</h3>
                        </div>

                        <div className="relative">
                            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 hidden lg:block -translate-y-1/2" />
                            <div className="grid lg:grid-cols-3 gap-12 lg:gap-8 font-sans">
                                {[
                                    { step: "01", title: "Add to Sheets", desc: "Install our add-on from the Marketplace with one click." },
                                    { step: "02", title: "Link Accounts", desc: "Connect your institutions securely via Plaid." },
                                    { step: "03", title: "Watch the Magic", desc: "Your transactions flow into your sheet automatically." }
                                ].map((step, i) => (
                                    <div key={i} className="relative bg-white lg:bg-transparent z-10 flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-xl bg-slate-950 text-white flex items-center justify-center font-black text-lg mb-6 shadow-lg shadow-slate-100 ring-4 ring-white">
                                            {step.step}
                                        </div>
                                        <h4 className="font-bold text-slate-900 mb-2 text-base">{step.title}</h4>
                                        <p className="text-xs text-slate-500 text-center max-w-xs">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Section - Simplified */}
                <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 font-sans">
                    <div className="max-w-6xl mx-auto bg-slate-950 rounded-[3rem] p-10 lg:p-20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px] -z-0" />

                        <div className="relative z-10">
                            <div className="text-center mb-16">
                                <h2 className="text-secondary font-black text-[10px] uppercase tracking-[0.2em] mb-4">Fair Pricing</h2>
                                <h3 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">Invest in your <br />Financial Freedom.</h3>
                                <p className="text-slate-400 text-base max-w-xl mx-auto font-medium">One simple price. Unlimited potential. Start with a 14-day trial.</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                                <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-8 rounded-2xl">
                                    <span className="text-[9px] uppercase font-black tracking-widest text-slate-500 block mb-6">Personal Use</span>
                                    <h4 className="text-2xl font-extrabold text-white mb-2">Free Trial</h4>
                                    <div className="flex items-baseline mb-6 border-b border-white/5 pb-6">
                                        <span className="text-4xl font-black text-white">$0</span>
                                        <span className="text-slate-500 ml-2 font-bold text-xs uppercase tracking-tighter">/ 14 Days</span>
                                    </div>
                                    <ul className="space-y-3 mb-8">
                                        {["2 Syncable Accounts", "Standard Support", "Manual Sync Refresh"].map((item, i) => (
                                            <li key={i} className="flex items-center text-xs text-slate-300 font-medium tracking-tight">
                                                <CheckCircle2 className="h-4 w-4 text-secondary mr-2.5" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <a href={INSTALL_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center bg-white text-slate-900 py-4 rounded-xl text-sm font-black hover:bg-slate-100 active:scale-95 transition-all">
                                        Start Trial
                                    </a>
                                </div>

                                <div className="bg-white p-8 rounded-2xl relative shadow-2xl">
                                    <div className="absolute -top-3 right-6 bg-secondary text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] shadow-xl">Best Value</div>
                                    <span className="text-[9px] uppercase font-black tracking-widest text-secondary block mb-6">Professional Sync</span>
                                    <h4 className="text-2xl font-extrabold text-slate-950 mb-2">Pro Annual</h4>
                                    <div className="flex items-baseline mb-6 border-b border-slate-100 pb-6">
                                        <span className="text-4xl font-black text-slate-950">$29</span>
                                        <span className="text-slate-400 ml-2 font-bold text-xs uppercase tracking-tighter">/ Year</span>
                                    </div>
                                    <ul className="space-y-3 mb-8">
                                        {["Unlimited Bank Links", "Priority Support", "Automated Daily Sync", "Multi-Sheet Support"].map((item, i) => (
                                            <li key={i} className="flex items-center text-xs text-slate-700 font-bold tracking-tight">
                                                <CheckCircle2 className="h-4 w-4 text-primary mr-2.5" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <a href={INSTALL_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center bg-primary text-white py-4 rounded-xl text-sm font-black hover:bg-slate-800 shadow-lg shadow-primary/10 active:scale-95 transition-all">
                                        Install Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <PublicFooter />
        </div>
    );
}
