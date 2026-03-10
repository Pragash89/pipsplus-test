import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import AdminBrokersClient from "./AdminBrokersClient";

export default async function AdminBrokersPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ filter?: string; search?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { locale } = await params;
  const { filter, search } = await searchParams;

  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect(`/${locale}/dashboard`);
  }

  const where: Record<string, unknown> = {};
  if (filter === "blacklisted") where.isBlacklisted = true;
  if (filter === "featured") where.isFeatured = true;
  if (filter === "verified") where.isVerified = true;
  if (search) {
    where.name = { contains: search, mode: "insensitive" };
  }

  const brokers = await prisma.broker.findMany({
    where,
    orderBy: { overallRating: "desc" },
    select: {
      id: true,
      name: true,
      slug: true,
      regulation: true,
      isVerified: true,
      isFeatured: true,
      isBlacklisted: true,
      overallRating: true,
      totalReviews: true,
      minDeposit: true,
      createdAt: true,
    },
  });

  return (
    <AdminBrokersClient
      brokers={brokers}
      total={brokers.length}
      locale={locale}
      filter={filter}
      search={search}
    />
  );
}
