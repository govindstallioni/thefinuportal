import { AlertCircle, ArrowLeft, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function CancelPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-center shadow-xl transition-all duration-300 hover:shadow-2xl">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
                    <AlertCircle className="h-10 w-10 text-amber-600" />
                </div>

                <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
                    Payment Cancelled
                </h1>

                <p className="mb-8 text-gray-500">
                    The payment process was cancelled and you haven't been charged. If this was a mistake, you can try again.
                </p>

                <div className="flex flex-col space-y-3">
                    <Link
                        href="/"
                        className="flex w-full items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Return to Home
                    </Link>

                    <Link
                        href="/support"
                        className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-center text-sm font-medium text-gray-900 transition-all hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100"
                    >
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
}
