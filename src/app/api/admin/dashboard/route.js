import { connectDB } from "@/lib/db";
import Request from "@/models/Request";
import Donor from "@/models/Donor";
import { NextResponse } from "next/server";

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export async function GET() {
  await connectDB();
  try {
    const requests = await Request.aggregate([
      { $group: { _id: "$bloodType", count: { $sum: 1 } } },
      { $project: { bloodType: "$_id", count: 1, _id: 0 } }
    ]);

    const inventory = await Donor.aggregate([
      { $group: { _id: "$bloodType", stock: { $sum: 1 } } },
      { $project: { bloodType: "$_id", stock: 1, _id: 0 } }
    ]);

    const completeRequests = BLOOD_TYPES.map(type => ({
      bloodType: type,
      count: requests.find(r => r.bloodType === type)?.count || 0
    }));

    const completeInventory = BLOOD_TYPES.map(type => ({
      bloodType: type,
      stock: inventory.find(i => i.bloodType === type)?.stock || 0
    }));

    return NextResponse.json({ requests: completeRequests, inventory: completeInventory }, { status: 200 });
  } catch (error) {
    console.error("⚠️ Error in /api/admin/dashboard:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
