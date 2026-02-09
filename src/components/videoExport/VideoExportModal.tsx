'use client';

import { useState } from 'react';
import { XIcon, DownloadIcon, VideoIcon } from '@phosphor-icons/react';
import Button from '../button/Button';
import Dropdown from '../dropdown/dropdown';

interface VideoExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (settings: ExportSettings) => void;
  isExporting: boolean;
}

export interface ExportSettings {
  format: 'mp4' | 'webm' | 'gif';
  quality: 'low' | 'medium' | 'high' | 'ultra';
  fps: 30 | 60;
  width: number;
  height: number;
}

export default function VideoExportModal({ isOpen, onClose, onExport, isExporting }: VideoExportModalProps) {
  const [settings, setSettings] = useState<ExportSettings>({
    format: 'mp4',
    quality: 'high',
    fps: 30,
    width: 1920,
    height: 1080,
  });

  const qualityOptions = [
    { id: 'low', title: 'Low (Fast)' },
    { id: 'medium', title: 'Medium' },
    { id: 'high', title: 'High' },
    { id: 'ultra', title: 'Ultra (Slow)' },
  ];

  const formatOptions = [
    { id: 'mp4', title: 'MP4 (Recommended)' },
    { id: 'webm', title: 'WebM' },
    { id: 'gif', title: 'GIF' },
  ];

  const fpsOptions = [
    { id: '30', title: '30 FPS' },
    { id: '60', title: '60 FPS' },
  ];

  const resolutionOptions = [
    { id: '1920x1080', title: '1080p (1920x1080)' },
    { id: '1280x720', title: '720p (1280x720)' },
    { id: '3840x2160', title: '4K (3840x2160)' },
    { id: '720x1280', title: 'Portrait (720x1280)' },
    { id: '1080x1920', title: 'Portrait HD (1080x1920)' },
  ];

  const handleResolutionChange = (value: string) => {
    const [width, height] = value.split('x').map(Number);
    setSettings({ ...settings, width, height });
  };

  const handleExport = () => {
    onExport(settings);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#1C1B24] rounded-lg shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <VideoIcon size={24} className="text-secondary" weight="fill" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Export Video</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Configure export settings</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            disabled={isExporting}
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Resolution</label>
            <Dropdown
              size="sm"
              value={`${settings.width}x${settings.height}`}
              onChange={handleResolutionChange}
              options={resolutionOptions}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Format</label>
            <Dropdown
              size="sm"
              value={settings.format}
              onChange={(value) => setSettings({ ...settings, format: value as 'mp4' | 'webm' | 'gif' })}
              options={formatOptions}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Quality</label>
            <Dropdown
              size="sm"
              value={settings.quality}
              onChange={(value) => setSettings({ ...settings, quality: value as 'low' | 'medium' | 'high' | 'ultra' })}
              options={qualityOptions}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Frame Rate</label>
            <Dropdown
              size="sm"
              value={settings.fps.toString()}
              onChange={(value) => setSettings({ ...settings, fps: parseInt(value) as 30 | 60 })}
              options={fpsOptions}
            />
          </div>

          {isExporting && (
            <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <svg className="animate-spin h-5 w-5 text-secondary" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <div>
                  <p className="text-sm font-medium">Generating video...</p>
                  <p className="text-xs text-gray-500">This may take a few minutes</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800">
          <Button variant="secondary" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Exporting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <DownloadIcon size={16} />
                Export Video
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
