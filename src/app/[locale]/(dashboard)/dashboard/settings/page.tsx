"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { User, Lock, Bell, Save, CheckCircle } from "lucide-react";

type Tab = "profile" | "security" | "notifications";

export default function SettingsPage() {
  const t = useTranslations("dashboard.settings");
  const { data: session, update } = useSession();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: session?.user?.name || "",
    bio: "",
    country: "",
    phone: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/users/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "profile" as Tab, label: t("profile"), icon: User },
    { id: "security" as Tab, label: t("security"), icon: Lock },
    { id: "notifications" as Tab, label: t("notifications"), icon: Bell },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#111827]">{t("profile")}</h1>
        <p className="text-[#6B7280] mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="flex gap-1 bg-[#F9FAFB] p-1 rounded-2xl border border-gray-200 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-white text-[#111827] shadow-sm"
                : "text-[#6B7280] hover:text-[#111827]"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 max-w-2xl">
          {saved && (
            <div className="flex items-center gap-2 bg-[#ECFDF5] text-[#10B981] rounded-xl px-4 py-3 text-sm font-medium mb-6">
              <CheckCircle size={16} />
              {t("saved")}
            </div>
          )}
          <form onSubmit={handleSaveProfile} className="space-y-5">
            {/* Avatar */}
            <div className="flex items-center gap-5 pb-6 border-b border-gray-100">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white text-2xl font-black">
                {(profile.name || session?.user?.name || "U")[0].toUpperCase()}
              </div>
              <div>
                <button
                  type="button"
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl text-sm font-medium text-[#374151] hover:border-[#1E40AF] hover:text-[#1E40AF] transition-all"
                >
                  Change Photo
                </button>
                <p className="text-xs text-[#6B7280] mt-1">JPG, PNG or GIF. Max 5MB.</p>
              </div>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">{t("name")}</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] text-[#111827]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">{t("email")}</label>
                <input
                  type="email"
                  value={session?.user?.email || ""}
                  disabled
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-[#6B7280] cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1.5">{t("bio")}</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] text-[#111827] resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">{t("country")}</label>
                <input
                  type="text"
                  value={profile.country}
                  onChange={(e) => setProfile((p) => ({ ...p, country: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] text-[#111827]"
                  placeholder="United States"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">{t("phone")}</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] text-[#111827]"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-[#1E40AF] text-white font-semibold rounded-xl hover:bg-[#1E3A8A] transition-all disabled:opacity-50"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {t("saveChanges")}
            </button>
          </form>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 max-w-2xl">
          <h2 className="font-bold text-[#111827] text-lg mb-6">Change Password</h2>
          <form className="space-y-5">
            {[
              { label: t("currentPassword"), key: "current", placeholder: "Current password" },
              { label: t("newPassword"), key: "new", placeholder: "New password (min. 8 chars)" },
              { label: t("confirmPassword"), key: "confirm", placeholder: "Confirm new password" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">{field.label}</label>
                <input
                  type="password"
                  value={passwords[field.key as keyof typeof passwords]}
                  onChange={(e) =>
                    setPasswords((p) => ({ ...p, [field.key]: e.target.value }))
                  }
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] text-[#111827]"
                />
              </div>
            ))}
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-[#1E40AF] text-white font-semibold rounded-xl hover:bg-[#1E3A8A] transition-all"
            >
              <Lock size={16} />
              Update Password
            </button>
          </form>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 max-w-2xl">
          <h2 className="font-bold text-[#111827] text-lg mb-6">Notification Preferences</h2>
          <div className="space-y-4">
            {[
              { label: "Course updates and new lessons", sub: "Get notified when new lessons are added to your courses" },
              { label: "Broker alerts", sub: "Alerts when a broker you follow receives new reviews" },
              { label: "Fund recovery updates", sub: "Status updates on your fund recovery case" },
              { label: "Certificate shipping updates", sub: "Track your physical certificate delivery" },
              { label: "Weekly trading tips", sub: "Curated trading insights every Monday" },
              { label: "Marketing and promotions", sub: "News about premium features and discounts" },
            ].map((notif) => (
              <label
                key={notif.label}
                className="flex items-start justify-between gap-4 p-4 rounded-xl hover:bg-gray-50 cursor-pointer"
              >
                <div>
                  <p className="font-medium text-[#111827] text-sm">{notif.label}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">{notif.sub}</p>
                </div>
                <div className="relative flex-shrink-0">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-checked:bg-[#1E40AF] rounded-full transition-colors" />
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
                </div>
              </label>
            ))}
          </div>
          <button className="mt-6 flex items-center gap-2 px-6 py-3 bg-[#1E40AF] text-white font-semibold rounded-xl hover:bg-[#1E3A8A] transition-all">
            <Save size={16} />
            Save Preferences
          </button>
        </div>
      )}
    </div>
  );
}
