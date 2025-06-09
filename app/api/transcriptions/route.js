import dbConnect from "@/lib/dbConnect";
import Transcript from "@/models/Document";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const transcripts = await Transcript.find({})
      .sort({ venueDateTimeStamp: -1 })
      .select("-fullText -transcription");

    return NextResponse.json(transcripts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transcripts" },
      { status: 500 }
    );
  }
}
