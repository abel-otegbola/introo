# Introo 🎥✨  
**Turn your portfolio into a personalized pitch that converts**

Introo is a creator-first portfolio and storytelling platform designed to give leads the *best possible first impression*. Instead of static links and screenshots, Introo helps creators generate **short, compelling pitch videos** that explain their work using the **STAR-R framework**, powered by AI-generated visuals and natural voiceovers.

This project focuses on clarity, storytelling, and conversion — helping creators move from *“Here’s my portfolio”* to *“Let’s talk.”*

---

## 🚀 What is Introo?

Introo allows users to:
- Transform past projects into **clear, structured stories**
- Generate **AI-powered pitch videos** using images, visuals, and voice
- Share **personalized links** tailored to recruiters, founders, or clients
- Present work in a way that is easy to understand, memorable, and persuasive

---

## ✨ Core Features

### 🎯 Project Storytelling (STAR-R)
- Situation
- Task
- Action
- Result
- Reflection  
Guided inputs ensure every project is explained with impact and clarity.

### 🎬 AI Video Creation
- Auto-generated visuals (from user images + AI images)
- Programmatic video rendering using **Remotion**
- Clean, shareable pitch videos

### 🧠 AI Logic & Generation
- **Google Gemini** for:
  - Image generation
  - Story structuring
  - Content refinement and summaries

### 🗣️ AI Voice Overs
- Natural-sounding narration powered by **ElevenLabs**
- Multiple voice options and tones

### 🔗 Shareable Pitch Links
- Unique links for each project or lead
- Built for quick viewing and first impressions

### 🎨 Creator-Focused UI
- Minimal, modern dashboard
- Clean project showcases
- Brand-forward design using a dark + purple aesthetic

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Video Rendering:** Remotion
- **AI Image & Logic:** Google Gemini API
- **Voice Over:** ElevenLabs API
- **Deployment:** Vercel (recommended)

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/introo.git
cd introo
```
### 2. Install dependencies
```bash
npm install
# or
yarn install
```
### 3. Create environment variables
Create a .env.local file in the root of the project:
``` bash
# Google Gemini
GEMINI_API_KEY=your_google_gemini_api_key

# ElevenLabs
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_VOICE_ID=your_preferred_voice_id

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## ▶️ Running the Project
```bash
npm run dev
```
Visit:
👉 http://localhost:3000

Build for Production
```bash
npm run build
npm start
```

## Project Structure (Simplified)
```bash
/ app
  / dashboard
  / projects
  / videos
  / share
/ components
/ lib
  / gemini
  / elevenlabs
  / remotion
/ remotion
  / compositions
  / render
/ public
/ styles
```

## 🧠 Design Philosophy
- Clarity > Complexity
- Stories > Screenshots
- First impressions matter
- Focused MVP before expansion
This project intentionally avoids feature bloat and prioritizes what creators actually need to convert attention into conversations.

## 🗺️ Roadmap (Future Ideas)
- View analytics on shared links
- Lead-specific personalization
- Multiple pitch versions per project
- Recruiter / founder-specific templates
- Team & collaboration features

## 🤝 Contributing
Contributions, ideas, and feedback are welcome.
This project is built with long-term product thinking and real-world use in mind.

## 📄 License
MIT License

## 💜 Final Note
Introo is not just a portfolio tool.
It’s a storytelling engine for creators who do real work.

If you build something meaningful with it — you’re already using it right.