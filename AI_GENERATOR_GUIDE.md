# AI Video Generator - Setup & Usage Guide

## Overview
The AI Video Generator uses Google's Gemini AI to automatically create professional presentation videos from your project information. It generates **beautifully styled SVG text elements**, dynamic charts, and intelligently integrates your uploaded images/videos with animations and timing.

## ✨ New Features
- 🎨 **Styled SVG Text**: All text is now rendered as professionally designed SVG graphics with 5 unique styles
- 🖼️ **Smart Image Integration**: AI automatically includes and positions your uploaded images/videos
- 📊 **Dynamic Charts**: Generates SVG bar charts and pie charts from metrics
- 🎯 **Intelligent Composition**: AI strategically places elements for maximum visual impact
- ⏱️ **Auto-Timing**: Calculates optimal duration and sequencing for smooth flow

## Features
- 🤖 **AI-Powered Content Generation**: Automatically creates 10-15 video elements
- 🎨 **5 SVG Text Styles**: Modern, Gradient, Outlined, Shadow, and Neon
- 📊 **Dynamic Charts**: Generates SVG bar charts and pie charts from metrics
- 🖼️ **Upload Integration**: Automatically includes ALL uploaded images/videos
- 🎨 **Smart Animations**: AI selects appropriate animations for each element
- ⏱️ **Intelligent Timing**: Automatically calculates element duration and sequencing
- 🎯 **Professional Structure**: Creates title, intro, features, metrics, and conclusion slides

## SVG Text Styles

### 1. Modern (Default)
- Clean, professional look
- Subtle gradient background
- Colored accent bar on left
- Best for: Titles, headings, professional content

### 2. Gradient
- Vibrant multi-color gradient text
- Dark elegant background
- Eye-catching and dynamic
- Best for: Hero sections, call-to-actions, highlights

### 3. Outlined
- Bold outlined text style
- White fill with colored stroke
- Clean and impactful
- Best for: Emphasis, quotes, key points

### 4. Shadow
- Soft drop shadow effect
- Elegant and subtle
- Professional depth
- Best for: Body text, descriptions, details

### 5. Neon
- Glowing neon effect
- Dark background
- Futuristic and bold
- Best for: Tech products, modern brands, attention-grabbing

## Setup Instructions

### 1. Get Your Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Configure Environment Variables
1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
2. Open `.env.local` and add your API key:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
   ```

### 3. Install Dependencies
The required package is already installed:
```bash
npm install @google/generative-ai
```

## How to Use

### 1. Upload Your Media (Optional but Recommended)
- **Before** clicking "AI Generate", upload any images or videos you want included
- Use the left sidebar to add images/videos
- AI will automatically detect and include ALL uploaded media in the presentation
- Images will be strategically positioned between text elements

### 2. Open the AI Generator
- Click the **"AI Generate"** button in the top toolbar (purple button with sparkle icon)

### 3. Fill in Project Information

#### Required Fields:
- **Project Name**: The name of your project or presentation
- **Project Description**: Detailed description of your project, solution, features, and benefits
- **Your Bio/About**: Introduction about yourself or your team
- **Client Information**: Client name, industry, testimonial, or case study details

#### Optional Fields:
- **Key Metrics**: Add measurable results (e.g., "Revenue Growth: 150", "Users: 10000")
- **Additional Information**: Any other relevant details

### 4. Generate Video
- Click "Generate Video" button
- Wait for AI to process (usually 5-15 seconds)
- Video elements will be automatically added to your timeline
- **All uploaded images/videos will be included** in the presentation

### 5. Customize Generated Content
After generation, you can:
- Edit any text by double-clicking on canvas
- Adjust timing and duration in the right sidebar
- Move elements by dragging on canvas
- Rotate elements using rotation controls
- Change animations and styling
- Add your own images/videos

## Generated Elements

The AI creates 10-15 elements including:

1. **Title Slide**: Project name with styled SVG text (often uses Gradient or Neon style)
2. **Uploaded Media**: ALL your uploaded images/videos strategically placed
3. **Introduction**: Your bio/about section (Modern or Shadow style)
4. **Problem/Context**: Sets up the need for your solution (Outlined style)
5. **Solution**: Your project description and approach (Modern style)
6. **Key Features**: 2-3 styled SVG text elements highlighting benefits
7. **Metrics/Charts**: SVG visualizations of your key metrics (bar or pie charts)
8. **Client Section**: Client information or testimonial (Shadow style)
9. **Call-to-Action**: Conclusion and next steps (Gradient or Modern style)

### SVG Text Features
- **Professional Design**: Each text element is a beautifully styled SVG graphic
- **5 Unique Styles**: Modern, Gradient, Outlined, Shadow, Neon
- **Responsive**: SVG scales perfectly at any zoom level
- **Customizable**: Position, rotate, and animate like any other element
- **Backgrounds**: Built-in backgrounds, borders, and visual effects

### Media Integration
- AI analyzes your uploaded images and determines optimal placement
- Images/videos are positioned between text elements for visual flow
- Timing is automatically adjusted to showcase media properly
- Captions or context text may be added near images

## Chart Types

### Bar Charts
- Best for comparing values across categories
- Automatically generated when metrics are provided
- Professional purple theme matching your brand

### Pie Charts
- Best for showing proportions/percentages
- Generated when AI detects percentage-based data
- Color-coded with legend

## Tips for Best Results

### 1. Upload Relevant Images First
✅ **Recommended Workflow**:
1. Upload 2-5 key images/screenshots before generating
2. Use product screenshots, team photos, or relevant visuals
3. AI will automatically integrate them into the presentation
4. Images add credibility and visual interest

### 2. Be Specific in Descriptions
❌ "A good app"
✅ "A mobile app that helps users track daily habits with gamification and social features"

### 3. Provide Clear Metrics
Use format: "Metric Name: Value"
- "User Growth: 250%"
- "Monthly Users: 50000"
- "Completion Rate: 85"

### 4. Include Client Details
Add context like:
- "Fortune 500 retail company"
- "Startup in fintech space"
- "Client testimonial: 'This solution increased our efficiency by 40%'"

### 5. Structure Your Description
Include:
- What problem it solves
- How it works
- Key features (3-5 bullet points)
- Benefits/results

### 6. Leverage SVG Text Benefits
✨ **Why SVG Text is Better**:
- **Scalable**: Zoom in/out without pixelation or quality loss
- **Professional**: Pre-designed styles look polished and consistent
- **Dynamic**: Built-in backgrounds, gradients, and visual effects
- **Customizable**: Still fully movable, rotatable, and deletable
- **Eye-catching**: Gradient and Neon styles grab attention

## Example Input

```
Project Name: TaskMaster Pro

