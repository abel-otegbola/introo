'use client';

import { Data } from "@/app/account/create-video/page";
import { CaretDownIcon, ExportIcon, SparkleIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function Topbar({ data, setData, onOpenAIGenerator, onOpenExport }: { data: Data, setData: (data: Data) => void, onOpenAIGenerator?: () => void, onOpenExport?: () => void }) {
  const [openZoomDropdown, setOpenZoomDropdown] = useState(false);

  return (
    <div className="flex flex-wrap gap-4 w-full justify-between bg-white dark:bg-[#1C1B24] items-center border-b border-gray-500/[0.1]">
        <div className="flex items-center gap-2 pl-[6px] min-w-[180px] text-[13px]">
          {onOpenAIGenerator && (
            <button 
              onClick={onOpenAIGenerator}
              className='px-3 py-2 rounded border border-secondary bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors flex items-center gap-2'
            >
              <SparkleIcon size={16} weight="fill" />
              AI Generate
            </button>
          )}
        </div>
        <div className="">
          <input
            type="text"
            value={data.title || "Untitled Video"}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-fit cursor-text font-semibold focus:outline focus:outline-secondary/[0.2] outline-offset-2 border border-gray-500/[0.1] rounded-lg p-2"
            autoFocus
          />
        </div>
        <div className="relative flex items-center gap-6">
          <button className='p-3' onClick={() => setOpenZoomDropdown(!openZoomDropdown)}>
            {data.zoom || 75}% 
            <CaretDownIcon size={12} className={`inline-block ml-1 duration-300 ${openZoomDropdown ? 'rotate-180' : ''}`} />
          </button>
          {
            openZoomDropdown && (
              <div className="absolute top-full right-2 mt-2 z-[20] w-40 bg-white dark:bg-[#1C1B24] border border-gray-500/[0.1] rounded shadow-lg">
                <ul>
                  {
                    [25, 50, 75, 100].map((z) => (
                      <li key={z} className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-[#2C2B34] cursor-pointer" onClick={() => {setData({ ...data, zoom: z.toString() }); setOpenZoomDropdown(false)}}>{z}%</li>
                    ))
                  }
                </ul>
              </div>
            )
          }
          <button 
            onClick={onOpenExport}
            className='flex items-center gap-2 bg-secondary px-6 py-4 text-white hover:bg-secondary/90 transition-colors'
          > 
            <ExportIcon /> Export
          </button>
        </div>
      </div>
  );
}
