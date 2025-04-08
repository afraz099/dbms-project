import { NextResponse } from "next/server";
import Donor from "@/models/Donor";
import { connectDB } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const donor = await Donor.findById(params.id);

    if (!donor) {
      return NextResponse.json({ error: "Donor not found" }, { status: 404 });
    }

    return NextResponse.json(donor, { status: 200 });
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
