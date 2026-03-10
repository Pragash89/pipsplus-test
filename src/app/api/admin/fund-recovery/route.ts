import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const patchSchema = z.object({
  caseId: z.string(),
  status: z.enum(["SUBMITTED", "UNDER_REVIEW", "IN_PROGRESS", "RESOLVED", "CLOSED"]),
  adminNotes: z.string().optional(),
});

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "ADMIN") return null;
  return session;
}

export async function PATCH(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const { caseId, status, adminNotes } = parsed.data;

  const update: Record<string, unknown> = { status };
  if (adminNotes !== undefined) update.adminNotes = adminNotes;
  if (status === "RESOLVED") update.resolvedAt = new Date();

  const updated = await prisma.fundRecoveryCase.update({
    where: { id: caseId },
    data: update,
  });

  return NextResponse.json(updated);
}
