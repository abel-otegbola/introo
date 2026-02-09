import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export interface ProjectInfo {
  projectName: string;
  projectDescription: string;
  bio: string;
  clientInfo: string;
  keyMetrics?: {
    label: string;
    value: number;
  }[];
  additionalInfo?: string;
  uploadedElements?: {
    type: 'image' | 'video';
    file: string;
    title: string;
  }[];
}

export interface AIGeneratedElement {
  type: 'text' | 'svg' | 'image' | 'video';
  content: string;
  title: string;
  duration: number;
  start: number;
  animation: string;
  position: { x: number; y: number };
  fontSize?: number;
  color?: string;
  fontWeight?: string;
  svgContent?: string;
  textAlign?: string;
  file?: string;
  svgTextStyle?: 'modern' | 'gradient' | 'outlined' | 'shadow' | 'neon';
  isAnimatedGraph?: boolean;
  graphType?: 'bar' | 'pie' | 'line';
}

export async function generateVideoElements(projectInfo: ProjectInfo) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const uploadedImagesInfo = projectInfo.uploadedElements && projectInfo.uploadedElements.length > 0
      ? `\n\nUser has uploaded ${projectInfo.uploadedElements.length} media file(s):\n${projectInfo.uploadedElements.map((el, i) => `${i + 1}. ${el.type}: "${el.title}"`).join('\n')}\n\nIMPORTANT: You MUST include ALL uploaded images/videos in the presentation. Reference them by their index number (0-${projectInfo.uploadedElements.length - 1}).`
      : '';

    const prompt = `You are a professional video presentation creator. Create a CONCISE, VISUAL-FOCUSED video presentation (MAX 30 SECONDS total duration).

Project Name: ${projectInfo.projectName}
Project Description: ${projectInfo.projectDescription}
Bio/About: ${projectInfo.bio}
Client Information: ${projectInfo.clientInfo}
${projectInfo.keyMetrics ? `Key Metrics: ${JSON.stringify(projectInfo.keyMetrics)}` : ''}
${projectInfo.additionalInfo || ''}${uploadedImagesInfo}

Create a video presentation with 6-10 elements (MAX 30 SECONDS TOTAL):
1. Title slide with project name (use SVG with styling)
2. ${projectInfo.uploadedElements && projectInfo.uploadedElements.length > 0 ? 'User uploaded images/videos (MANDATORY - include ALL of them strategically)' : ''}
3. Introduction/bio section (SVG text)
4. Problem statement or context (SVG text)
5. Solution/approach (SVG text)
6. Key features or benefits (2-3 SVG text elements)
7. Metrics/statistics (SVG bar/pie charts if metrics provided)
8. Client information/testimonial (SVG text)
9. Call to action or conclusion (SVG text)

IMPORTANT RULES:
- ALL text should be type "svg" with styled SVG text, NOT plain "text" type
- Use svgTextStyle: choose from "modern", "gradient", "outlined", "shadow", or "neon" for each text element
- For uploaded media, use type "image" or "video" with "file" property as the index number
- Create visually appealing SVG text with backgrounds, borders, and effects

For each element, provide:
- type: "svg" (for text/charts), "image", or "video"
- content: the actual text content or chart description
- title: element name
- duration: how long it should display (3-8 seconds)
- start: when it should start (stagger them for smooth flow)
- animation: choose from (fade, slideLeft, slideRight, slideUp, slideDown, zoomIn, zoomOut)
- position: {x, y} coordinates (use varied positions, ensure visibility within 700px width)
- fontSize: for text (between 28-84)
- color: hex color (use professional colors like #8263F4, #10B981, #F59E0B, #EF4444)
- fontWeight: "bold", "600", or "normal"
- textAlign: "left", "center", or "right"
- svgTextStyle: for SVG text, choose style: "modern", "gradient", "outlined", "shadow", "neon"
- file: for image/video type, use the index number as string (e.g., "0", "1")

Return ONLY a valid JSON array. EXAMPLE:
[
  {
    "type": "svg",
    "content": "Product Launch",
    "title": "Title",
    "duration": 3,
    "start": 0,
    "animation": "zoomIn",
    "position": {"x": 50, "y": 120},
    "fontSize": 36,
    "color": "#8263F4",
    "fontWeight": "bold",
    "textAlign": "center",
    "svgTextStyle": "gradient"
  },
  {
    "type": "image",
    "content": "Product",
    "title": "Image 1",
    "duration": 5,
    "start": 3,
    "animation": "fade",
    "position": {"x": 50, "y": 50},
    "file": "0"
  },
  {
    "type": "svg",
    "content": "Metrics Growth",
    "title": "Graph",
    "duration": 6,
    "start": 8,
    "animation": "slideUp",
    "position": {"x": 50, "y": 50},
    "isAnimatedGraph": true,
    "graphType": "bar"
  }
]

KEY: Keep total duration ≤ 30s, text ≤ 5 words, fontSize ≤ 48px.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response (handle markdown code blocks)
    let jsonText = text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '').replace(/```\n?$/g, '');
    }
    
    const elements: AIGeneratedElement[] = JSON.parse(jsonText);
    return elements;
  } catch (error) {
    console.error('Error generating video elements:', error);
    throw error;
  }
}

