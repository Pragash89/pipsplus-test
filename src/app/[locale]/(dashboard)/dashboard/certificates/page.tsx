import { getTranslations } from "next-intl/server";
import { Award, Package, CheckCircle, Truck, Clock, Download } from "lucide-react";
import Link from "next/link";

const STATUS_CONFIG = {
  ISSUED: { label: "Issued", icon: CheckCircle, color: "#10B981", bg: "#ECFDF5" },
  PRINTING: { label: "Being Printed", icon: Clock, color: "#F59E0B", bg: "#FFFBEB" },
  SHIPPED: { label: "Shipped", icon: Truck, color: "#1E40AF", bg: "#EFF6FF" },
  DELIVERED: { label: "Delivered", icon: Package, color: "#8B5CF6", bg: "#F5F3FF" },
};

// Demo certificates
const DEMO_CERTIFICATES = [
  {
    id: "1",
    certificateCode: "PP-A8F3K9",
    issuedAt: "2024-01-15",
    status: "ISSUED" as const,
    course: { title: "Forex Trading for Beginners", category: "FOREX" },
  },
];

export default async function CertificatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dashboard.certificates" });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#111827]">{t("title")}</h1>
        <p className="text-[#6B7280] mt-1">
          Your earned certificates. Complete courses to earn more.
        </p>
      </div>

      {DEMO_CERTIFICATES.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="text-amber-400" size={36} />
          </div>
          <h2 className="text-xl font-bold text-[#111827] mb-2">{t("noCertificates")}</h2>
          <Link
            href={`/${locale}/education`}
            className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-[#1E40AF] text-white font-semibold rounded-xl hover:bg-[#1E3A8A] transition-all"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DEMO_CERTIFICATES.map((cert) => {
            const status = STATUS_CONFIG[cert.status];
            return (
              <div
                key={cert.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Certificate preview */}
                <div
                  className="p-6 text-center relative"
                  style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #ECFDF5 100%)" }}
                >
                  <div className="absolute top-3 right-3">
                    <span
                      className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: status.bg, color: status.color }}
                    >
                      <status.icon size={10} />
                      {status.label}
                    </span>
                  </div>
                  <Award className="text-amber-400 mx-auto mb-3" size={48} />
                  <p className="text-xs text-[#6B7280] uppercase tracking-wider">Certificate of Completion</p>
                  <h3 className="font-black text-[#111827] text-lg mt-1">
                    {cert.course.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] mt-2">
                    Code: <span className="font-mono font-bold text-[#1E40AF]">{cert.certificateCode}</span>
                  </p>
                </div>

                {/* Actions */}
                <div className="p-5 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-4 text-sm text-[#6B7280]">
                    <span>Issued: {new Date(cert.issuedAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-[#374151] hover:bg-gray-50 transition-all">
                      <Download size={15} />
                      {t("download")}
                    </button>
                    {cert.status === "ISSUED" && (
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1E40AF] text-white rounded-xl text-sm font-semibold hover:bg-[#1E3A8A] transition-all">
                        <Package size={15} />
                        {t("requestShipping")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Placeholder for more certificates */}
          <div className="bg-[#F9FAFB] rounded-2xl border-2 border-dashed border-gray-200 p-8 flex flex-col items-center justify-center text-center min-h-48">
            <Award className="text-gray-300 mb-3" size={36} />
            <p className="font-medium text-[#6B7280] mb-2">Earn more certificates</p>
            <p className="text-sm text-[#6B7280] mb-4">Complete a course to get your next certificate</p>
            <Link
              href={`/${locale}/education`}
              className="text-[#1E40AF] text-sm font-semibold hover:underline"
            >
              Browse courses →
            </Link>
          </div>
        </div>
      )}

      {/* Info card */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <div className="flex gap-4">
          <Package className="text-amber-600 flex-shrink-0 mt-0.5" size={22} />
          <div>
            <h3 className="font-bold text-amber-900 mb-1">Physical Certificate Shipping</h3>
            <p className="text-sm text-amber-800">
              Premium subscribers can request physical certificates printed and shipped to their door.
              Certificates are printed on high-quality paper with a unique verification code.
              International shipping takes 5-15 business days.
            </p>
            <Link
              href={`/${locale}/subscriptions`}
              className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-amber-700 hover:text-amber-900"
            >
              Upgrade to Premium →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
