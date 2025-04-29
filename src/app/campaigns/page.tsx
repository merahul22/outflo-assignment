import { CampaignList } from "@/components/CampaignList";

async function getCampaigns() {
  const res = await fetch(`http://localhost:3000/api/campaigns`, { cache: "no-store" });
  return res.json();
}

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();
  return (
    <div className="p-8">
      <CampaignList campaigns={campaigns} />
    </div>
  );
}
