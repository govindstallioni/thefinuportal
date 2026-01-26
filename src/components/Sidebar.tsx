"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Wallet,
    Settings,
    CircleDollarSign,
    LogOut,
    CreditCard
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const menuItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Accounts", href: "/accounts", icon: Wallet },
    { name: "Subscriptions", href: "/subscriptions", icon: CreditCard },
    { name: "Settings", href: "/settings", icon: Settings },
];



export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        router.push("/login");
    };

    return (
        <div className="flex h-screen w-64 flex-col bg-primary text-white sticky top-0 shrink-0 shadow-xl z-20">
            <div className="flex h-20 items-center px-4 overflow-hidden">
                <img src="/logo-full.png" alt="ThefinU Logo" className="w-full h-auto max-h-16 object-contain" />
            </div>

            <nav className="flex-1 space-y-1 px-4 py-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-secondary text-white"
                                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-slate-800 p-4 space-y-2">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center rounded-lg px-4 py-2 text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </button>
                <div className="text-center pt-2">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">v1.0.0 © ThefinU</span>
                </div>
            </div>
        </div>
    );
}
