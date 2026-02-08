'use client'
import BottomScenesbar from '@/components/createVideo/BottomScenesbar';
import BottomStorybar from '@/components/createVideo/BottomStorybar';
import LeftSidebar from '@/components/createVideo/LeftSidebar';
import RightSidebar from '@/components/createVideo/RightSidebar';
import Topbar from '@/components/createVideo/Topbar';
import { useState } from 'react';

export interface Data {
  info: string;
  scenes: string[];
  voice: string;
  music: string;
  layout: string;
  duration: number;
  title: string;
  zoom: string;
}

function CreateVideoPage() {
  const [data, setData] = useState<Data>({ info: "", scenes: [], voice: "", music: "", layout: "0.5625", duration: 30, title: "Untitled Video", zoom: "100" } as Data);
  const [active, setActive] = useState("scenes")
  
  const handleGenerateVideo = () => {
    // Mock data generation - replace with actual API call
    console.log(data)
  }

  const handleGenerateAudio = () => {
    // Mock data generation - replace with actual API call
    console.log(data)
  }
  
  return (
    <div className='h-[calc(100vh-72px)] overflow-auto'>

      <Topbar data={data} setData={setData} />

      <div className="flex h-[calc(100vh-120px)]">
        
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-[#24222D] overflow-auto">
          <div className="flex h-[calc(100%-120px)] ">
            <LeftSidebar data={data} setData={setData} active={active} setActive={setActive} />
            <div className="flex-1 flex overflow-auto">
              <div className='flex p-4 justify-center w-full' style={{ transform: `scale(${data.zoom}%)` }}>
                <div className={`bg-white dark:bg-[#24222D] border border-gray-500/[0.2]`} style={{ width: `700px`, height: `${700 * Number(data.layout)}px` }}>

                </div>
              </div>
            </div>
          </div>

          <div className={`mt-0`}>
          {
            active === "story" ? 
            <BottomStorybar data={data} setData={setData} handleGenerateVideo={handleGenerateVideo} /> 
            : 
            active === "scenes" ?
            <BottomScenesbar data={data} setData={setData} handleGenerateAudio={handleGenerateAudio} />
            :
            ""
          }
          </div>
        </div>
        
        <RightSidebar data={data} setData={setData} />
      </div>
    </div>
  )
}

export default CreateVideoPage