export function createSVGBarChart(data: { label: string; value: number }[], width = 600, height = 400) {
  const maxValue = Math.max(...data.map(d => d.value));
  const barWidth = (width - 100) / data.length;
  const chartHeight = height - 100;
  
  let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="white"/>`;
  
  data.forEach((item, index) => {
    const barHeight = (item.value / maxValue) * chartHeight;
    const x = 50 + index * barWidth;
    const y = height - 50 - barHeight;
    
    svg += `
    <rect x="${x}" y="${y}" width="${barWidth - 10}" height="${barHeight}" fill="#8263F4" rx="4"/>
    <text x="${x + barWidth / 2 - 5}" y="${height - 30}" font-size="12" fill="#333">${item.label}</text>
    <text x="${x + barWidth / 2 - 5}" y="${y - 5}" font-size="14" font-weight="bold" fill="#333">${item.value}</text>`;
  });
  
  svg += '</svg>';
  return svg;
}

export function createSVGPieChart(data: { label: string; value: number }[], width = 600, height = 400) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 3;
  
  const colors = ['#8263F4', '#F59E0B', '#10B981', '#EF4444', '#3B82F6', '#8B5CF6'];
  
  let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="white"/>`;
  
  let currentAngle = -90;
  
  data.forEach((item, index) => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle * (Math.PI / 180);
    const endAngle = (currentAngle + angle) * (Math.PI / 180);
    
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    svg += `
    <path d="M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z" 
          fill="${colors[index % colors.length]}" stroke="white" stroke-width="2"/>`;
    
    currentAngle += angle;
  });
  
  // Add legend
  data.forEach((item, index) => {
    const legendY = 50 + index * 25;
    svg += `
    <rect x="20" y="${legendY}" width="15" height="15" fill="${colors[index % colors.length]}"/>
    <text x="40" y="${legendY + 12}" font-size="12" fill="#333">${item.label}: ${item.value}</text>`;
  });
  
  svg += '</svg>';
  return svg;
}

export function createStyledSVGText(
  text: string, 
  style: 'modern' | 'gradient' | 'outlined' | 'shadow' | 'neon' = 'modern',
  fontSize: number = 32,
  color: string = '#8263F4',
  textAlign: 'left' | 'center' | 'right' = 'center',
  fontWeight: string = 'bold',
  width: number = 600,
  height: number = 120
) {
  const lines = text.split('\n').slice(0, 3); // Max 3 lines
  const lineHeight = fontSize * 1.2;
  const totalTextHeight = lines.length * lineHeight;
  const startY = (height - totalTextHeight) / 2 + fontSize;

  let textAnchor = 'middle';
  let textX = width / 2;
  if (textAlign === 'left') {
    textAnchor = 'start';
    textX = 30;
  } else if (textAlign === 'right') {
    textAnchor = 'end';
    textX = width - 30;
  }

  let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;

  // Background and style-specific decorations
  if (style === 'modern') {
    svg += `
    <defs>
      <linearGradient id="modernBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color}15;stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color}05;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#modernBg)" rx="12"/>
    <rect x="0" y="0" width="8" height="${height}" fill="${color}" rx="4"/>`;
  } else if (style === 'gradient') {
    svg += `
    <defs>
      <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#8263F4;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#F59E0B;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#10B981;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:0.95" />
        <stop offset="100%" style="stop-color:#16213e;stop-opacity:0.95" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bgGradient)" rx="12"/>`;
  } else if (style === 'outlined') {
    svg += `
    <rect width="${width}" height="${height}" fill="white" rx="12"/>
    <rect x="4" y="4" width="${width - 8}" height="${height - 8}" fill="none" stroke="${color}" stroke-width="4" rx="8"/>`;
  } else if (style === 'shadow') {
    svg += `
    <defs>
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="6"/>
        <feOffset dx="0" dy="4" result="offsetblur"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.3"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="${width}" height="${height}" fill="#f8f9fa" rx="12" filter="url(#shadow)"/>`;
  } else if (style === 'neon') {
    svg += `
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="${width}" height="${height}" fill="#0a0a0a" rx="12"/>`;
  }

  // Render text lines
  lines.forEach((line, index) => {
    const y = startY + (index * lineHeight);
    
    if (style === 'gradient') {
      svg += `
      <text x="${textX}" y="${y}" font-size="${fontSize}" font-weight="${fontWeight}" 
            text-anchor="${textAnchor}" fill="url(#textGradient)" font-family="Arial, sans-serif">
        ${line}
      </text>`;
    } else if (style === 'outlined') {
      // Outlined text - stroke first, then fill
      svg += `
      <text x="${textX}" y="${y}" font-size="${fontSize}" font-weight="${fontWeight}" 
            text-anchor="${textAnchor}" fill="white" stroke="${color}" stroke-width="3" font-family="Arial, sans-serif">
        ${line}
      </text>
      <text x="${textX}" y="${y}" font-size="${fontSize}" font-weight="${fontWeight}" 
            text-anchor="${textAnchor}" fill="${color}" font-family="Arial, sans-serif">
        ${line}
      </text>`;
    } else if (style === 'neon') {
      svg += `
      <text x="${textX}" y="${y}" font-size="${fontSize}" font-weight="${fontWeight}" 
            text-anchor="${textAnchor}" fill="${color}" filter="url(#glow)" font-family="Arial, sans-serif">
        ${line}
      </text>`;
    } else {
      // Modern and shadow styles
      const fillColor = style === 'shadow' ? '#1a1a1a' : color;
      const filterAttr = style === 'shadow' ? 'filter="url(#shadow)"' : '';
      svg += `
      <text x="${textX}" y="${y}" font-size="${fontSize}" font-weight="${fontWeight}" 
            text-anchor="${textAnchor}" fill="${fillColor}" ${filterAttr} font-family="Arial, sans-serif">
        ${line}
      </text>`;
    }
  });

  svg += '</svg>';
  return svg;
}
