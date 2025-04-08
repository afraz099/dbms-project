import { NextResponse } from "next/server";
import Donor from "@/models/Donor";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  await connectDB();
  try {
    const { email, password } = await req.json();

    // Find donor by email
    const donor = await Donor.findOne({ email });
    if (!donor) {
      return NextResponse.json({ error: "Donor not found" }, { status: 404 });
    }

    // Simple password check (since bcrypt is removed)
    if (donor.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ donor }, { status: 200 });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
