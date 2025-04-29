

// app/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Welcome to Outflo Campaign Tool</h1>
      <Button onClick={() => router.push("/campaigns")}>Campaigns</Button>
      <Button onClick={() => router.push("/message.generator")}>Generate Message</Button>
    </div>
  );
}