Project Description:
TaskMaster Pro is a next-generation project management platform designed for remote teams. It solves the challenge of distributed team coordination by offering real-time collaboration, AI-powered task prioritization, and integrated video conferencing. 

Key Features:
- Automated task assignment based on team member skills
- Real-time progress tracking with visual dashboards
- Integration with 50+ popular tools
- Mobile-first design for on-the-go management

Bio:
We are a team of experienced software engineers passionate about improving workplace productivity. With 15+ years combined experience in SaaS development, we understand the pain points of modern teams.

Client Information:
TechCorp Inc., a leading software development company with 200+ employees, reported 40% increase in project completion rate and 60% reduction in meeting time after implementing TaskMaster Pro.

Key Metrics:
- User Growth: 300
- Task Completion: 95
- Time Saved: 40
- Team Satisfaction: 92

Uploaded Media (before AI generation):
- dashboard-screenshot.png
- team-collaboration.jpg
- mobile-app-demo.png
```

**Result**: AI will generate 12-15 elements including styled SVG text for title/features, bar chart for metrics, and strategically place all 3 uploaded images throughout the presentation.

## Troubleshooting

### "Failed to generate video"
- Check your API key is correct in `.env.local`
- Ensure you have internet connection
- Verify your Gemini API quota isn't exceeded
- Try with shorter descriptions

### Elements not showing
- Check the timeline - elements may be positioned later in the video
- Adjust zoom level to see all elements
- Verify video duration was extended to accommodate all content
- SVG elements are visible and clickable on the canvas overlay

### Charts not generating
- Ensure metrics have both label and value
- Use numeric values only
- Add at least 2-3 metrics for better charts

## Advanced Features

### Custom SVG Content
You can manually edit the `svgContent` property of elements to create custom visualizations.

### Animation Customization
Available animations:
- fade, slideLeft, slideRight, slideUp, slideDown
- zoomIn, zoomOut, rotate, bounce

### Timeline Adjustments
- Elements are auto-spaced with 0.5-2s gaps
- Total duration is auto-calculated with 2s buffer
- Manually adjust in right sidebar after generation

## Working with Generated SVG Elements

### Moving & Positioning
- **Click and drag** any SVG element on the canvas
- Use Position X/Y controls in right sidebar for precise placement
- Elements are fully interactive just like regular text

### Rotating SVG Text
- Select an SVG element
- Use the Rotation control in right sidebar (-360 to 360 degrees)
- Creates dynamic, eye-catching layouts

### Adjusting Timing
- Click element on timeline to select
- Modify Duration and Start Time in right sidebar
- Drag timeline bars to adjust visually

### Cannot Edit SVG Text Content?
- SVG text is rendered as graphics, not editable text
- To change content: Delete element and create new text
- Or regenerate with AI using updated project info
- Future update: SVG text editing support planned

### Deleting Elements
- Select element on timeline
- Click delete button in left sidebar
- Remove unwanted AI-generated elements easily

## API Costs

Google Gemini API offers:
- **Free Tier**: 60 requests per minute
- **Pro Model**: Cost-effective for most use cases
- Monitor usage at [Google Cloud Console](https://console.cloud.google.com/)

## Support

For issues or questions:
1. Check error messages in browser console
2. Verify all required fields are filled
3. Ensure API key is valid and has quota
4. Try regenerating with modified input

---

**Happy Creating! 🎬✨**
