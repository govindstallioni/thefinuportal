"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const isLoginPage = pathname === "/login";

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token && !isLoginPage) {
            router.push("/login");
        }
    }, [pathname, isLoginPage, router]);

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
