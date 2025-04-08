import { connectDB } from "@/lib/db";
import Request from "@/models/Request";
import Donor from "@/models/Donor";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      await connectDB();
      const { bloodType } = await req.json();
  
      // Check if there is both a request and a donor available
      const request = await Request.findOne({ bloodType });
      const donation = await Donor.findOne({ bloodType });
  
      if (!request || !donation) {
        return NextResponse.json({ message: "No matching request or stock available" }, { status: 400 });
      }
  
      // Remove one request and one donation
      await Request.findByIdAndDelete(request._id);
      await Donor.findByIdAndDelete(donation._id);
  
      return NextResponse.json({ message: "Request approved and stock updated" });
    } catch (error) {
      console.error("Error approving request:", error);
      return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
  }
  
