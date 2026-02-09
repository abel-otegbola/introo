'use client'
import Bottomvideobar from '@/components/createVideo/Bottomvideobar';
import LeftSidebar from '@/components/createVideo/LeftSidebar';
import RightSidebar from '@/components/createVideo/RightSidebar';
import Topbar from '@/components/createVideo/Topbar';
import { VideoComposition } from '@/components/createVideo/VideoComposition';
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
  }[];
}

function CreateVideoPage() {
  const [data, setData] = useState<Data>({ info: "", video: [], voice: "", music: "", layout: "0.5625", duration: 30, title: "Untitled Video", zoom: "100", elements: [] } as Data);
  const [active, setActive] = useState("video")
  const [currentFrame, setCurrentFrame] = useState(0);
  const playerRef = useRef<PlayerRef>(null);
  const [selectedElementId, setSelectedElementId] = useState<number | null>(null);

  const handleGenerateAudio = () => {
    // Mock data generation - replace with actual API call
    console.log(data)
  }

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

      <Topbar data={data} setData={setData} />

      <div className="flex h-[calc(100vh-120px)]">
        
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-[#24222D] overflow-auto">
          <div className="flex h-[calc(100%-120px)] ">
            <LeftSidebar data={data} setData={setData} active={active} setActive={setActive} selectedElementId={selectedElementId} setSelectedElementId={setSelectedElementId} />
            <div className="flex-1 flex overflow-auto">
              <div className='flex p-4 justify-center w-full' style={{ transform: `scale(${data.zoom}%)` }}>
                <div className={`bg-white dark:bg-[#24222D] border border-gray-500/[0.2] overflow-hidden`} style={{ width: `700px`, height: `${Math.round(700 * Number(data.layout))}px` }}>
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
    </div>
  )
}

export default CreateVideoPage