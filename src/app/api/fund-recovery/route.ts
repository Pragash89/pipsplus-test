import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

const recoverySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().optional(),
  brokerName: z.string().min(2).max(200),
  amountLost: z.number().positive().optional(),
  currency: z.string().default("USD"),
  description: z.string().min(20).max(10000),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const data = recoverySchema.parse(body);

    const recoveryCase = await prisma.fundRecoveryCase.create({
      data: {
        userId: session?.user?.id ?? null,
        name: data.name,
        email: data.email,
        phone: data.phone,
        country: data.country,
        brokerName: data.brokerName,
        amountLost: data.amountLost ? data.amountLost : null,
        currency: data.currency,
        description: data.description,
      },
    });

    return NextResponse.json(
      { data: recoveryCase, message: "Case submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Fund recovery submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit case" },
      { status: 500 }
    );
  }
}
