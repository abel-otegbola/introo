'use client';

import { Data } from "@/app/account/create-video/page";
import Dropdown from "../dropdown/dropdown";

export default function RightSidebar({ data, setData }: { data: Data, setData: (data: Data) => void }) {

  return (
    <div className="w-72 h-full bg-white dark:bg-[#1C1B24] border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-3 my-6">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 px-2">
            Layout
          </h3>

          <Dropdown value={data.layout} onChange={(value) => setData({ ...data, layout: value })} options={[
            { id: "16/9", title: "16:9" },
            { id: "1/1", title: "Square" },
            { id: "9/16", title: "vertical" },
          ]} />
          
        </div>
      </div>
    </div>
  );
}
