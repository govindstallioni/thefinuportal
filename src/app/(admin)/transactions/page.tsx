"use client";

import { useState } from "react";
import {
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Filter,
    Download,
    MoreVertical
} from "lucide-react";

const transactions = [
    { id: 1, name: "Salary Deposit", category: "Income", amount: 5000, date: "2024-12-28", type: "income" },
    { id: 2, name: "Grocery Store", category: "Food", amount: -150, date: "2024-12-29", type: "expense" },
    { id: 3, name: "Electricity Bill", category: "Bills", amount: -80, date: "2024-12-29", type: "expense" },
    { id: 4, name: "Freelance Project", category: "Income", amount: 1200, date: "2024-12-30", type: "income" },
    { id: 5, name: "Netflix Subscription", category: "Ent.", amount: -15, date: "2024-12-30", type: "expense" },
];

export default function TransactionsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="p-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">Transactions</h1>
                <div className="flex gap-3">
                    <button className="flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </button>
                    <button className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                        Add Transaction
                    </button>
                </div>
            </div>

            <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 p-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                        </button>
                    </div>
                </div>

                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            <th className="px-6 py-4">Transaction</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {transactions.map((t) => (
                            <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className={`mr-3 flex h-8 w-8 items-center justify-center rounded-full ${t.type === 'income' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                                            {t.type === 'income' ? <ArrowUpRight className="h-4 w-4 text-emerald-600" /> : <ArrowDownRight className="h-4 w-4 text-rose-600" />}
                                        </div>
                                        <span className="font-medium text-slate-900">{t.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">{t.category}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">{t.date}</td>
                                <td className={`px-6 py-4 text-sm font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {t.type === 'income' ? '+' : '-'}${Math.abs(t.amount).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-slate-600">
                                        <MoreVertical className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
