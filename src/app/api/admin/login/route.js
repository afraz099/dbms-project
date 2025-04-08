import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  await connectDB();
  try {
    const { email, password } = await req.json();

    const admin = await Admin.findOne({ email });
    if (!admin || admin.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful", redirect: "/admin" }, { status: 200 });
  } catch (error) {
    console.error("Admin Login Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
