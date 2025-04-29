// components/MessageGeneratorForm.tsx
"use client"; // Required for client-side components

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Import Shadcn UI components - ensure these are installed and configured
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the schema for validation using Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  job_title: z.string().min(2, {
    message: "Job Title must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  summary: z.string().min(10, {
    message: "Summary must be at least 10 characters.",
  }),
});

// Define the type based on the schema
type FormData = z.infer<typeof formSchema>;

const MessageGeneratorForm: React.FC = () => {
  // Initialize react-hook-form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      job_title: '',
      company: '',
      location: '',
      summary: '',
    },
  });

  // State to hold the generated message and loading state
  const [generatedMessage, setGeneratedMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form submission (called by react-hook-form's onSubmit)
  const onSubmit = async (values: FormData) => {
    setIsLoading(true); // Start loading state
    setGeneratedMessage(null); // Clear previous message
    setError(null); // Clear previous error

    try {
      // Make the POST request to your API route
      // The API route path is relative to the base URL
      const response = await fetch('/api/personalized-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values), // Send validated form data as JSON
      });

      if (!response.ok) {
        console.log("success")
        const errorData = await response.json().catch(() => ({ error: 'An unexpected error occurred.' }));
        console.error('API Error Response:', response.status, errorData);
        setError(errorData.error || `Error: ${response.status} ${response.statusText}`);
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setGeneratedMessage(data.message);

    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Fetch or JSON parsing error:', err.message);
      } else {
        console.error('An unknown error occurred:', err);
      }
      setError('Failed to connect to the server or process response.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[450px] mx-auto my-8">
        <CardHeader>
            <CardTitle>Generate Personalized Message</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="job_title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Software Engineer" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input placeholder="TechCorp" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="San Francisco, CA" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="summary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Summary/Interests</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Passionate about..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Generating...' : 'Generate Message'}
                    </Button>
                </form>
            </Form>

            {error && (
                <div className="mt-4 text-sm text-red-500">
                    {error}
                </div>
            )}

            {generatedMessage && (
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle className="text-lg">Generated Message:</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-700">{generatedMessage}</p>
                    </CardContent>
                </Card>
            )}
        </CardContent>
    </Card>
  );
};

export default MessageGeneratorForm;