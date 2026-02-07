'use client';

import { Data } from "@/app/account/create-video/page";
import Button from "../button/Button";

export default function BottomScenesbar({ data, handleGenerateAudio }: { data: Data, setData?: (data: Data) => void, handleGenerateAudio: () => void }) {

  return (
    <div className="w-full bg-white dark:bg-[#1C1B24] border-t border-gray-500/[0.2]">
      <div className="flex text-[12px] justify-between items-center mb-2 p-1 border-y border-gray-500/[0.1]">
        {Array.from({ length: data.duration / 10 }, (_, i) => (
          <div key={i} className="w-full flex justify-between h-4 rounded">
            <span className="w-[20%]">{i * 10}</span>
            <span className="w-[20%]">-</span>
            <span className="w-[20%]">-</span>
            <span className="w-[20%]">-</span>
            <span className="w-[20%]">-</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center gap-2 p-2">
        <span></span>
        <Button className='' variant='primary' onClick={handleGenerateAudio}>Generate Audio</Button>
      </div>
    </div>
  );
}
