import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const patchSchema = z.object({
  userId: z.string().cuid(),
  role: z.enum(["TRADER", "INSTRUCTOR", "ADMIN"]).optional(),
  subscription: z.enum(["EXPLORER", "TRADER", "PROFESSIONAL"]).optional(),
});

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return null;
  }
  return session;
}

export async function PATCH(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { userId, role, subscription } = parsed.data;

  // Prevent de-admining yourself
  if (userId === (session.user as any).id && role && role !== "ADMIN") {
    return NextResponse.json({ error: "Cannot change your own admin role" }, { status: 400 });
  }

  const update: Record<string, unknown> = {};
  if (role) update.role = role;
  if (subscription) update.subscription = subscription;

  const updated = await prisma.user.update({
    where: { id: userId },
    data: update,
    select: { id: true, role: true, subscription: true },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  // Prevent self-deletion
  if (id === (session.user as any).id) {
    return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });
  }

  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
