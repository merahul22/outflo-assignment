"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CampaignFormProps {
  initialData?: {
    _id?: string;
    name?: string;
    description?: string;
    leads?: string[];
    accountIDs?: string[];
    status?: string;
  };
}

export function CampaignForm({ initialData }: CampaignFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    leads: initialData?.leads?.join(", ") || "",
    accountIDs: initialData?.accountIDs?.join(", ") || "",
    status: initialData?.status || "active",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      leads: formData.leads.split(",").map((lead) => lead.trim()),
      accountIDs: formData.accountIDs.split(",").map((id) => id.trim()),
    };

    if (initialData?._id) {
      await fetch(`/api/campaigns/${initialData._id}`, { method: "PUT", body: JSON.stringify(payload) });
    } else {
      await fetch("/api/campaigns", { method: "POST", body: JSON.stringify(payload) });
    }
    router.push("/campaigns");
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <Input placeholder="Campaign Name" name="name" value={formData.name} onChange={handleChange} />
      <Textarea placeholder="Description" name="description" value={formData.description} onChange={handleChange} />
      <Input placeholder="Leads (comma separated)" name="leads" value={formData.leads} onChange={handleChange} />
      <Input placeholder="Account IDs (comma separated)" name="accountIDs" value={formData.accountIDs} onChange={handleChange} />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
