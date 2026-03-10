import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import AdminContactsClient from "./AdminContactsClient";

export default async function AdminContactsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ read?: string; page?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { locale } = await params;
  const { read, page } = await searchParams;

  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect(`/${locale}/dashboard`);
  }

  const currentPage = Number(page ?? 1);
  const pageSize = 15;
  const showRead = read === "true";

  const [contacts, total, unreadCount] = await Promise.all([
    prisma.contactSubmission.findMany({
      where: { isRead: showRead },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    }),
    prisma.contactSubmission.count({ where: { isRead: showRead } }),
    prisma.contactSubmission.count({ where: { isRead: false } }),
  ]);

  return (
    <AdminContactsClient
      contacts={contacts}
      total={total}
      currentPage={currentPage}
      pageSize={pageSize}
      showRead={showRead}
      unreadCount={unreadCount}
      locale={locale}
    />
  );
}
