import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 300; // 5 minutes max execution time

// For client-side export, we'll provide instructions for using Remotion CLI
// Server-side rendering requires additional setup and resources

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, settings } = body;

    if (!data || !settings) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Save the video data for CLI rendering
    // In production, you would:
    // 1. Use Remotion Lambda for cloud rendering
    // 2. Use Remotion CLI locally
    // 3. Implement server-side rendering with proper resources
    
    return NextResponse.json({ 
      message: 'Export initiated. Use Remotion CLI for rendering.',
      instructions: 'Run: npx remotion render src/components/createVideo/VideoComposition.tsx VideoComposition out.mp4',
      data: data,
      settings: settings
    });
    
  } catch (error) {
    console.error('Video export error:', error);
    return NextResponse.json(
      { error: 'Failed to export video', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
