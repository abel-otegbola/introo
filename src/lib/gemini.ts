import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const client = new GoogleGenAI({ apiKey });

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
  color?: string;
  svgContent?: string;
  file?: string;
}

export interface ImageGenerationResponse {
  imageUrl: string;
  prompt: string;
}

export type VoiceOption = 'Puck' | 'Kore' | 'Charon' | 'Fenrir' | 'Aoede';

export interface VoiceGenerationResponse {
  audioUrl: string;
  transcript: string;
}

// Convert base64 PCM audio to WAV format
function pcmToWav(base64Pcm: string, sampleRate: number = 24000): string {
  // Decode base64 to bytes
  const binaryString = atob(base64Pcm);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // PCM is 16-bit (2 bytes per sample), mono
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = bytes.length;

  // Create WAV header
  const header = new ArrayBuffer(44);
  const view = new DataView(header);

  // "RIFF" chunk descriptor
  view.setUint32(0, 0x52494646, false); // "RIFF"
  view.setUint32(4, 36 + dataSize, true); // File size - 8
  view.setUint32(8, 0x57415645, false); // "WAVE"

  // "fmt " sub-chunk
  view.setUint32(12, 0x666d7420, false); // "fmt "
  view.setUint32(16, 16, true); // Subchunk1 size (16 for PCM)
  view.setUint16(20, 1, true); // Audio format (1 for PCM)
  view.setUint16(22, numChannels, true); // Number of channels
  view.setUint32(24, sampleRate, true); // Sample rate
  view.setUint32(28, byteRate, true); // Byte rate
  view.setUint16(32, blockAlign, true); // Block align
  view.setUint16(34, bitsPerSample, true); // Bits per sample

  // "data" sub-chunk
  view.setUint32(36, 0x64617461, false); // "data"
  view.setUint32(40, dataSize, true); // Data size

  // Combine header and audio data
  const wavBytes = new Uint8Array(44 + dataSize);
  wavBytes.set(new Uint8Array(header), 0);
  wavBytes.set(bytes, 44);

  // Convert to base64
  let binary = '';
  for (let i = 0; i < wavBytes.length; i++) {
    binary += String.fromCharCode(wavBytes[i]);
  }
  const base64Wav = btoa(binary);

  return `data:audio/wav;base64,${base64Wav}`;
}

interface ContentPart {
  text?: string;
  inlineData?: {
    mimeType?: string;
    data: string;
  };
}

interface GenerateContentResponse {
  candidates?: Array<{
    content?: {
      parts?: ContentPart[];
    };
  }>;
}

