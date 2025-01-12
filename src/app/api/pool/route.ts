import { poolsInfo, createNewPool } from "@/lib/api/pool";
import { createPoolSchema } from "@/lib/zod/schemas/pool";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await poolsInfo();
    return NextResponse.json({
      message: "success",
      data,
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: "error",
        error: (err as Error).message || "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const jsonData = await req.json();
  const parsedData = createPoolSchema.safeParse(jsonData);

  if (!parsedData.success) {
    return NextResponse.json(
      { message: "Validation failed", errors: parsedData.error.format() },
      { status: 400 }
    );
  }

  try {
    const data = await createNewPool(jsonData);
    return NextResponse.json({
      message: "success",
      data,
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: "error",
        error: (err as Error).message || "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
