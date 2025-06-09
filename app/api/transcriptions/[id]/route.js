import dbConnect from "@/lib/dbConnect";
import Transcript from "@/models/Document";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const transcript = await Transcript.findById(params.id);

    if (!transcript) {
      return NextResponse.json(
        { error: "Transcript not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(transcript);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transcript" },
      { status: 500 }
    );
  }
}
