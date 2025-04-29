#  Campaign Manager with AI Message Generator

This is a full-stack campaign management system built entirely in **Next.js 13+ App Router** using **TypeScript**, **MongoDB**, and **ShadCN/UI**. It allows you to manage campaigns and generate personalized LinkedIn outreach messages using Gemini API.

---

##  Features

###  Campaign Management
- Create, read, update, and soft-delete campaigns.
- Campaign fields:
  - Name
  - Description
  - Status (Active / Inactive / Deleted)
  - Leads (LinkedIn URLs)
  - Account IDs

###  AI Message Generator
- Uses OpenAI to generate personalized outreach messages.
- Takes name, job title, company, location, and summary as input.

---

##  Tech Stack

- **Next.js 13+** (App Router)
- **TypeScript**
- **MongoDB + Mongoose**
- **Tailwind CSS**
- **ShadCN/UI**
- **Gemini 2.5(experimental)**
---

---
##  Project Structure

app/ ├── api/ │ ├── campaigns/ │ │ ├── [id]/route.ts // GET, PUT, DELETE campaign by ID │ │ └── route.ts // GET all, POST new campaign │ └── personalized-message/ │ └── route.ts // POST AI-generated message ├── page.tsx // Landing page (optional) ├── components/ │ ├── CampaignForm.tsx │ ├── CampaignList.tsx │ └── MessageGeneratorForm.tsx lib/ ├── models/ │ └── campaign.model.ts // Mongoose schema for campaigns ├── mongodb.ts // MongoDB connection helper ├── services/ │ └── ai.service.ts // AI message generator using OpenAI .env.local // Environment variables
---
