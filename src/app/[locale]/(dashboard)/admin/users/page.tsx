import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import AdminUsersClient from "./AdminUsersClient";

export default async function AdminUsersPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ filter?: string; search?: string; page?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { locale } = await params;
  const { filter, search, page } = await searchParams;

  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect(`/${locale}/dashboard`);
  }

  const currentPage = Number(page ?? 1);
  const pageSize = 20;

  const where: Record<string, unknown> = {};
  if (filter === "premium") where.subscription = { in: ["TRADER", "PROFESSIONAL"] };
  if (filter === "admin") where.role = "ADMIN";
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        subscription: true,
        country: true,
        createdAt: true,
        _count: {
          select: {
            enrollments: true,
            certificates: true,
          },
        },
      },
    }),
    prisma.user.count({ where }),
  ]);

  return (
    <AdminUsersClient
      users={users}
      total={total}
      currentPage={currentPage}
      pageSize={pageSize}
      locale={locale}
      filter={filter}
      search={search}
    />
  );
}
