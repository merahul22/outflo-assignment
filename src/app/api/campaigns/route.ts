// api/campaigns/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import { Campaign } from "../../../lib/models/campaign.model";

export async function GET() {
  await connectDB();
  const campaigns = await Campaign.find({ status: { $ne: "deleted" } });
  return NextResponse.json(campaigns);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const campaign = await Campaign.create(body);
  return NextResponse.json(campaign);
}
