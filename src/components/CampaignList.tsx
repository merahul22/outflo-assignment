"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Campaign {
  _id: string;
  name: string;
  description: string;
  status: string;
}

export function CampaignList({ campaigns }: { campaigns: Campaign[] }) {
  const router = useRouter();

  const handleToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    await fetch(`/api/campaigns/${id}`, { method: "PUT", body: JSON.stringify({ status: newStatus }) });
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/campaigns/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className="space-y-4">
      {campaigns.map((c) => (
        <div key={c._id} className="border p-4 rounded-md">
          <h2 className="font-bold">{c.name}</h2>
          <p>{c.description}</p>
          <div className="flex gap-2 mt-2">
            <Button onClick={() => router.push(`/campaigns/edit/${c._id}`)}>Edit</Button>
            <Button variant="secondary" onClick={() => handleToggle(c._id, c.status)}>
              Toggle {c.status === "active" ? "Inactive" : "Active"}
            </Button>
            <Button variant="destructive" onClick={() => handleDelete(c._id)}>Delete</Button>
          </div>

        </div>
      ))}
      <Button onClick={() => router.push("/campaigns/create")}>Create</Button>
    </div>
  );
}
