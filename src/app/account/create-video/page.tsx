'use client'
import Bottomvideobar from '@/components/createVideo/Bottomvideobar';
import LeftSidebar from '@/components/createVideo/LeftSidebar';
import RightSidebar from '@/components/createVideo/RightSidebar';
import Topbar from '@/components/createVideo/Topbar';
import { VideoComposition } from '@/components/createVideo/VideoComposition';
import AIGeneratorModal, { ProjectInfo } from '@/components/aiGenerator/AIGeneratorModal';
import VideoExportModal, { ExportSettings } from '@/components/videoExport/VideoExportModal';
import { generateImageWithGemini } from '@/lib/gemini';
import { Player, PlayerRef } from '@remotion/player';
import { useState, useRef, useEffect } from 'react';

export interface Data {
  info: string;
  video: string[];
  voice: string;
  music: string;
  layout: string;
  duration: number;
  title: string;
  zoom: string;
  // Project info for voice generation
  projectInfo?: {
    projectName: string;
    projectDescription: string;
    bio: string;
    clientInfo: string;
    keyMetrics?: {
      label: string;
      value: number;
    }[];
    additionalInfo?: string;
  };
  elements: {
    id: number;
    title: string;
    content?: string; // Description for voice narration
    file: string | null;
    type: string;
    duration: number;
    animation: string;
    transition: string;
    delay: number;
    zoom: string;
    start?: number;
    position?: {
      x: number;
      y: number;
    };
    // Text-specific properties
    text?: string;
    fontSize?: number;
    fontWeight?: string;
    color?: string;
    backgroundColor?: string;
    textAlign?: string;
    rotation?: number;
    width?: number;
    height?: number;
    // SVG-specific properties
    svgContent?: string;
  }[];
}

