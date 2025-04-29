
import { generatePersonalizedMessage } from '@/lib/services/ai.service'; // Using the alias as per your structure

// Define the POST handler for this API route
export async function POST(req: Request) {
  console.log(`Received request with method: ${req.method}`);

  try {
    // Parse the request body
    const { name, job_title, company, location, summary } = await req.json();

    // Basic validation
    if (!name || !job_title || !company || !location || !summary) {
      console.warn("Missing required parameters in API request body");
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: name, job_title, company, location, summary' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log("API received data:", { name, job_title, company, location, summary });

    // Call the utility function to generate the message
    const personalizedMessage = await generatePersonalizedMessage({
      name,
      job_title,
      company,
      location,
      summary,
    });

    // Send the generated message back as JSON
    console.log("API sending success response.");
    return new Response(
      JSON.stringify({ message: personalizedMessage }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('API Error generating personalized message:', error);
    // Send a generic server error response
    return new Response(
      JSON.stringify({ error: 'Failed to generate personalized message due to a server error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

