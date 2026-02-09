'use client';

import { Data } from '@/app/account/create-video/page';
import { ImageIcon, TextTIcon, TrashIcon, VideoIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import Input from '../input/input';
import { createImageVideoElement, createTextElement, deleteElement } from '@/helpers/elementHelpers';

interface Step {
  id: string;
  title: string;
}

const steps: Step[] = [
  {
    id: 'video',
    title: 'Video',
  },
  {
    id: 'voice',
    title: 'Voice',
  }
];

export default function LeftSidebar({ active, setActive, data, setData, selectedElementId, setSelectedElementId }: { data: Data, setData: (data: Data) => void, active: string, setActive: (active: string) => void, selectedElementId: number | null, setSelectedElementId: (id: number | null) => void }) {
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set(['video']));

  const toggleStep = (stepId: string) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepId)) {
      newExpanded.delete(stepId);
    } else {
      newExpanded.add(stepId);
    }
    setExpandedSteps(newExpanded);
    setActive(stepId);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const newElement = createImageVideoElement(file);
    
    if (!newElement) {
      alert('Please upload only images or videos');
      return;
    }

    setData({ 
      ...data, 
      elements: [...data.elements, newElement] 
    });

    e.target.value = '';
  };

  const handleAddText = () => {
    const existingTextCount = data.elements.filter(el => el.type === 'text').length;
    const newTextElement = createTextElement(existingTextCount);

    setData({
      ...data,
      elements: [...data.elements, newTextElement],
    });

    setSelectedElementId(newTextElement.id);
  };

  const handleDeleteElement = (elementId: number) => {
    setData(deleteElement(data, elementId));
  };


  return (
    <div className="w-64 h-full bg-white dark:bg-[#1C1B24] border-r border-gray-200 dark:border-gray-800 flex flex-col">
      
      <div className="overflow-y-auto py-1">
        <div className="px-1">
          
          <div className="grid grid-cols-2 gap-1 text-[13px]">
            {steps.map((step) => (
              <div key={step.id} className="relative">
                <button
                  onClick={() => {
                    setActive(step.id);
                    toggleStep(step.id);
                  }}
                  className={`w-full flex items-center justify-center px-2 py-2 rounded transition-all duration-200 group ${
                    active === step.id
                      ? 'bg-gray-500/[0.05] text-gray-500 dark:bg-gray-500/20'
                      : 'hover:bg-gray-500/[0.05] dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  
                  <span className="font-medium">{step.title}</span>                  
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {
        active === "video" && (
          <div className='flex-1 h-full flex flex-col justify-between'>
            <div className='px-2 flex-1'>
              <div className="flex items-center justify-between mb-2 px-2 mt-6">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Elements
                </h3>
              </div>
              
              <div className="space-y-[2px]">
                {data && data.elements.map((element) => (
                  <div 
                    key={element.id} 
                    className={`flex items-center gap-2 text-[12px] p-2 justify-between rounded cursor-pointer transition-colors ${
                      selectedElementId === element.id 
                        ? 'bg-gray-50 dark:bg-secondary/20' 
                        : 'hover:bg-gray-50 dark:hover:bg-secondary/[0.1]'
                    }`}
                    onClick={() => setSelectedElementId(element.id)}
                  >
                    <div className='flex items-center w-[90%] gap-2'>
                      {
                        element.type === 'text' ? <TextTIcon size={16} /> : element.type === 'image' ? <ImageIcon size={16} /> : <VideoIcon size={16} />
                      }
                      <div className="font-medium truncate mt-1 w-[80%]">{element.title}</div>
                    </div>
                    <button onClick={() => handleDeleteElement(element.id)}><TrashIcon className="text-gray-300 text-right hover:text-red-500 cursor-pointer" /></button>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="p-2">
              {/* <textarea className='leading-[130%] h-[80px] w-full focus:outline-none p-1' value={data.info} onChange={(e) => setData({ ...data, info: e.target.value })} placeholder='Describe your team, client information and relevant projects.'/> */}
              <div className="flex items-center gap-2">
                <button className='p-2 border border-gray-500/[0.1] rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-[#24222D]' onClick={handleAddText}><TextTIcon /></button>
                <div className="">
                  <button className='w-8 h-8 p-2 border border-gray-500/[0.1] rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-[#24222D]'>
                    <label htmlFor="upload"><ImageIcon /></label>
                  </button>
                  <Input id="upload" placeholder="Upload" className='hidden' type='file' accept="image/*,video/*" onChange={handleFileUpload} />
                </div>
              </div>
            </div>
          </div>
        )

      }

    </div>
  );
}
