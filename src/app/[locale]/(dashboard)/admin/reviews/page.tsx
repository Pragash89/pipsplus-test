import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import AdminReviewsClient from "./AdminReviewsClient";

export default async function AdminReviewsPage({
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

  const statusFilter = (status === "APPROVED" || status === "REJECTED" || status === "PENDING")
    ? status : "PENDING";

  const [reviews, total] = await Promise.all([
    prisma.brokerReview.findMany({
      where: { status: statusFilter as "PENDING" | "APPROVED" | "REJECTED" },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      include: {
        broker: { select: { id: true, name: true, slug: true } },
        user: { select: { id: true, name: true, email: true } },
      },
    }),
    prisma.brokerReview.count({ where: { status: statusFilter as "PENDING" | "APPROVED" | "REJECTED" } }),
  ]);

  const counts = await prisma.brokerReview.groupBy({
    by: ["status"],
    _count: { id: true },
  });

  const statusCounts: Record<string, number> = {};
  counts.forEach((c) => { statusCounts[c.status] = c._count.id; });

  return (
    <AdminReviewsClient
      reviews={reviews}
      total={total}
      currentPage={currentPage}
      pageSize={pageSize}
      statusFilter={statusFilter}
      statusCounts={statusCounts}
      locale={locale}
    />
  );
}