// Generate voice narration based on video elements
export async function generateVoiceNarration(
  elements: AIGeneratedElement[],
  voice: VoiceOption = 'Kore',
  projectInfo?: ProjectInfo
): Promise<VoiceGenerationResponse> {
  try {
    // Verify API key is set
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error('NEXT_PUBLIC_GEMINI_API_KEY environment variable is not set');
    }

    console.log(`Generating voice narration with ${voice} voice...`);

    // First, generate a natural narration script using Gemini
    let narrativeScript: string;
    
    if (projectInfo) {
      console.log('Generating narration script with AI...');
      const scriptPrompt = `Create a natural, engaging voiceover narration for a ${Math.max(...elements.map(e => (e.start || 0) + e.duration))}-second video presentation.

Project: ${projectInfo.projectName}
Description: ${projectInfo.projectDescription}
About: ${projectInfo.bio}
Client: ${projectInfo.clientInfo}
${projectInfo.keyMetrics ? `Key Metrics: ${projectInfo.keyMetrics.map(m => `${m.label}: ${m.value}`).join(', ')}` : ''}

The video has ${elements.length} scenes with the following content:
${elements.map((e, i) => `Scene ${i + 1} (${e.duration}s): ${e.content || e.title}`).join('\n')}

Create a professional, conversational voiceover script that:
- Flows naturally and smoothly from one scene to the next
- Connects all the scene descriptions into a compelling narrative
- Describes the project, its features, and benefits
- Matches the video timing (about ${Math.max(...elements.map(e => (e.start || 0) + e.duration))} seconds when read aloud)
- Sounds engaging, persuasive, and professional
- Doesn't mention scene numbers or timing
- Tells a compelling story about the project
- Weaves together the scene descriptions seamlessly

Write ONLY the narration text, no stage directions or metadata. Keep it concise and impactful.`;

      const scriptResult = await client.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{ role: 'user', parts: [{ text: scriptPrompt }] }],
      });

      const scriptResponse = scriptResult as GenerateContentResponse;
      narrativeScript = scriptResponse.candidates?.[0]?.content?.parts?.[0]?.text || '';
      console.log('Generated script:', narrativeScript);
    } else {
      // Fallback: create simple narration from elements
      narrativeScript = elements.map((el) => {
        if (el.content) return el.content;
        return `${el.title}`;
      }).join('. ');
    }

    console.log('Narration text:', narrativeScript);
    console.log('Generating audio with text-to-speech...');

    // Generate audio using gemini-2.5-flash-preview-tts with proper config
    const audioModel = 'gemini-2.5-flash-preview-tts';
    
    try {
      const audioResult = await client.models.generateContent({
        model: audioModel,
        contents: [{ role: 'user', parts: [{ text: narrativeScript }] }],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: voice
              }
            }
          }
        }
      });

      console.log('Full audio result:', JSON.stringify(audioResult, null, 2));

      // Check if we got candidates
      if (!audioResult.candidates || audioResult.candidates.length === 0) {
        console.error('No candidates in response');
        throw new Error('No candidates returned from audio generation');
      }

      const candidate = audioResult.candidates[0];
      console.log('First candidate:', JSON.stringify(candidate, null, 2));

      if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
        console.error('No parts in candidate content');
        throw new Error('No content parts in audio response');
      }

      const firstPart = candidate.content.parts[0];
      console.log('First part:', JSON.stringify(firstPart, null, 2));
      console.log('First part keys:', Object.keys(firstPart));

      // Check if inlineData exists
      if (!('inlineData' in firstPart)) {
        console.error('No inlineData in first part. Part contains:', Object.keys(firstPart));
        throw new Error('No inlineData found in response. Got: ' + JSON.stringify(firstPart));
      }

      const inlineData = firstPart.inlineData;
      if (!inlineData || !inlineData.data) {
        console.error('InlineData exists but has no data:', inlineData);
        throw new Error('InlineData has no audio data');
      }

      const audioData = inlineData.data;
      const mimeType = inlineData.mimeType || 'audio/wav';
      
      console.log('Audio data length:', audioData.length);
      console.log('MIME type:', mimeType);
      
      // Convert PCM to WAV if needed
      let audioUrl: string;
      if (mimeType.includes('L16') || mimeType.includes('pcm')) {
        console.log('Converting PCM to WAV format...');
        // Extract sample rate from MIME type (e.g., "rate=24000")
        const rateMatch = mimeType.match(/rate=(\d+)/);
        const sampleRate = rateMatch ? parseInt(rateMatch[1]) : 24000;
        audioUrl = pcmToWav(audioData, sampleRate);
        console.log('Converted to WAV format');
      } else {
        audioUrl = `data:${mimeType};base64,${audioData}`;
      }
      
      console.log('Voice narration generated successfully, audio URL length:', audioUrl.length);
      
      return {
        audioUrl,
        transcript: narrativeScript,
      };
    } catch (apiError) {
      console.error('API Error details:', apiError);
      console.error('Error message:', apiError instanceof Error ? apiError.message : String(apiError));
      console.error('Error stack:', apiError instanceof Error ? apiError.stack : 'No stack');
      throw apiError;
    }
  } catch (error) {
    console.error('Error generating voice narration:', error);
    throw error;
  }
}

