import { createNewUser } from "@/lib/api/auth";
import { createUserSchema } from "@/lib/zod/schemas/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const jsonData = await req.json();
    const parsedData = createUserSchema.safeParse(jsonData);

    if (!parsedData.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: parsedData.error.format() },
        { status: 400 }
      );
    }

    const data = await createNewUser(jsonData);
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
