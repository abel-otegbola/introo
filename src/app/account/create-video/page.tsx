'use client'
import Button from '@/components/button/Button';
import LeftSidebar from '@/components/createVideo/LeftSidebar';
import RightSidebar from '@/components/createVideo/RightSidebar';
import Input from '@/components/input/input';
import { ExportIcon } from '@phosphor-icons/react';
import { useState } from 'react';

export interface Data {
  bio: string;
  projects: string;
  clientInfo: string;
  scenes: string[];
  voice: string;
  music: string;
  layout: string;
}

function CreateVideoPage() {
  const [videoTitle, setVideoTitle] = useState<string>('My Pitch');
  const [zoom, ] = useState<string>('75');
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [info, setInfo] = useState("")
  const [data, setData] = useState<Data>({} as Data);
  

  const handleTitleSave = () => {
    setIsEditingTitle(false);
  };

  const handleGenerateVideo = () => {
    // Mock data generation - replace with actual API call
    console.log(info, data)
  }
  
  return (
    <div className='h-[calc(100vh-72px)] overflow-auto'>

      <div className="flex flex-wrap gap-4 justify-between bg-white dark:bg-[#1C1B24] items-center border-b border-gray-500/[0.1]">
        <div className="flex items-center gap-2 ml-2">
          <button className='px-3 py-2 rounded border border-gray-500/[0.07]'> File</button>
          <button className='px-3 py-2 rounded border border-gray-500/[0.07]'> Edit</button>
        </div>
        <div className="">
          {isEditingTitle ? (
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={(e) => e.key === 'Enter' && handleTitleSave()}
              className="w-fit cursor-text font-semibold focus:outline-none"
              autoFocus
            />
          ) : (
            <h2
              onClick={() => setIsEditingTitle(true)}
              className="font-semibold cursor-text transition-colors dark:text-white"
            >
              {videoTitle}
            </h2>
          )}
        </div>
        <div className="flex items-center gap-6">
          <button className='p-3'>{zoom}%</button>
          <button className='flex items-center gap-2 bg-secondary px-6 py-4 text-white'> <ExportIcon /> Export</button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        <LeftSidebar />
        
        <div className="flex-1 flex flex-col gap-2 bg-gray-50 dark:bg-[#24222D] overflow-auto">
          {/* <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              Canvas Area
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Main content will be displayed here
            </p>
          </div> */}


          <div className="flex-1 flex items-center justify-center">
            <div className={`bg-white dark:bg-[#24222D] border border-gray-500/[0.2]`} style={{ width: `${zoom}%`, aspectRatio: data.layout }}>

            </div>
          </div>
          <div className={`w-full bg-white dark:bg-[#24222D] border-t border-gray-500/[0.2] p-4`}>
            <textarea className='leading-[130%] h-[80px] w-full focus:outline-none p-1' value={info} onChange={(e) => setInfo(e.target.value)} placeholder='Describe your team, client information and relevant projects.'/>
            <div className="flex justify-between items-center gap-2">
              <div>
                <label htmlFor="upload" className='px-3 py-2 border border-gray-500/[0.1] rounded-lg'>Upload files</label>
                <Input id="upload" placeholder="Upload" className='hidden' type='file' />
              </div>
              <span></span>
              <Button className='' variant='primary' onClick={handleGenerateVideo}>Generate Video</Button>
            </div>
          </div>
        </div>
        
        <RightSidebar data={data} setData={setData} />
      </div>
    </div>
  )
}

export default CreateVideoPage