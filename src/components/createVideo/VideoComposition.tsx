'use client';

import React from 'react';
import { AbsoluteFill, Audio, Img, Video, useCurrentFrame, useVideoConfig } from 'remotion';
import { Data } from '@/app/account/create-video/page';
import { getAnimationStyle } from '@/helpers/animationHelpers';

interface VideoCompositionProps {
  data: Data;
}

export const VideoComposition: React.FC<VideoCompositionProps> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      {data.elements.map((element) => {
        const startFrame = (element.start || 0) * fps;
        const durationFrames = element.duration * fps;
        const endFrame = startFrame + durationFrames;

        // Only render if current frame is within element's time range
        if (frame < startFrame || frame >= endFrame) {
          return null;
        }

        const elementFrame = frame - startFrame;

        // Get animation styles
        const animationStyle = getAnimationStyle({
          elementFrame,
          durationFrames,
          fps,
          animationType: element.animation || 'fade',
        });

        // Base zoom scale
        let baseScale = 1;
        if (element.zoom && element.zoom !== '100') {
          baseScale = parseInt(element.zoom) / 100;
        }

        // Combine animation transform with base scale
        let combinedTransform = animationStyle.transform || '';
        if (baseScale !== 1) {
          combinedTransform = combinedTransform 
            ? `${combinedTransform} scale(${baseScale})`
            : `scale(${baseScale})`;
        }
        
        // Add rotation
        const rotation = element.rotation || 0;
        if (rotation !== 0) {
          combinedTransform = combinedTransform 
            ? `${combinedTransform} rotate(${rotation}deg)`
            : `rotate(${rotation}deg)`;
        }

        const style: React.CSSProperties = {
          position: 'absolute',
          top: element.position?.y || 0,
          left: element.position?.x || 0,
          opacity: animationStyle.opacity ?? 1,
          transform: combinedTransform,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        };

        // Render text element
        if (element.type === 'text') {
          return (
            <div
              key={element.id}
              style={{
                position: 'absolute',
                top: element.position?.y || 0,
                left: element.position?.x || 0,
                opacity: animationStyle.opacity ?? 1,
                transform: combinedTransform,
                fontSize: element.fontSize || 48,
                fontWeight: element.fontWeight || 'bold',
                color: element.color || '#000000',
                backgroundColor: element.backgroundColor || 'transparent',
                textAlign: (element.textAlign || 'center') as 'left' | 'center' | 'right',
                padding: '20px',
                width: 'auto',
                maxWidth: '80%',
                wordWrap: 'break-word',
              }}
            >
              {element.text || 'Your Text Here'}
            </div>
          );
        }

        // Render SVG element
        if (element.type === 'svg' && element.svgContent) {
          return (
            <div
              key={element.id}
              style={{
                position: 'absolute',
                top: element.position?.y || 0,
                left: element.position?.x || 0,
                opacity: animationStyle.opacity ?? 1,
                transform: combinedTransform,
              }}
              dangerouslySetInnerHTML={{ __html: element.svgContent }}
            />
          );
        }

        if (!element.file) {
          console.warn('Element has no file:', element);
          return null;
        }

        if (element.type === 'image') {
          console.log('Rendering image:', element.title, 'file length:', element.file.length);
          return (
            <React.Fragment key={element.id}>
              {/* Blurred background */}
              <Img
                src={element.file}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'blur(40px)',
                  opacity: (animationStyle.opacity ?? 1) * 0.6,
                  transform: animationStyle.transform || '',
                }}
              />
              {/* Main image */}
              <Img
                src={element.file}
                style={style}
              />
            </React.Fragment>
          );
        }

        if (element.type === 'video') {
          return (
            <React.Fragment key={element.id}>
              {/* Blurred background */}
              <Video
                src={element.file}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'blur(40px)',
                  opacity: (animationStyle.opacity ?? 1) * 0.6,
                  transform: animationStyle.transform || '',
                }}
                startFrom={0}
                endAt={durationFrames}
                pauseWhenBuffering
              />
              {/* Main video */}
              <Video
                src={element.file}
                style={style}
                startFrom={0}
                endAt={durationFrames}
                pauseWhenBuffering
              />
            </React.Fragment>
          );
        }

        return null;
      })}
      
      {/* Voice narration audio */}
      {data.voice && (
        <Audio
          key={`voice-${data.voice}`}
          src={data.voice}
          startFrom={0}
          endAt={data.duration * fps}
          volume={1}
          playbackRate={1}
          pauseWhenBuffering
        />
      )}
      
      {/* Background music */}
      {data.music && (
        <Audio
          key={`music-${data.music}`}
          src={data.music}
          startFrom={0}
          endAt={data.duration * fps}
          volume={0.3}
          playbackRate={1}
          pauseWhenBuffering
        />
      )}
    </AbsoluteFill>
  );
};
