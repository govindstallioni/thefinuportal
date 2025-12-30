"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Info, Key, Globe, Mail, FileText } from "lucide-react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: "", content: "" });
    const [settings, setSettings] = useState({
        plaidClientKey: "",
        plaidSecretKey: "",
        plaidEnvironment: "sandbox",
        spreadsheetTemplateUrl: "",
        appInstruction: "",
        notificationEmail: "",
        appEmail: "",
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await axios.get(`${API_URL}/settings`);
                if (res.data) {
                    setSettings(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch settings", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: "", content: "" });
        try {
            await axios.post(`${API_URL}/settings`, settings);
            setMessage({ type: "success", content: "Settings saved successfully!" });
        } catch (err) {
            setMessage({ type: "error", content: "Failed to save settings. Please try again." });
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Application Settings</h1>
                    <p className="text-slate-500">Configure your financial portal and integrations.</p>
                </div>
            </div>

            {message.content && (
                <div className={`mb-6 p-4 rounded-lg flex items-center ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                    <Info className="mr-2 h-5 w-5" />
                    {message.content}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Plaid Configuration */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center border-b border-slate-100 pb-4">
                        <Key className="mr-2 h-5 w-5 text-blue-600" />
                        <h2 className="text-lg font-bold text-slate-900">Plaid Integration</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Plaid Client Key</label>
                            <input
                                type="text"
                                name="plaidClientKey"
                                value={settings.plaidClientKey}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                placeholder="Enter client key"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Plaid Secret Key</label>
                            <input
                                type="password"
                                name="plaidSecretKey"
                                value={settings.plaidSecretKey}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                placeholder="Enter secret key"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Plaid Environment</label>
                            <select
                                name="plaidEnvironment"
                                value={settings.plaidEnvironment}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none bg-white"
                            >
                                <option value="sandbox">Sandbox</option>
                                <option value="production">Production</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Spreadsheet & App Config */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center border-b border-slate-100 pb-4">
                        <Globe className="mr-2 h-5 w-5 text-blue-600" />
                        <h2 className="text-lg font-bold text-slate-900">External Connections</h2>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Spreadsheet Template URL</label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="url"
                                    name="spreadsheetTemplateUrl"
                                    value={settings.spreadsheetTemplateUrl}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                    placeholder="https://docs.google.com/spreadsheets/..."
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">App Instruction (Markdown or Plain Text)</label>
                            <textarea
                                name="appInstruction"
                                value={settings.appInstruction}
                                onChange={handleChange}
                                rows={4}
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                placeholder="Enter instructions for the app users..."
                            />
                        </div>
                    </div>
                </div>

                {/* Email Communications */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center border-b border-slate-100 pb-4">
                        <Mail className="mr-2 h-5 w-5 text-blue-600" />
                        <h2 className="text-lg font-bold text-slate-900">Email Settings</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Notification Email Address</label>
                            <input
                                type="email"
                                name="notificationEmail"
                                value={settings.notificationEmail}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                placeholder="alerts@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">App Email Address</label>
                            <input
                                type="email"
                                name="appEmail"
                                value={settings.appEmail}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                placeholder="system@example.com"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center rounded-lg bg-blue-600 px-8 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-all disabled:opacity-50 shadow-md"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save All Settings
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
