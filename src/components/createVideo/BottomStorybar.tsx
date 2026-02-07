'use client';

import { Data } from "@/app/account/create-video/page";
import Input from "../input/input";
import Button from "../button/Button";

export default function BottomStorybar({ data, setData, handleGenerateVideo }: { data: Data, setData: (data: Data) => void, handleGenerateVideo: () => void }) {

  return (
    <div className="w-full bg-white dark:bg-[#1C1B24] border-t border-gray-500/[0.2] p-4">
      <textarea className='leading-[130%] h-[80px] w-full focus:outline-none p-1' value={data.info} onChange={(e) => setData({ ...data, info: e.target.value })} placeholder='Describe your team, client information and relevant projects.'/>
      <div className="flex justify-between items-center gap-2 p-2">
        <div>
          <label htmlFor="upload" className='px-3 py-2 border border-gray-500/[0.1] rounded-lg'>Upload files</label>
          <Input id="upload" placeholder="Upload" className='hidden' type='file' />
        </div>
        <span></span>
        <Button className='' variant='primary' onClick={handleGenerateVideo}>Generate Video</Button>
      </div>
    </div>
  );
}
