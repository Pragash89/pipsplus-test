import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [enrolled, completed, certificates, savedBrokers] = await Promise.all([
    prisma.enrollment.count({ where: { userId: session.user.id } }),
    prisma.enrollment.count({
      where: { userId: session.user.id, completedAt: { not: null } },
    }),
    prisma.certificate.count({ where: { userId: session.user.id } }),
    prisma.savedBroker.count({ where: { userId: session.user.id } }),
  ]);

  return NextResponse.json({
    data: { enrolled, completed, certificates, savedBrokers },
  });
}