function CreateVideoPage() {
  const [data, setData] = useState<Data>({ info: "", video: [], voice: "", music: "", layout: "0.5625", duration: 30, title: "Untitled Video", zoom: "100", elements: [] } as Data);
  const [active, setActive] = useState("video")
  const [currentFrame, setCurrentFrame] = useState(0);
  const playerRef = useRef<PlayerRef>(null);
  const [selectedElementId, setSelectedElementId] = useState<number | null>(null);
  const [isEditingText, setIsEditingText] = useState(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isGeneratingMore, setIsGeneratingMore] = useState(false);

  const handleGenerateAudio = () => {
    // Mock data generation - replace with actual API call
    console.log(data)
  }

  const handleAIGenerate = async (projectInfo: ProjectInfo) => {
    setIsGenerating(true);
    try {
      // Generate images and text elements using Gemini 3 Pro Image Preview
      const aiElements = await generateImageWithGemini(projectInfo);
        
        // Convert AI elements to our element format
        const newElements = aiElements.map((aiEl, index) => {
          const baseElement = {
            id: Date.now() + index,
            title: aiEl.title,
            content: aiEl.content, // Description for voice narration
            file: aiEl.file || null,
            type: aiEl.type,
            duration: aiEl.duration,
            animation: aiEl.animation,
            transition: 'fade',
            delay: 0,
            zoom: '100',
            start: aiEl.start,
            position: aiEl.position,
            rotation: 0,
          };

          // Handle SVG elements
          if (aiEl.type === 'svg' && aiEl.svgContent) {
            return {
              ...baseElement,
              svgContent: aiEl.svgContent,
            };
          }

          return baseElement;
        });

        // Calculate total duration
        const maxEndTime = Math.max(...newElements.map(el => (el.start || 0) + el.duration));
        const newDuration = Math.ceil(maxEndTime);

        setData({
          ...data,
          title: projectInfo.projectName,
          info: projectInfo.projectDescription,
          duration: newDuration,
          elements: newElements,
          projectInfo: {
            projectName: projectInfo.projectName,
            projectDescription: projectInfo.projectDescription,
            bio: projectInfo.bio,
            clientInfo: projectInfo.clientInfo,
            keyMetrics: projectInfo.keyMetrics,
            additionalInfo: projectInfo.additionalInfo,
          },
        });

        setIsAIModalOpen(false);
      alert(`Generated ${aiElements.length} elements successfully! 🎉`);
    } catch (error) {
      console.error('Error generating video:', error);
      alert('Failed to generate video. Please check your API key and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateMore = async () => {
    if (!data.info.trim()) {
      alert('Please enter a prompt in the Project Info field');
      return;
    }

    setIsGeneratingMore(true);
    try {
      // Use existing project info or create from current data
      const projectInfo: ProjectInfo = data.projectInfo ? {
        projectName: data.projectInfo.projectName,
        projectDescription: data.projectInfo.projectDescription,
        bio: data.projectInfo.bio,
        clientInfo: data.projectInfo.clientInfo,
        keyMetrics: data.projectInfo.keyMetrics,
        additionalInfo: data.projectInfo.additionalInfo,
      } : {
        projectName: data.title || 'New Content',
        projectDescription: data.info,
        bio: '',
        clientInfo: '',
      };

      // Generate new elements
      const aiElements = await generateImageWithGemini(projectInfo);
      
      // Get the current end time of existing elements
      const currentEndTime = data.elements.length > 0 
        ? Math.max(...data.elements.map(el => (el.start || 0) + el.duration))
        : 0;

      // Convert AI elements and adjust start times to append after existing content
      const newElements = aiElements.map((aiEl, index) => {
        const baseElement = {
          id: Date.now() + index,
          title: aiEl.title,
          content: aiEl.content, // Description for voice narration
          file: aiEl.file || null,
          type: aiEl.type,
          duration: aiEl.duration,
          animation: aiEl.animation,
          transition: 'fade',
          delay: 0,
          zoom: '100',
          start: currentEndTime + aiEl.start, // Offset by current end time
          position: aiEl.position,
          rotation: 0,
        };

        // Handle SVG elements
        if (aiEl.type === 'svg' && aiEl.svgContent) {
          return {
            ...baseElement,
            svgContent: aiEl.svgContent,
          };
        }

        return baseElement;
      });

      // Append new elements to existing ones
      const allElements = [...data.elements, ...newElements];
      
      // Calculate new total duration
      const maxEndTime = Math.max(...allElements.map(el => (el.start || 0) + el.duration));
      const newDuration = Math.ceil(maxEndTime);

      setData({
        ...data,
        duration: newDuration,
        elements: allElements,
        projectInfo: data.projectInfo || {
          projectName: projectInfo.projectName,
          projectDescription: projectInfo.projectDescription,
          bio: projectInfo.bio,
          clientInfo: projectInfo.clientInfo,
          keyMetrics: projectInfo.keyMetrics,
          additionalInfo: projectInfo.additionalInfo,
        },
      });

      alert(`Added ${aiElements.length} new elements! 🎨`);
    } catch (error) {
      console.error('Error generating more content:', error);
      alert('Failed to generate content. Please check your API key and try again.');
    } finally {
      setIsGeneratingMore(false);
    }
  };

  const handleExportVideo = async (settings: ExportSettings) => {
    setIsExporting(true);
    try {
      // Save video data to localStorage for CLI rendering
      const exportData = {
        data,
        settings,
        timestamp: new Date().toISOString(),
      };
      
      localStorage.setItem('videoExportData', JSON.stringify(exportData));
      
      // Download project data as JSON for Remotion CLI
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = window.URL.createObjectURL(dataBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${data.title || 'video'}-project.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setIsExportModalOpen(false);
      
      // Show instructions
      alert(`Project data saved! 📁\n\nTo render your video:\n1. Download completed ✓\n2. Run: npx remotion render\n3. Or use Remotion Studio: npx remotion studio\n\nFor cloud rendering, consider Remotion Lambda.`);
    } catch (error) {
      console.error('Export error:', error);
      alert(`Failed to export project: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const frame = playerRef.current.getCurrentFrame();
        setCurrentFrame(frame);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className='h-[calc(100vh-72px)] overflow-auto'>

      <Topbar data={data} setData={setData} onOpenAIGenerator={() => setIsAIModalOpen(true)} onOpenExport={() => setIsExportModalOpen(true)} />

      <div className="flex h-[calc(100vh-120px)]">
        
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-[#24222D] overflow-auto">
          <div className="flex h-[calc(100%-120px)] ">
            <LeftSidebar data={data} setData={setData} active={active} setActive={setActive} selectedElementId={selectedElementId} setSelectedElementId={setSelectedElementId} />
            <div className="flex-1 flex overflow-auto">
              <div className='flex p-4 justify-center w-full' style={{ transform: `scale(${Number(data.zoom)/100})` }}>
                <div ref={canvasContainerRef} className={`bg-white dark:bg-[#24222D] border border-gray-500/[0.2] leading-[1.2] overflow-hidden relative`} style={{ width: `700px`, height: `${Math.round(700 * Number(data.layout))}px` }}>
                  <Player
                    ref={playerRef}
                    component={VideoComposition}
                    durationInFrames={data.duration * 30}
                    compositionWidth={700}
                    compositionHeight={Math.round(700 * Number(data.layout))}
                    fps={30}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    inputProps={{
                      data: data,
                    }}
                    controls
                  />
                  {/* Interactive overlay for editing */}
                  <div className="absolute inset-0 pointer-events-none">
                    {data.elements.map((element) => {
                      const startFrame = (element.start || 0) * 30;
                      const durationFrames = element.duration * 30;
                      const endFrame = startFrame + durationFrames;
                      
                      if (currentFrame < startFrame || currentFrame >= endFrame) {
                        return null;
                      }

                      return (
                        <div
                          key={element.id}
                          className={`absolute pointer-events-auto cursor-move ${
                            selectedElementId === element.id ? 'ring-2 ring-secondary' : ''
                          }`}
                          style={{
                            left: element.position?.x || 0,
                            top: element.position?.y || 0,
                            transform: `rotate(${element.rotation || 0}deg)`,
                            width: element.width || 'auto',
                            height: element.height || 'auto',
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            const startX = e.clientX;
                            const startY = e.clientY;
                            const startPosX = element.position?.x || 0;
                            const startPosY = element.position?.y || 0;
                            const scale = Number(data.zoom) / 100;

                            const handleMouseMove = (moveEvent: MouseEvent) => {
                              const dx = (moveEvent.clientX - startX) / scale;
                              const dy = (moveEvent.clientY - startY) / scale;
                              
                              setData({
                                ...data,
                                elements: data.elements.map(el =>
                                  el.id === element.id
                                    ? {
                                        ...el,
                                        position: {
                                          x: startPosX + dx,
                                          y: startPosY + dy,
                                        },
                                      }
                                    : el
                                ),
                              });
                            };

                            const handleMouseUp = () => {
                              document.removeEventListener('mousemove', handleMouseMove);
                              document.removeEventListener('mouseup', handleMouseUp);
                            };

                            document.addEventListener('mousemove', handleMouseMove);
                            document.addEventListener('mouseup', handleMouseUp);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedElementId(element.id);
                          }}
                          onDoubleClick={(e) => {
                            if (element.type === 'text') {
                              e.stopPropagation();
                              setIsEditingText(true);
                            }
                          }}
                        >
                          {element.type === 'text' && isEditingText && selectedElementId === element.id ? (
                            <textarea
                              autoFocus
                              value={element.text || ''}
                              onChange={(e) => {
                                setData({
                                  ...data,
                                  elements: data.elements.map(el =>
                                    el.id === element.id
                                      ? { ...el, text: e.target.value }
                                      : el
                                  ),
                                });
                              }}
                              onBlur={() => setIsEditingText(false)}
                              style={{
                                fontSize: element.fontSize || 48,
                                fontWeight: element.fontWeight || 'bold',
                                color: element.color || '#000000',
                                backgroundColor: element.backgroundColor || 'transparent',
                                textAlign: (element.textAlign || 'center') as 'left' | 'center' | 'right',
                                padding: '20px',
                                border: '2px solid #8263F4',
                                outline: 'none',
                                resize: 'both',
                                minWidth: '200px',
                                minHeight: '80px',
                              }}
                              className="pointer-events-auto"
                            />
                          ) : element.type === 'svg' ? (
                            <div
                              style={{
                                pointerEvents: 'none',
                                userSelect: 'none',
                              }}
                              dangerouslySetInnerHTML={{ __html: element.svgContent || '' }}
                            />
                          ) : element.type === 'text' ? (
                            <div
                              style={{
                                fontSize: element.fontSize || 48,
                                fontWeight: element.fontWeight || 'bold',
                                color: element.color || '#000000',
                                backgroundColor: element.backgroundColor || 'transparent',
                                textAlign: (element.textAlign || 'center') as 'left' | 'center' | 'right',
                                padding: '20px',
                                pointerEvents: 'none',
                                userSelect: 'none',
                              }}
                            >
                              {element.text || 'Your Text Here'}
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`mt-0`}>
          {
            active === "video" || active === "voice" ?            
            <Bottomvideobar data={data} setData={setData} handleGenerateAudio={handleGenerateAudio} currentFrame={currentFrame} playerRef={playerRef} selectedElementId={selectedElementId} setSelectedElementId={setSelectedElementId} />
            :
            ""
          }
          </div>
        </div>
        
        <RightSidebar data={data} setData={setData} selectedElementId={selectedElementId} setSelectedElementId={setSelectedElementId} onGenerateMore={handleGenerateMore} isGenerating={isGeneratingMore} />
      </div>

      {/* AI Generator Modal */}
      <AIGeneratorModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onGenerate={handleAIGenerate}
        isGenerating={isGenerating}
      />

      {/* Video Export Modal */}
      <VideoExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExportVideo}
        isExporting={isExporting}
      />
    </div>
  )
}

export default CreateVideoPage