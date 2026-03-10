import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const reviewSchema = z.object({
  title: z.string().min(5).max(200),
  content: z.string().min(20).max(5000),
  rating: z.number().int().min(1).max(5),
  ratingTrust: z.number().int().min(1).max(5),
  ratingPlatform: z.number().int().min(1).max(5),
  ratingSupport: z.number().int().min(1).max(5),
  ratingFees: z.number().int().min(1).max(5),
  ratingWithdrawal: z.number().int().min(1).max(5),
  tradingExperience: z.number().int().min(0).max(50).optional(),
  accountType: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");

  const broker = await prisma.broker.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!broker) {
    return NextResponse.json({ error: "Broker not found" }, { status: 404 });
  }

  const [reviews, total] = await Promise.all([
    prisma.brokerReview.findMany({
      where: { brokerId: broker.id, status: "APPROVED" },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            country: true,
            isVerifiedTrader: true,
          },
        },
      },
    }),
    prisma.brokerReview.count({
      where: { brokerId: broker.id, status: "APPROVED" },
    }),
  ]);

  return NextResponse.json({
    data: reviews,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;

  try {
    const body = await request.json();
    const data = reviewSchema.parse(body);

    const broker = await prisma.broker.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!broker) {
      return NextResponse.json({ error: "Broker not found" }, { status: 404 });
    }

    const existing = await prisma.brokerReview.findUnique({
      where: { userId_brokerId: { userId: session.user.id, brokerId: broker.id } },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You have already reviewed this broker" },
        { status: 409 }
      );
    }

    const review = await prisma.brokerReview.create({
      data: {
        ...data,
        userId: session.user.id,
        brokerId: broker.id,
      },
    });

    return NextResponse.json(
      { data: review, message: "Review submitted for approval" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