// Generate images and text elements using Gemini 3 Pro Image Preview
export async function generateImageWithGemini(
  projectInfo: ProjectInfo
): Promise<AIGeneratedElement[]> {
  try {
    // Verify API key is set
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error('NEXT_PUBLIC_GEMINI_API_KEY environment variable is not set');
    }

    const elements: AIGeneratedElement[] = [];
    let currentTime = 0;
    const model = 'gemini-3-pro-image-preview';

    // Generate 5-6 different images with different themes
    const imagePrompts = [
      {
        title: 'Opening Hero',
        description: `Introducing ${projectInfo.projectName}, ${projectInfo.projectDescription}`,
        prompt: `Create a stunning, professional hero image for: ${projectInfo.projectName}\n\nDescription: ${projectInfo.projectDescription}\n\nStyle: Bold, modern, eye-catching. Perfect opening shot.`,
        duration: 4
      },
      {
        title: 'Core Concept',
        description: `The vision behind ${projectInfo.projectName} is to revolutionize how we approach ${projectInfo.projectDescription}`,
        prompt: `Create an image showing the core concept/product for: ${projectInfo.projectName}\n\nDescription: ${projectInfo.projectDescription}\n\nStyle: Clear, focused, professional. Shows what it is.`,
        duration: 5
      },
      {
        title: 'Key Features',
        description: `${projectInfo.bio}. Built for ${projectInfo.clientInfo}`,
        prompt: `Create a visual representation of key features for: ${projectInfo.projectName}\n\nAbout: ${projectInfo.bio}\nClient: ${projectInfo.clientInfo}\n\nStyle: Detailed, informative, highlighting capabilities.`,
        duration: 4
      },
      {
        title: 'In Action',
        description: `See ${projectInfo.projectName} in real-world action, delivering results and making an impact`,
        prompt: `Create an image showing ${projectInfo.projectName} in use or in action\n\nDescription: ${projectInfo.projectDescription}\n\nStyle: Dynamic, engaging, showing real-world application.`,
        duration: 5
      },
      {
        title: 'Results & Impact',
        description: `${projectInfo.keyMetrics ? projectInfo.keyMetrics.map(m => `${m.label}: ${m.value}`).join(', ') + '. ' : ''}Proven success and measurable impact`,
        prompt: `Create an impactful image showing results/success for: ${projectInfo.projectName}\n\n${projectInfo.keyMetrics ? `Metrics: ${projectInfo.keyMetrics.map(m => `${m.label}: ${m.value}`).join(', ')}` : 'Focus on positive outcomes'}\n\nStyle: Inspiring, showing achievement and value.`,
        duration: 4
      },
      {
        title: 'Closing Vision',
        description: `The future with ${projectInfo.projectName} is bright, innovative, and full of possibilities`,
        prompt: `Create a powerful closing/vision image for: ${projectInfo.projectName}\n\nDescription: ${projectInfo.projectDescription}\n\nStyle: Inspiring, forward-looking, memorable conclusion.`,
        duration: 4
      }
    ];

    console.log('Generating 6 images with Gemini 3 Pro...');

    // Generate all images
    for (let i = 0; i < imagePrompts.length; i++) {
      const { title, description, prompt, duration } = imagePrompts[i];
      console.log(`Generating image ${i + 1}/${imagePrompts.length}: ${title}`);

      try {
        const result = await client.models.generateContent({
          model,
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
        });

        const response = result as GenerateContentResponse;
        const parts = response.candidates?.[0]?.content?.parts;
        
        const imagePart = parts?.find((part: ContentPart): part is ContentPart => 'inlineData' in part && !!part.inlineData);

        if (imagePart && 'inlineData' in imagePart && imagePart.inlineData) {
          const imageUrl = `data:${imagePart.inlineData.mimeType || "image/png"};base64,${imagePart.inlineData.data}`;
          
          elements.push({
            type: 'image',
            content: description, // Description for voice narration
            title,
            duration,
            start: currentTime,
            animation: ['fade', 'slideLeft', 'zoomIn', 'slideRight', 'fadeSlideUp', 'scaleRotate'][i % 6],
            position: { x: 0, y: 0 },
            file: imageUrl,
          });

          currentTime += duration;
          console.log(`Image ${i + 1} generated successfully`);
        } else {
          console.warn(`No image data for image ${i + 1}, skipping`);
        }
      } catch (error) {
        console.error(`Failed to generate image ${i + 1}:`, error);
        // Continue with other images even if one fails
      }

      // Small delay between requests to avoid rate limiting
      if (i < imagePrompts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    if (elements.length === 0) {
      throw new Error('No images generated');
    }

    console.log(`Successfully generated ${elements.length} images`);
    return elements;
  } catch (error) {
    console.error('Error generating elements with Gemini:', error);
    throw error;
  }
}

// Original function maintained for backward compatibility
export async function generateVideoElements(projectInfo: ProjectInfo) {
  try {
    // Use the Gemini model for text generation
    const model = 'gemini-2.0-flash';

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

CRITICAL RULES:
1. MAX 30 SECONDS total duration
2. Text: MINIMAL, CONCISE, 3-5 WORDS MAX per text element
3. Prioritize: IMAGES/VIDEOS (60%) > GRAPHS (30%) > TEXT (10%)
4. ALL text MUST use HANDWRITING-STYLE SVG paths with strokeDashoffset animation
5. Font size equivalent: 24-48px stroke-width (3-6px)
6. If metrics provided, create ANIMATED graph SVGs
7. Include ALL uploaded media

Elements to create:
1. Title (3-5 words, SVG, 3s max)
2. ALL uploaded images/videos (4-5s each)
3. If metrics: Animated graph (5-6s)
4. Key feature (3-5 words, SVG, 3s)
5. Call to action (3-5 words, SVG, 3s)

For each element:
- type: "svg" (handwriting text/animated graphs), "image", or "video"
- content: ULTRA CONCISE text (3-5 words) or graph description
- title: element name
- duration: 2-6 seconds (total must not exceed 30s)
- start: when it starts (ensure total ≤ 30s)
- animation: fade, slideLeft, slideRight, slideUp, slideDown, zoomIn, zoomOut
- position: {x, y} (x: 20-200, y: 50-300 for visibility)
- color: USE CONSISTENT THEME - Pick ONE color family and use shades: Purple (#8263F4, #9B7EFF, #B49FFF) OR Blue (#3B82F6, #60A5FA, #93C5FD) OR Green (#10B981, #34D399, #6EE7B7)
- file: for image/video, index as string ("0", "1")
- svgContent: FOR ALL SVG ELEMENTS, generate COMPLETE SVG markup with handwriting animations for text

SVG GENERATION RULES (CRITICAL):
For ALL type="svg" elements, you MUST generate complete animated SVG code in the "svgContent" property.

=== TEXT SVG - HANDWRITING ANIMATION (REQUIRED) ===
For ALL text elements, use HANDWRITING ANIMATION with SVG paths and strokeDashoffset:
- Convert text to SVG <path> elements (not <text> tags)
- Use stroke-based rendering with strokeDashoffset animation
- Animate from full dashoffset to 0 to create drawing effect
- Use stroke color (theme color) with NO fill initially
- Add glow/shadow filters for beautiful effect

HANDWRITING PATH CREATION GUIDE:
- Create cursive/script-style letter paths using SVG path commands
- Use M (moveto), L (lineto), Q (quadratic curve), C (cubic curve)
- Connect letters naturally like handwriting - flowing, organic shapes
- Add natural variations - slight curves, varying heights
- strokeDasharray should be large (1000-2000) to cover entire path
- strokeDashoffset animates from same value to 0

HANDWRITING TEXT EXAMPLE (CRITICAL - USE THIS PATTERN):
"<svg width=\\"600\\" height=\\"120\\" xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 600 120\\"><defs><filter id=\\"glow\\"><feGaussianBlur stdDeviation=\\"3\\" result=\\"coloredBlur\\"/><feMerge><feMergeNode in=\\"coloredBlur\\"/><feMergeNode in=\\"SourceGraphic\\"/></feMerge></filter></defs><path d=\\"M50,60 Q80,20 120,60 T190,60 M210,30 L210,90 M230,60 Q260,20 300,60\\" fill=\\"none\\" stroke=\\"#8263F4\\" stroke-width=\\"4\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" filter=\\"url(#glow)\\" stroke-dasharray=\\"1000\\" stroke-dashoffset=\\"1000\\"><animate attributeName=\\"stroke-dashoffset\\" from=\\"1000\\" to=\\"0\\" dur=\\"2s\\" fill=\\"freeze\\"/></path></svg>"

IMPORTANT: 
- Each word/letter should be a continuous path with curves
- Use stroke-dasharray and stroke-dashoffset for handwriting reveal
- Make paths look like handwritten calligraphy/script
- Keep stroke-width between 3-6 for readability
- Use smooth curves (Q, C commands) for organic handwritten feel
- Duration should be 1.5-3s for smooth handwriting animation

=== GRAPH/CHART SVG EXAMPLES ===
For graphs (when metrics provided), generate ANIMATED CHARTS:

BAR CHART EXAMPLE:
"<svg width=\\"600\\" height=\\"400\\" xmlns=\\"http://www.w3.org/2000/svg\\"><text x=\\"300\\" y=\\"30\\" font-size=\\"24\\" font-weight=\\"bold\\" text-anchor=\\"middle\\" fill=\\"#1a1a1a\\">Revenue Growth</text><rect x=\\"80\\" y=\\"340\\" width=\\"80\\" height=\\"200\\" fill=\\"#8263F4\\" rx=\\"4\\"><animate attributeName=\\"y\\" from=\\"340\\" to=\\"140\\" dur=\\"1s\\" fill=\\"freeze\\"/><animate attributeName=\\"height\\" from=\\"0\\" to=\\"200\\" dur=\\"1s\\" fill=\\"freeze\\"/></rect><text x=\\"120\\" y=\\"360\\" font-size=\\"14\\" text-anchor=\\"middle\\" fill=\\"#666\\">Q1</text><rect x=\\"200\\" y=\\"340\\" width=\\"80\\" height=\\"150\\" fill=\\"#9B7EFF\\" rx=\\"4\\"><animate attributeName=\\"y\\" from=\\"340\\" to=\\"190\\" dur=\\"1s\\" fill=\\"freeze\\" begin=\\"0.2s\\"/><animate attributeName=\\"height\\" from=\\"0\\" to=\\"150\\" dur=\\"1s\\" fill=\\"freeze\\" begin=\\"0.2s\\"/></rect><text x=\\"240\\" y=\\"360\\" font-size=\\"14\\" text-anchor=\\"middle\\" fill=\\"#666\\">Q2</text></svg>"

LINE CHART EXAMPLE:
"<svg width=\\"600\\" height=\\"400\\" xmlns=\\"http://www.w3.org/2000/svg\\"><defs><linearGradient id=\\"lineGrad\\" x1=\\"0%\\" y1=\\"0%\\" x2=\\"100%\\" y2=\\"0%\\"><stop offset=\\"0%\\" style=\\"stop-color:#8263F4\\"/><stop offset=\\"100%\\" style=\\"stop-color:#B8A3FF\\"/></linearGradient></defs><text x=\\"300\\" y=\\"30\\" font-size=\\"24\\" font-weight=\\"bold\\" text-anchor=\\"middle\\" fill=\\"#1a1a1a\\">User Growth</text><path d=\\"M 60 340 L 180 280 L 300 200 L 420 160 L 540 100\\" fill=\\"none\\" stroke=\\"url(#lineGrad)\\" stroke-width=\\"4\\" stroke-linecap=\\"round\\"><animate attributeName=\\"stroke-dasharray\\" from=\\"0,1000\\" to=\\"1000,0\\" dur=\\"2s\\" fill=\\"freeze\\"/></path><circle cx=\\"60\\" cy=\\"340\\" r=\\"6\\" fill=\\"#8263F4\\"><animate attributeName=\\"r\\" from=\\"0\\" to=\\"6\\" dur=\\"0.5s\\" fill=\\"freeze\\" begin=\\"1.5s\\"/></circle></svg>"

ANIMATION CONSISTENCY: Use similar SVG filter styles for all text elements.
THEME CONSISTENCY: Use ONE color family (purple OR blue OR green shades only).

Return ONLY a valid JSON array. EXAMPLE:
[
  {
    "type": "svg",
    "content": "Product Launch",
    "title": "Title",
    "duration": 3,
    "start": 0,
    "animation": "fade",
    "position": {"x": 50, "y": 120},
    "color": "#8263F4",
    "svgContent": "<svg width=\\"600\\" height=\\"120\\" xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 600 120\\"><defs><filter id=\\"glow1\\"><feGaussianBlur stdDeviation=\\"3\\" result=\\"blur\\"/><feMerge><feMergeNode in=\\"blur\\"/><feMergeNode in=\\"SourceGraphic\\"/></feMerge></filter></defs><path d=\\"M40,60 Q50,30 70,50 Q90,70 110,50 Q130,30 150,60 M170,40 L170,80 M170,40 Q190,35 210,50 Q230,65 210,80\\" fill=\\"none\\" stroke=\\"#8263F4\\" stroke-width=\\"5\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" filter=\\"url(#glow1)\\" stroke-dasharray=\\"1000\\" stroke-dashoffset=\\"1000\\"><animate attributeName=\\"stroke-dashoffset\\" from=\\"1000\\" to=\\"0\\" dur=\\"2s\\" fill=\\"freeze\\"/></path></svg>"
  },
  {
    "type": "image",
    "content": "Product",
    "title": "Image 1",
    "duration": 5,
    "start": 3,
    "animation": "fade",
    "position": {"x": 0, "y": 0},
    "file": "0"
  },
  {
    "type": "svg",
    "content": "Revenue Growth",
    "title": "Bar Chart",
    "duration": 6,
    "start": 8,
    "animation": "slideUp",
    "position": {"x": 50, "y": 100},
    "color": "#9B7EFF",
    "svgContent": "<svg width=\\"600\\" height=\\"400\\" xmlns=\\"http://www.w3.org/2000/svg\\"><text x=\\"300\\" y=\\"30\\" font-size=\\"24\\" font-weight=\\"bold\\" text-anchor=\\"middle\\" fill=\\"#1a1a1a\\">Revenue</text><rect x=\\"80\\" y=\\"340\\" width=\\"80\\" height=\\"200\\" fill=\\"#8263F4\\" rx=\\"4\\"><animate attributeName=\\"y\\" from=\\"340\\" to=\\"140\\" dur=\\"1s\\" fill=\\"freeze\\"/><animate attributeName=\\"height\\" from=\\"0\\" to=\\"200\\" dur=\\"1s\\" fill=\\"freeze\\"/></rect></svg>"
  }
]

KEY: Keep total duration ≤ 30s, text ≤ 5 words, ALL TEXT MUST USE HANDWRITING SVG PATHS with strokeDashoffset animation, ONE color theme.`;

    const result = await client.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
    
    const response = result as GenerateContentResponse;
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
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
