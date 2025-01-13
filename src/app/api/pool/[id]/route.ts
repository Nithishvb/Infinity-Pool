import { poolDetails } from "@/lib/api/pool";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const data = await poolDetails(id);
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