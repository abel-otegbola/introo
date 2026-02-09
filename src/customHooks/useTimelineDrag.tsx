import { useState, useRef } from 'react';
import { Data } from '@/app/account/create-video/page';

export const useTimelineDrag = (data: Data, setData?: (data: Data) => void) => {
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [dragType, setDragType] = useState<'move' | 'resize-left' | 'resize-right' | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, elementId: number, type: 'move' | 'resize-left' | 'resize-right') => {
    e.preventDefault();
    setDraggingId(elementId);
    setDragType(type);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingId || !setData || !timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const timeAtCursor = percentage * data.duration;

    const updatedElements = data.elements.map(element => {
      if (element.id !== draggingId) return element;

      if (dragType === 'move') {
        // Move the element, keeping duration the same
        const newStart = Math.max(0, Math.min(data.duration - element.duration, timeAtCursor - element.duration / 2));
        return { ...element, start: newStart };
      } else if (dragType === 'resize-right') {
        // Resize from the right edge
        const newDuration = Math.max(0.5, Math.min(data.duration - (element.start || 0), timeAtCursor - (element.start || 0)));
        return { ...element, duration: newDuration };
      } else if (dragType === 'resize-left') {
        // Resize from the left edge
        const currentEnd = (element.start || 0) + element.duration;
        const newStart = Math.max(0, Math.min(currentEnd - 0.5, timeAtCursor));
        const newDuration = currentEnd - newStart;
        return { ...element, start: newStart, duration: newDuration };
      }

      return element;
    });

    setData({ ...data, elements: updatedElements });
  };

  const handleMouseUp = () => {
    setDraggingId(null);
    setDragType(null);
  };

  return {
    timelineRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
