import { connectDB } from "@/lib/db";
import Donor from "@/models/Donor";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  try {
    const data = await req.json();
    const newDonor = new Donor(data);
    await newDonor.save();
    return NextResponse.json({ message: "Donation recorded successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit donation" }, { status: 500 });
  }
}
