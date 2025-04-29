// lib/services/ai.service.ts
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

// Access your API key as an environment variable.
const apiKey: string | undefined = process.env.GOOGLE_API_KEY;

// Initialize the Generative AI client only if the API key is available
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function generatePersonalizedMessage({
  name,
  job_title,
  company,
  location,
  summary,
}: {
  name: string;
  job_title: string;
  company: string;
  location: string;
  summary: string;
}): Promise<string> {
  if (!genAI) {
    console.error("Google Generative AI client not initialized due to missing API key.");
    return fallbackMessage(name, job_title, company);
  }

  const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt: string = `Create a short personalized LinkedIn outreach message for:
Name: ${name}
Job Title: ${job_title}
Company: ${company}
Location: ${location}
Summary: ${summary}
Make it friendly and professional.`;

  try {
    console.log("Sending prompt to Gemini API...");
    const result = await model.generateContent(prompt);
    const responseText: string = await result.response.text();

    console.log("Received response from Gemini API.");

    if (responseText.trim()) {
        return responseText.trim();
    } else {
        console.warn("Gemini returned an empty response. Using fallback.");
        return fallbackMessage(name, job_title, company);
    }

  } catch (error: unknown) {
      if (error instanceof Error) {
          console.error("Google Generative AI API Error:", error.message);
      } else {
          console.error("Google Generative AI API Error:", error);
      }
      console.error("Full Google Generative AI API Error object:", error);
  }
  return fallbackMessage(name, job_title, company);
}

function fallbackMessage(name: string, job_title: string, company: string): string {
  console.warn("Using fallback message.");
  return `Hey ${name}, I noticed you are a ${job_title} at ${company}. Let's connect to discuss how we might collaborate.`;
}