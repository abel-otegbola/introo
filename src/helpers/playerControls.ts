import { PlayerRef } from "@remotion/player";
import { RefObject } from "react";

export const calculatePlayheadPosition = (
  e: React.MouseEvent, 
  timelineRef: RefObject<HTMLDivElement | null>, 
  duration: number
): number | null => {
  if (!timelineRef.current) return null;

  const rect = timelineRef.current.getBoundingClientRect();
  const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
  const percentage = x / rect.width;
  return Math.floor(percentage * duration * 30);
};

export const seekToFrame = (
  playerRef: RefObject<PlayerRef | null>,
  frame: number
) => {
  if (!playerRef?.current) return;
  playerRef.current.seekTo(frame);
};

export const togglePlayPause = (
  playerRef: RefObject<PlayerRef | null>,
  isPlaying: boolean,
  setIsPlaying: (playing: boolean) => void
) => {
  if (!playerRef?.current) return;

  if (isPlaying) {
    playerRef.current.pause();
    setIsPlaying(false);
  } else {
    playerRef.current.play();
    setIsPlaying(true);
  }
};

export const restartPlayer = (
  playerRef: RefObject<PlayerRef | null>,
  setIsPlaying: (playing: boolean) => void
) => {
  if (!playerRef?.current) return;

  playerRef.current.seekTo(0);
  playerRef.current.pause();
  setIsPlaying(false);
};

export const getPlayheadPositionPercentage = (
  currentFrame: number,
  duration: number
): number => {
  const currentTimeInSeconds = currentFrame / 30;
  return (currentTimeInSeconds / duration) * 100;
};
