// app/api/campaigns/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Campaign } from "@/lib/models/campaign.model";

// Get a single campaign by ID
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const campaign = await Campaign.findById(params.id);
  return NextResponse.json(campaign);
}

// Update a campaign
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();
  const updatedCampaign = await Campaign.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  return NextResponse.json(updatedCampaign);
}

// Soft delete a campaign
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await Campaign.findByIdAndUpdate(params.id, { status: "deleted" }, {
    new: true,
  });
  return NextResponse.json({ message: "Campaign soft deleted" });
}
