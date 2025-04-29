// app/api/campaigns/route.ts
export const runtime = 'nodejs';
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Campaign } from "@/lib/models/campaign.model";

// Get all non-deleted campaigns
export async function GET() {
  await connectDB();
  const campaigns = await Campaign.find({ status: { $ne: "deleted" } });
  return NextResponse.json(campaigns);
}

// Create a new campaign
export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const campaign = await Campaign.create(body);
  return NextResponse.json(campaign);
}
