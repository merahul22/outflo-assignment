// app/message-generator/page.tsx

import MessageGeneratorForm from "@/components/MessageGenreratorForm";


export default function MessageGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <h1 className="text-2xl font-bold mb-8">Personalized Message Generator</h1>
      <MessageGeneratorForm />
    </div>
  );
}