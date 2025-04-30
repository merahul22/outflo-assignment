// app/api/campaigns/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Campaign } from "@/lib/models/campaign.model";

// GET /api/campaigns — fetch all non-deleted
export async function GET() {
  await connectDB();
  const campaigns = await Campaign.find({ status: { $ne: "deleted" } });
  return NextResponse.json(campaigns);
}

// POST /api/campaigns — create new campaign
export async function POST(request: Request) {
  await connectDB();
  const body = await request.json();
  const campaign = await Campaign.create(body);
  return NextResponse.json(campaign);
}
