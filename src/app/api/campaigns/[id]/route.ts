
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Campaign } from "@/lib/models/campaign.model";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;
  const campaign = await Campaign.findById(id);

  if (!campaign) {
    return NextResponse.json(
      { message: "Campaign not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(campaign);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;

  const deleted = await Campaign.findByIdAndUpdate(
    id,
    { status: "deleted" },
    { new: true }
  );
  if (!deleted) {
    return NextResponse.json(
      { message: "Not found or already deleted" },
      { status: 404 }
    );
  }

  return NextResponse.json(deleted);
}
