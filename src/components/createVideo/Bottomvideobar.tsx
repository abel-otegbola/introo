'use client';

import { Data } from "@/app/account/create-video/page";
import { ArrowCounterClockwiseIcon, PauseIcon, PlayIcon, ScissorsIcon } from "@phosphor-icons/react";
import { useTimelineDrag } from "@/customHooks/useTimelineDrag";
import { PlayerRef } from "@remotion/player";
import { useState, useRef, RefObject } from "react";
import { calculatePlayheadPosition, seekToFrame, togglePlayPause, restartPlayer, getPlayheadPositionPercentage } from "@/helpers/playerControls";
import { cutElementAtPosition } from "@/helpers/elementHelpers";

export default function Bottomvideobar({ data, setData, selectedElementId, setSelectedElementId, currentFrame, playerRef }: { data: Data, setData?: (data: Data) => void, handleGenerateAudio?: () => void, selectedElementId: number | null, setSelectedElementId: (id: number | null) => void, currentFrame: number, playerRef: RefObject<PlayerRef | null> }) {
  const { timelineRef, handleMouseDown, handleMouseMove, handleMouseUp } = useTimelineDrag(data, setData);
  const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCutMode, setIsCutMode] = useState(false);
  const playheadTimelineRef = useRef<HTMLDivElement>(null);
  const idCounterRef = useRef(1000000);

  const handlePlayheadMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingPlayhead(true);
  };

  const handlePlayheadMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingPlayhead) return;
    const newFrame = calculatePlayheadPosition(e, playheadTimelineRef, data.duration);
    if (newFrame !== null) {
      seekToFrame(playerRef, newFrame);
    }
  };

  const handlePlayheadMouseUp = () => {
    setIsDraggingPlayhead(false);
  };

  const handleTimelineClick = (e: React.MouseEvent) => {
    const newFrame = calculatePlayheadPosition(e, playheadTimelineRef, data.duration);
    if (newFrame !== null) {
      seekToFrame(playerRef, newFrame);
    }
  };

  const handlePlayPause = () => {
    togglePlayPause(playerRef, isPlaying, setIsPlaying);
  };

  const handleRestart = () => {
    restartPlayer(playerRef, setIsPlaying);
  };

  const handleCutElement = (e: React.MouseEvent, element: typeof data.elements[0]) => {
    if (!isCutMode || !setData || !timelineRef.current) return;
    
    e.stopPropagation();
    
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const clickTime = percentage * data.duration;
    
    const result = cutElementAtPosition(data, element, clickTime, idCounterRef);
    if (result) {
      setData(result);
      setIsCutMode(false);
    }
  };

  const playheadPosition = getPlayheadPositionPercentage(currentFrame, data.duration);
  const currentTimeInSeconds = currentFrame / 30;
  const divider = data.duration / 5;
  const timelineSegments = 5;

  return (
    <div className="relative flex flex-col w-full bg-white dark:bg-[#1C1B24] h-[140px] border-t border-gray-500/[0.2]" onMouseMove={isDraggingPlayhead ? handlePlayheadMouseMove : handleMouseMove} onMouseUp={isDraggingPlayhead ? handlePlayheadMouseUp : handleMouseUp} onMouseLeave={() => { handleMouseUp(); handlePlayheadMouseUp(); }}>

      <div className="flex items-start text-[14px] overflow-y-auto z-[1]">
          <div className="w-64 h-[26px] border-r border-gray-500/[0.1] sticky top-0 flex justify-center bg-white dark:bg-[#1C1B24]">
            <button 
              className={`p-1 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors ${isCutMode ? 'bg-secondary/20 text-secondary' : ''}`}
              onClick={() => setIsCutMode(!isCutMode)}
              title="Cut mode - Click on an element to split it"
            >
              <ScissorsIcon />
            </button>
            <button className="p-1 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors" onClick={handlePlayPause}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button className="p-1 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors" onClick={handleRestart}>
              <ArrowCounterClockwiseIcon />
            </button>
          </div>
          <div ref={playheadTimelineRef} className="flex flex-1 text-[12px] justify-between items-center p-1 border-y border-gray-500/[0.1] cursor-pointer" onClick={handleTimelineClick}>
            <span className="w-[20%]">0</span>
            {Array.from({ length: timelineSegments }, (_, i) => (
              <div key={i} className="w-full flex justify-between h-4 rounded">
                <span className="w-[20%]">-</span>
                <span className="w-[20%]">-</span>
                <span className="w-[20%]">-</span>
                <span className="w-[20%]">-</span>
                <span className="w-[20%]">{Number(((i + 1) * divider).toFixed(2))}</span>
              </div>
            ))}
          </div>
      </div>

      <div className="relative flex-1 flex max-h-[132px] overflow-y-auto">        
        <div className="w-64 border-r border-gray-500/[0.1]">
          {
            data.elements.map(element => (
              <div key={element.id} className="flex gap-2 p-2 px-4 rounded text-[13px]" style={{ backgroundColor: selectedElementId === element.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent' }} onClick={() => setSelectedElementId(element.id)}>
                <span className="truncate">{element.title}</span>
                <span className="text-[10px] text-gray-300">({element.animation}s)</span>
              </div>
            ))
          }
        </div>

        <div className="flex flex-col flex-1 gap-3 py-1" ref={timelineRef}>
          <div className="flex flex-col gap-3 w-full h-full">
            {
              data.elements.map(element => (
                <div 
                  key={element.id} 
                  className={`relative h-2 py-[10px] rounded-lg ${isCutMode ? 'bg-red-500/[0.3] hover:bg-red-500/[0.5] cursor-crosshair' : 'bg-blue-500/[0.3] hover:bg-blue-500/[0.5] cursor-move'} border border-blue-500/[0.5] group`}
                  style={{ 
                    width: `${((+element.duration)/data.duration) * 100}%`, 
                    left: `${((element.start || 0)/data.duration) * 100}%` ,
                    borderColor: selectedElementId === element.id ? 'rgba(59, 131, 246, 0.33)' : 'transparent'
                  }}
                  onMouseDown={(e) => {
                    if (isCutMode) {
                      handleCutElement(e, element);
                    } else {
                      handleMouseDown(e, element.id, 'move');
                    }
                  }}
                  onClick={() => {
                    if (!isCutMode) {
                      setSelectedElementId(element.id);
                    }
                  }}
                >
                  {/* Left resize handle - disabled in cut mode */}
                  {!isCutMode && (
                    <div
                      className="absolute left-0 top-0 h-full w-2 cursor-ew-resize bg-blue-600/[0.8] opacity-0 group-hover:opacity-100"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        handleMouseDown(e, element.id, 'resize-left');
                      }}
                    />
                  )}
                  {/* Right resize handle - disabled in cut mode */}
                  {!isCutMode && (
                    <div
                      className="absolute right-0 top-0 h-full w-2 cursor-ew-resize bg-blue-600/[0.8] opacity-0 group-hover:opacity-100"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        handleMouseDown(e, element.id, 'resize-right');
                      }}
                    />
                  )}
                  {/* Cut mode indicator */}
                  {isCutMode && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <ScissorsIcon className="w-3 h-3 text-red-600 opacity-50" />
                    </div>
                  )}
                </div>
              ))
            }
          </div>
        </div>
      </div>
      
      {/* Video playhead indicator */}
      <div
        className="absolute flex flex-col items-center justify-center -top-5 h-[115%] z-[20] transition-all cursor-ew-resize" 
        style={{ left: `calc(250px + ${playheadPosition/1.32}%)` }}
        onMouseDown={handlePlayheadMouseDown}
      >
        <div className="h-5 w-5 text-[10px] text-white font-semibold rounded-full bg-secondary shadow-lg flex items-center justify-center">
          {Math.floor(currentTimeInSeconds)}
        </div>
        <div className="flex-1 h-full w-[2px] rounded bg-secondary shadow-lg p-[0.5px] pointer-events-none"></div>
      </div>
      
    </div>
  );
}
