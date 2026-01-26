import {
    TrendingUp,
    TrendingDown
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface StatsCardProps {
    title: string;
    amount: string;
    trend: "up" | "down";
    percentage: string;
    icon: LucideIcon;
    color: string;
}

export default function StatsCard({ title, amount, trend, percentage, icon: Icon, color }: StatsCardProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div className={cn("rounded-lg p-2 text-white", color)}>
                    <Icon className="h-6 w-6" />
                </div>
                <div className={cn(
                    "flex items-center text-sm font-medium",
                    trend === "up" ? "text-emerald-600" : "text-rose-600"
                )}>
                    {trend === "up" ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
                    {percentage}
                </div>
            </div>
            <div className="mt-4">
                <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</h3>
                <p className="text-3xl font-extrabold text-primary mt-1">{amount}</p>
            </div>
        </div>
    );
}
