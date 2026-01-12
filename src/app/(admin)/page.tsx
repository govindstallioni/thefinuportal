"use client";

import StatsCard from "@/components/StatsCard";
import {
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Plus
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Financial Overview</h1>
          <p className="text-slate-500">Welcome back, SAM!</p>
        </div>
        <button className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Balance"
          amount="$45,231.89"
          trend="up"
          percentage="+2.5%"
          icon={DollarSign}
          color="bg-blue-600"
        />
        <StatsCard
          title="Monthly Income"
          amount="$8,432.00"
          trend="up"
          percentage="+12.3%"
          icon={ArrowUpRight}
          color="bg-emerald-600"
        />
        <StatsCard
          title="Monthly Expenses"
          amount="$3,124.50"
          trend="down"
          percentage="-4.1%"
          icon={ArrowDownRight}
          color="bg-rose-600"
        />
        <StatsCard
          title="Total Savings"
          amount="$12,415.00"
          trend="up"
          percentage="+0.8%"
          icon={Wallet}
          color="bg-indigo-600"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Charts and Tables will go here */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm min-h-[300px]">
          <h3 className="text-lg font-bold text-slate-900">Spending Overview</h3>
          <div className="mt-4 flex items-center justify-center text-slate-400">
            [Chart Placeholder - Implementing Recharts soon]
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm min-h-[300px]">
          <h3 className="text-lg font-bold text-slate-900">Recent Transactions</h3>
          <div className="mt-4 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <ArrowDownRight className="h-5 w-5 text-rose-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-900">Starbucks Coffee</p>
                    <p className="text-xs text-slate-500">Food & Drinks • Today</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-rose-600">-$6.50</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
