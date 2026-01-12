"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle, Home, Loader2, CreditCard } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [details, setDetails] = useState<any>(null);

    useEffect(() => {
        const verifyPayment = async () => {
            if (!sessionId) {
                setLoading(false);
                return;
            }

            try {
                const res = await api.post("/payment/verify-session", { sessionId });
                setDetails(res.data.data);
            } catch (err: any) {
                console.error("Payment verification failed", err);
                setError("Could not verify payment details. Please contact support.");
            } finally {
                setLoading(false);
            }
        };

        verifyPayment();
    }, [sessionId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
                <p className="text-slate-500">Verifying your payment...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-100">
                    <CheckCircle className="h-10 w-10 text-rose-600" />
                </div>
                <h1 className="mb-2 text-3xl font-bold text-gray-900">Something went wrong</h1>
                <p className="mb-8 text-gray-500">{error}</p>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
                >
                    Return Home
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-center shadow-xl transition-all duration-300 hover:shadow-2xl">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600 animate-bounce" />
            </div>

            <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
                Payment Successful!
            </h1>

            <p className="mb-6 text-gray-500">
                Thank you for your purchase. Your subscription is active.
            </p>

            {details && (
                <div className="mb-8 rounded-xl bg-slate-50 p-4 text-left border border-slate-100">
                    <h3 className="mb-3 text-sm font-semibold text-slate-900 flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Subscription Details
                    </h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Plan</span>
                            <span className="font-medium text-slate-900">{details.plan}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Amount</span>
                            <span className="font-medium text-slate-900">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: details.currency || 'USD' }).format(details.amount)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Email</span>
                            <span className="font-medium text-slate-900 truncate max-w-[180px]">{details.email}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Subscription ID</span>
                            <span className="font-mono text-xs text-slate-700 bg-slate-200 px-1 rounded">{details.subscriptionId?.slice(0, 12)}...</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col space-y-3">
                <Link
                    href="/"
                    className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    <Home className="mr-2 h-4 w-4" />
                    Return to Home
                </Link>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <Suspense fallback={<div>Loading...</div>}>
                <SuccessContent />
            </Suspense>
        </div>
    );
}
