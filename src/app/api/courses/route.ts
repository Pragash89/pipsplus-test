import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const pageSize = parseInt(searchParams.get("pageSize") ?? "12");
  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const level = searchParams.get("level") ?? "";
  const isPremium = searchParams.get("isPremium");

  const where: any = {
    isPublished: true,
  };

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (category) {
    where.category = category;
  }

  if (level) {
    where.level = level;
  }

  if (isPremium !== null && isPremium !== undefined && isPremium !== "") {
    where.isPremium = isPremium === "true";
  }

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        slug: true,
        title: true,
        titleAr: true,
        titleEs: true,
        titleFr: true,
        description: true,
        thumbnailUrl: true,
        category: true,
        level: true,
        isPremium: true,
        totalDuration: true,
        totalLessons: true,
        instructor: true,
        tags: true,
        createdAt: true,
      },
    }),
    prisma.course.count({ where }),
  ]);

  return NextResponse.json({
    data: courses,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
}
