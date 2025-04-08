import { NextResponse } from "next/server";
import { connectDB }from "@/lib/db";
import Request from "@/models/Request";

export async function POST(req) {
  await connectDB();
  try {
    const data = await req.json();
    const newRequest = new Request(data);
    await newRequest.save();
    return NextResponse.json({ message: "Request submitted successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error processing request" }, { status: 500 });
  }
}
