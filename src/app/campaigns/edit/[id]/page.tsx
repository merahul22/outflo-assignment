import { CampaignForm } from "@/components/CampaignForm";

async function getCampaign(id: string) {
  const res = await fetch(`http:localhost:3000/api/campaigns/${id}`, { cache: "no-store" });
  return res.json();
}

export default async function EditCampaignPage({ params }: { params: { id: string } }) {
  const campaign = await getCampaign(params.id);
  return (
    <div className="p-8">
      <CampaignForm initialData={campaign} />
    </div>
  );
}
