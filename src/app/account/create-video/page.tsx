'use client'
import Bottomvideobar from '@/components/createVideo/Bottomvideobar';
import LeftSidebar from '@/components/createVideo/LeftSidebar';
import RightSidebar from '@/components/createVideo/RightSidebar';
import Topbar from '@/components/createVideo/Topbar';
import { VideoComposition } from '@/components/createVideo/VideoComposition';
import AIGeneratorModal, { ProjectInfo } from '@/components/aiGenerator/AIGeneratorModal';
import VideoExportModal, { ExportSettings } from '@/components/videoExport/VideoExportModal';
import { generateVideoElements } from '@/lib/gemini';
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
  elements: {
    id: number;
    title: string;
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

  const handleGenerateAudio = () => {
    // Mock data generation - replace with actual API call
    console.log(data)
  }

  const handleAIGenerate = async (projectInfo: ProjectInfo) => {
    setIsGenerating(true);
    try {
      // Include already uploaded elements in the project info
      const uploadedElements = data.elements
        .filter(el => el.type === 'image' || el.type === 'video')
        .map(el => ({
          type: el.type as 'image' | 'video',
          file: el.file || '',
          title: el.title,
        }));

      const enrichedProjectInfo = {
        ...projectInfo,
        uploadedElements: uploadedElements.length > 0 ? uploadedElements : undefined,
      };

      const aiElements = await generateVideoElements(enrichedProjectInfo);
      
      // Convert AI elements to our element format
      const newElements = aiElements.map((aiEl, index) => {
        const baseElement = {
          id: Date.now() + index,
          title: aiEl.title,
          file: null,
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

        // Handle SVG elements - trust Gemini-generated SVG completely
        if (aiEl.type === 'svg' && aiEl.svgContent) {
          return {
            ...baseElement,
            svgContent: aiEl.svgContent,
          };
        } else if (aiEl.type === 'image' || aiEl.type === 'video') {
          // Handle uploaded media files
          const fileIndex = parseInt(aiEl.file || '0');
          const uploadedFile = uploadedElements[fileIndex];
          
          if (uploadedFile) {
            return {
              ...baseElement,
              file: uploadedFile.file,
              type: uploadedFile.type,
            };
          }
          return baseElement;
        }

        return baseElement;
      });

      // Update video duration to accommodate all elements
      const maxEndTime = Math.max(...newElements.map(el => (el.start || 0) + el.duration));
      const newDuration = Math.ceil(maxEndTime) + 2; // Add 2 seconds buffer

      setData({
        ...data,
        title: projectInfo.projectName,
        info: projectInfo.projectDescription,
        duration: newDuration,
        elements: newElements,
      });

      setIsAIModalOpen(false);
      alert('Video elements generated successfully! 🎉');
    } catch (error) {
      console.error('Error generating video:', error);
      alert('Failed to generate video. Please check your API key and try again.');
    } finally {
      setIsGenerating(false);
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
            active === "elements" || active === "video" ?            
            <Bottomvideobar data={data} setData={setData} handleGenerateAudio={handleGenerateAudio} currentFrame={currentFrame} playerRef={playerRef} selectedElementId={selectedElementId} setSelectedElementId={setSelectedElementId} />
            :
            ""
          }
          </div>
        </div>
        
        <RightSidebar data={data} setData={setData} selectedElementId={selectedElementId} setSelectedElementId={setSelectedElementId} />
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