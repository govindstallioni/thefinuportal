"use client";

import { useState, useEffect } from "react";
import {
    Wallet,
    Search,
    Filter,
    Download,
    MoreVertical,
    CheckCircle2,
    XCircle,
    User,
    Key
} from "lucide-react";
import { getAccounts } from "@/lib/api";

export default function AccountsPage() {
    const [accounts, setAccounts] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await getAccounts();
                setAccounts(response.data);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAccounts();
    }, []);

    const filteredAccounts = accounts.filter(acc =>
        (acc.account_name || acc.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (acc.mask || "").includes(searchTerm) ||
        (acc.institution_id || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">User Accounts</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage and view all linked Plaid accounts</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </button>
                    <button className="flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-colors">
                        Refresh List
                    </button>
                </div>
            </div>

            <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 p-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name, mask or institution..."
                            className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2 text-sm focus:border-secondary focus:outline-none"
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

                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="flex h-32 items-center justify-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-secondary border-t-transparent"></div>
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    <th className="px-6 py-4">Account Name</th>
                                    <th className="px-6 py-4">Institution</th>
                                    <th className="px-6 py-4">Mask</th>
                                    <th className="px-6 py-4">Link Status</th>
                                    <th className="px-6 py-4">Created At</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredAccounts.length > 0 ? (
                                    filteredAccounts.map((acc) => (
                                        <tr key={acc._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                                        <Wallet className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-900">{acc.account_name || acc.name}</p>
                                                        <p className="text-xs text-slate-400">ID: {acc.account_id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                                                    {acc.institution_id || "N/A"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                **** {acc.mask || "0000"}
                                            </td>
                                            <td className="px-6 py-4">
                                                {acc.is_linked ? (
                                                    <div className="flex items-center text-emerald-600 text-xs font-medium">
                                                        <CheckCircle2 className="mr-1 h-3 w-3" />
                                                        Linked
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center text-amber-500 text-xs font-medium">
                                                        <XCircle className="mr-1 h-3 w-3" />
                                                        Pending
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                {new Date(acc.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-slate-400 hover:text-slate-600">
                                                    <MoreVertical className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                                            No accounts found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
