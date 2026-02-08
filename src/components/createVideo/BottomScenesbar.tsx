'use client';

import { Data } from "@/app/account/create-video/page";
import { ArrowCounterClockwiseIcon, PlayIcon, StopIcon } from "@phosphor-icons/react";

export default function BottomScenesbar({ data }: { data: Data, setData?: (data: Data) => void, handleGenerateAudio?: () => void }) {
  const elements = [
              { id: 1, title: "logo", duration: 10, animation: "fade-in", transition: "ease-in-out", delay: 0, zoom: "100" },
              { id: 2, title: "project description", duration: 5, animation: "slide-up", transition: "ease-in-out", delay: 0, zoom: "100" },
              { id: 3, title: "project description", duration: 3, animation: "slide-up", transition: "ease-in-out", delay: 0, zoom: "100" },
              { id: 4, title: "project description", duration: 10, animation: "slide-up", transition: "ease-in-out", delay: 0, zoom: "100" },
              { id: 5, title: "project description", duration: 2, animation: "slide-up", transition: "ease-in-out", delay: 0, zoom: "100" },
              { id: 6, title: "project description", duration: 1, animation: "slide-up", transition: "ease-in-out", delay: 0, zoom: "100" },
              { id: 7, title: "project description", duration: 9, animation: "slide-up", transition: "ease-in-out", delay: 0, zoom: "100" },
            ]
  return (
    <div className="flex w-full bg-white dark:bg-[#1C1B24] border-t border-gray-500/[0.2]">

      <div className="w-64 flex-col gap-1 text-[14px] gap-2 pb-2 min-h-[120px] max-h-[140px] h-full overflow-y-auto pt-0 border-r border-gray-500/[0.2]">
          <div className="h-[26px] border-b border-gray-500/[0.1] sticky top-0 w-full flex justify-center bg-white dark:bg-[#1C1B24]">
            <button className="p-1 px-4"><StopIcon /></button>
            <button className="p-1 px-4"><PlayIcon /></button>
            <button className="p-1 px-4"><ArrowCounterClockwiseIcon /></button>
          </div>
          {
            elements.map(element => (
              <div key={element.id} className="flex gap-2 p-2 px-4 rounded">
                <span>{element.title}</span>
                <span className="text-[10px] text-gray-300">({element.animation}s)</span>
              </div>
            ))
          }
      </div>

      <div className="relative flex-1">
        <div className="absolute flex flex-col items-center justify-center -top-5 left-0 h-[110%]">
          <button className="h-5 w-5 text-[10px] text-white font-semibold rounded-full bg-secondary shadow-lg flex items-center justify-center cursor-pointer">
            {data.duration}
          </button>
          <button className="flex-1 h-full w-[2px] rounded bg-secondary shadow-lg p-[0.5px] cursor-pointer"></button>
        </div>
        <div className="flex text-[12px] justify-between items-center mb-2 p-1 border-y border-gray-500/[0.1]">
          <span className="w-[20%]">0</span>
          {Array.from({ length: data.duration / 10 }, (_, i) => (
            <div key={i} className="w-full flex justify-between h-4 rounded">
              <span className="w-[20%]">-</span>
              <span className="w-[20%]">-</span>
              <span className="w-[20%]">-</span>
              <span className="w-[20%]">-</span>
              <span className="w-[20%]">{(i + 1) * 10}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 h-[120px] overflow-y-auto">
          {
            elements.map(element => (
              <div key={element.id} className="h-8 py-[10px] rounded-lg bg-gray-500/[0.1]" style={{ width: `${((+element.duration)/data.duration) * 100}%` }}></div>
            ))
          }
        </div>
      </div>
      
    </div>
  );
}
