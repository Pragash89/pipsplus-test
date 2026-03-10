import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const pageSize = parseInt(searchParams.get("pageSize") ?? "12");
  const search = searchParams.get("search") ?? "";
  const regulation = searchParams.get("regulation") ?? "";
  const minRating = parseFloat(searchParams.get("minRating") ?? "0");
  const sortBy = searchParams.get("sortBy") ?? "rating";
  const featuredOnly = searchParams.get("featured") === "true";

  const where: any = {
    isBlacklisted: false,
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (regulation) {
    where.regulation = regulation;
  }

  if (minRating > 0) {
    where.overallRating = { gte: minRating };
  }

  if (featuredOnly) {
    where.isFeatured = true;
  }

  const orderBy: any =
    sortBy === "rating"
      ? { overallRating: "desc" }
      : sortBy === "reviews"
      ? { totalReviews: "desc" }
      : sortBy === "name"
      ? { name: "asc" }
      : { createdAt: "desc" };

  const [brokers, total] = await Promise.all([
    prisma.broker.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        slug: true,
        name: true,
        logoUrl: true,
        regulation: true,
        regulatoryBody: true,
        headquarters: true,
        minDeposit: true,
        maxLeverage: true,
        spreadsFrom: true,
        platforms: true,
        instruments: true,
        isVerified: true,
        isFeatured: true,
        isBlacklisted: true,
        overallRating: true,
        totalReviews: true,
        founded: true,
      },
    }),
    prisma.broker.count({ where }),
  ]);

  return NextResponse.json({
    data: brokers,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
}
