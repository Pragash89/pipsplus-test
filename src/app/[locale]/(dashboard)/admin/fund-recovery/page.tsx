import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import AdminFundRecoveryClient from "./AdminFundRecoveryClient";

export default async function AdminFundRecoveryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { locale } = await params;
  const { status, page } = await searchParams;

  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect(`/${locale}/dashboard`);
  }

  const currentPage = Number(page ?? 1);
  const pageSize = 15;

  const validStatuses = ["SUBMITTED", "UNDER_REVIEW", "IN_PROGRESS", "RESOLVED", "CLOSED"];
  const statusFilter = validStatuses.includes(status ?? "") ? status! : undefined;

  const where: Record<string, unknown> = {};
  if (statusFilter) where.status = statusFilter;

  const [cases, total] = await Promise.all([
    prisma.fundRecoveryCase.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    }),
    prisma.fundRecoveryCase.count({ where }),
  ]);

  const counts = await prisma.fundRecoveryCase.groupBy({
    by: ["status"],
    _count: { id: true },
  });

  const statusCounts: Record<string, number> = {};
  counts.forEach((c) => { statusCounts[c.status] = c._count.id; });

  return (
    <AdminFundRecoveryClient
      cases={cases}
      total={total}
      currentPage={currentPage}
      pageSize={pageSize}
      statusFilter={statusFilter}
      statusCounts={statusCounts}
      locale={locale}
    />
  );
}
