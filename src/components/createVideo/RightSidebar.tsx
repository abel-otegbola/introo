'use client';

import { Data } from "@/app/account/create-video/page";
import Dropdown from "../dropdown/dropdown";
import Input from "../input/input";

export default function RightSidebar({ data, setData }: { data: Data, setData: (data: Data) => void }) {

  return (
    <div className="w-64 h-full bg-white dark:bg-[#1C1B24] text-[13px] border-l border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-3 my-6">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 px-2">
            Layout
          </h3>

          <Dropdown value={data.layout} onChange={(value) => setData({ ...data, layout: value })} options={[
            { id: "0.5625", title: "Video" },
            { id: "1", title: "Square" },
            { id: "1.777789", title: "Vertical" },
          ]} />

          
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 px-2 mt-6">
            Duration (in seconds)
          </h3>

          <Input value={data.duration} type="number" min={0} max={300} onChange={(e) => setData({ ...data, duration: +e.target.value })} />
          
        </div>
      </div>
    </div>
  );
}
