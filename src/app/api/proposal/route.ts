import { createNewProposal, proposals } from "@/lib/api/pool";
import { createNewProposalSchema } from "@/lib/zod/schemas/proposal";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await proposals();
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
  try {
    const jsonData = await req.json();
    const parsedData = createNewProposalSchema.safeParse(jsonData);

    if (!parsedData.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: parsedData.error.format() },
        { status: 400 }
      );
    }

    const data = await createNewProposal(jsonData);
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
