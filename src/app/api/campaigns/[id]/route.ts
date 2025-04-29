// api/campaigns/[id]/route.ts

import { Campaign } from "@/lib/models/campaign.model";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const campaign = await Campaign.findById(params.id);
  return NextResponse.json(campaign);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const updatedCampaign = await Campaign.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updatedCampaign);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Campaign.findByIdAndUpdate(params.id, { status: "deleted" }, { new: true });
  return NextResponse.json({ message: "Campaign soft deleted" });
}
