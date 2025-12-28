'use client';

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
      'User Bio',
      'Projects',
      'Client Information',
      'Images Upload',
      'AI Image Generation'
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
      'ElevenLabs Script',
      'Voice Generation',
      'Background Music'
    ],
    icon: '🎙️'
  }
];

export default function LeftSidebar() {
  const [activeStep, setActiveStep] = useState<string>('story');
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set(['story']));
  const [videoTitle, setVideoTitle] = useState<string>('Untitled Video');
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);

  const toggleStep = (stepId: string) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepId)) {
      newExpanded.delete(stepId);
    } else {
      newExpanded.add(stepId);
    }
    setExpandedSteps(newExpanded);
  };

  const handleTitleSave = () => {
    setIsEditingTitle(false);
  };

  return (
    <div className="w-72 h-screen bg-white dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-gray-800 flex flex-col">
      {/* Header - Video Title */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        {isEditingTitle ? (
          <input
            type="text"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={(e) => e.key === 'Enter' && handleTitleSave()}
            className="w-full px-2 py-1 text-lg font-semibold bg-transparent border-b-2 border-secondary focus:outline-none dark:text-white"
            autoFocus
          />
        ) : (
          <h2
            onClick={() => setIsEditingTitle(true)}
            className="text-lg font-semibold cursor-pointer hover:text-secondary transition-colors dark:text-white"
          >
            {videoTitle}
          </h2>
        )}
        <p className="text-xs text-gray-500 mt-1">Click to edit title</p>
      </div>

      {/* Steps Section */}
      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-3">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 px-2">
            Steps
          </h3>
          
          <div className="space-y-1">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Step Header */}
                <button
                  onClick={() => {
                    setActiveStep(step.id);
                    toggleStep(step.id);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    activeStep === step.id
                      ? 'bg-secondary/10 text-secondary dark:bg-secondary/20'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{step.icon}</span>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
                        {index + 1}
                      </span>
                      <span className="font-medium text-sm">{step.title}</span>
                    </div>
                  </div>
                  
                  {/* Expand/Collapse Icon */}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedSteps.has(step.id) ? 'rotate-90' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Sub-items */}
                {expandedSteps.has(step.id) && (
                  <div className="ml-8 mt-1 space-y-0.5 pb-2">
                    {step.subItems.map((subItem, subIndex) => (
                      <div
                        key={subIndex}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded cursor-pointer transition-colors"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600"></div>
                        <span>{subItem}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-7 top-12 w-0.5 h-4 bg-gray-200 dark:bg-gray-700"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer - Progress Indicator */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
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
