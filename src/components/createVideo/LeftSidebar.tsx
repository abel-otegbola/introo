'use client';

import { Data } from '@/app/account/create-video/page';
import { CaretDownIcon } from '@phosphor-icons/react';
import { useState } from 'react';

interface Step {
  id: string;
  title: string;
  subItems: string[];
  icon: string;
}

const steps: Step[] = [
  {
    id: 'story',
    title: 'Story',
    subItems: [
      'Your Bio',
      'Your Projects',
      'Client Information',
    ],
    icon: '📝'
  },
  {
    id: 'scenes',
    title: 'Scenes',
    subItems: [
      'Generated Scenes'
    ],
    icon: '🎬'
  },
  {
    id: 'voice',
    title: 'Voice',
    subItems: [
      'Voice Generation',
      'Background Music'
    ],
    icon: '🎙️'
  }
];

export default function LeftSidebar({ active, setActive }: { data?: Data, setData?: (data: Data) => void, active: string, setActive: (active: string) => void }) {
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set(['story']));

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

  return (
    <div className="w-64 h-full bg-white dark:bg-[#1C1B24] border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-3 my-6">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 px-2">
            Steps
          </h3>
          
          <div className="space-y-1 text-[13px]">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                <button
                  onClick={() => {
                    setActive(step.id);
                    toggleStep(step.id);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 group ${
                    active === step.id
                      ? 'bg-gray-500/[0.05] text-gray-500 dark:bg-gray-500/20'
                      : 'hover:bg-gray-500/[0.05] dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full font-medium bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
                        {index + 1}
                      </span>
                      <span className="font-medium">{step.title}</span>
                    </div>
                  </div>
                  
                  {/* Expand/Collapse Icon */}
                  <CaretDownIcon
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedSteps.has(step.id) ? 'rotate-180' : ''
                    }`}
                    />
                </button>

                {/* Sub-items */}
                {expandedSteps.has(step.id) && (
                  <div className="ml-8 mt-1 space-y-0.5 pb-2">
                    {step.subItems.map((subItem, subIndex) => (
                      <div
                        key={subIndex}
                        className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded cursor-pointer transition-colors"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600"></div>
                        <span>{subItem}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer - Progress Indicator */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
          <span>Progress</span>
          <span>1/{steps.length}</span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-secondary to-[#D437ED] transition-all duration-300"
            style={{ width: `${(1 / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
