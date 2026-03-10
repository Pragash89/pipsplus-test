import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const broker = await prisma.broker.findUnique({
    where: { slug },
  });

  if (!broker) {
    return NextResponse.json({ error: "Broker not found" }, { status: 404 });
  }

  return NextResponse.json({ data: broker });
}
