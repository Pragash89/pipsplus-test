import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const patchSchema = z.object({
  reviewId: z.string(),
  status: z.enum(["APPROVED", "REJECTED", "PENDING"]),
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

  const { reviewId, status } = parsed.data;

  const review = await prisma.brokerReview.update({
    where: { id: reviewId },
    data: { status },
    include: { broker: { select: { id: true } } },
  });

  // Recalculate broker ratings if approved or rejected
  if (status === "APPROVED" || status === "REJECTED") {
    const approvedReviews = await prisma.brokerReview.findMany({
      where: { brokerId: review.broker.id, status: "APPROVED" },
      select: {
        rating: true, ratingTrust: true, ratingPlatform: true,
        ratingSupport: true, ratingFees: true, ratingWithdrawal: true,
      },
    });

    const count = approvedReviews.length;
    if (count > 0) {
      const avg = (arr: number[]) => arr.reduce((s, v) => s + v, 0) / arr.length;
      await prisma.broker.update({
        where: { id: review.broker.id },
        data: {
          totalReviews: count,
          overallRating: avg(approvedReviews.map((r) => r.rating)),
          ratingTrustScore: avg(approvedReviews.map((r) => r.ratingTrust)),
          ratingPlatform: avg(approvedReviews.map((r) => r.ratingPlatform)),
          ratingSupport: avg(approvedReviews.map((r) => r.ratingSupport)),
          ratingFees: avg(approvedReviews.map((r) => r.ratingFees)),
          ratingWithdrawal: avg(approvedReviews.map((r) => r.ratingWithdrawal)),
        },
      });
    }
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Review ID required" }, { status: 400 });

  await prisma.brokerReview.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
