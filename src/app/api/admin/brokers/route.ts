import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const patchSchema = z.object({
  brokerId: z.string(),
  isVerified: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isBlacklisted: z.boolean().optional(),
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

  const { brokerId, ...fields } = parsed.data;

  const updated = await prisma.broker.update({
    where: { id: brokerId },
    data: fields,
  });

  return NextResponse.json(updated);
}
