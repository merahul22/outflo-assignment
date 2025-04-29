// lib/models/campaign.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ICampaign extends Document {
  name: string;
  description: string;
  status: "active" | "inactive" | "deleted";
  leads: string[];
  accountIDs: string[];
}

const CampaignSchema = new Schema<ICampaign>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive", "deleted"], default: "active" },
  leads: [{ type: String }],
  accountIDs: [{ type: String }],
});

export const Campaign = mongoose.models.Campaign || mongoose.model<ICampaign>("Campaign", CampaignSchema);
