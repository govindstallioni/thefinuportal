import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <PublicHeader />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <Link href="/" className="inline-flex items-center text-secondary hover:text-secondary/80 transition-colors mb-8 group">
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>

                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-emerald-50 text-secondary rounded-lg">
                            <Shield className="h-6 w-6" />
                        </div>
                        <span className="text-secondary font-bold text-xs uppercase tracking-widest">Privacy First</span>
                    </div>

                    <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-2">Privacy Policy</h1>
                    <p className="text-slate-500 mb-6 border-b border-slate-100 pb-6 text-sm">Updated September 2023</p>

                    <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
                        <p className="text-lg text-slate-600 leading-relaxed">
                            ThefinU, LLC. (“ThefinU”, “Us”, “We” or “Our”) is committed to protecting your privacy. This Privacy Policy describes how we collect, use, and share your information when you use our website or services.
                        </p>

                        <p>
                            We encourage you to read this Privacy Policy carefully. By using our website, you are accepting the practices described here.
                        </p>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Information We Collect About You</h2>
                            <p>
                                We may collect personal information that can identify you, such as your name and email address. When you provide personal information through our website, it may be stored on secure servers located in the United States.
                            </p>
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 my-8">
                                <h4 className="font-bold text-slate-900 mb-2">Financial Account Access</h4>
                                <p className="text-sm text-slate-600 m-0">
                                    If you choose to use our service, we will request credentials via Plaid to access your bank account information. <strong>ThefinU does not store your usernames or passwords for financial institutions on its servers.</strong>
                                </p>
                            </div>
                            <p>
                                We work with <strong>Plaid</strong> to collect your transaction data. This data is transmitted securely via TLS and stored on our servers using 256-bit AES encryption.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">How We Use Your Information</h2>
                            <p>We use the data we collect to:</p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                {[
                                    "Deliver requested products and services",
                                    "Provide customer support",
                                    "Perform research and analytics",
                                    "Communicate about ThefinU products",
                                    "Enforce our terms & conditions",
                                    "Manage our business operations"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start bg-slate-50 p-3 rounded-lg text-sm font-medium text-slate-700">
                                        <div className="h-5 w-5 mr-3 flex-shrink-0 flex items-center justify-center rounded-full bg-emerald-100 text-secondary text-[10px]">✓</div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Data Security & Protection</h2>
                            <p>
                                We take electronic and physical security measures to safeguard your personal information. Access is restricted to authorized employees only. We use Transport Layer Security (TLS) technology for all sensitive transmissions and maintain robust firewalls.
                            </p>
                            <p className="p-4 bg-amber-50 text-amber-800 rounded-lg text-sm border border-amber-100 italic">
                                Note: No system can be completely secure. While we take every precaution, we cannot promise absolute security of your transmissions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Sharing of Information</h2>
                            <p className="font-bold text-slate-900 mb-4">We do not sell your personal information to third parties.</p>
                            <p>
                                We may share information with authorized service providers (like Stripe for payments or Plaid for banking) solely to perform their specific functions on our behalf.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Google API Limited Use</h2>
                            <p>
                                ThefinU's use and transfer of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes" className="text-secondary hover:underline font-medium" target="_blank" rel="noopener noreferrer">Google API Service User Data Policy</a>, including the <strong>Limited Use</strong> requirements.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Your Rights & Choices</h2>
                            <p>
                                You can delete your personal information and close your account at any time by contacting us. Upon cancellation, we delete all your downloaded financial and transaction data from our active servers.
                            </p>
                        </section>

                        <section className="border-t border-slate-100 pt-12 mt-16">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 font-primary uppercase tracking-wider text-sm">How to Contact Us</h2>
                            <p className="text-slate-600 mb-6">
                                If you have questions about this Privacy Policy or our data practices, please reach out to our support team:
                            </p>
                            <div className="bg-slate-50 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1 font-bold">Email Support</p>
                                    <a href="mailto:support@thefinu.com" className="text-lg font-bold text-secondary hover:underline transition-all">support@thefinu.com</a>
                                </div>
                                <div className="hidden sm:block h-10 w-px bg-slate-200" />
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1 font-bold">Location</p>
                                    <p className="text-lg font-bold text-slate-900">Denver, Colorado</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
