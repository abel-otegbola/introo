'use client';

import { useState } from 'react';
import { XIcon, SparkleIcon } from '@phosphor-icons/react';
import Button from '../button/Button';
import Input from '../input/input';

interface AIGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (projectInfo: ProjectInfo) => void;
  isGenerating: boolean;
}

export interface ProjectInfo {
  projectName: string;
  projectDescription: string;
  bio: string;
  clientInfo: string;
  keyMetrics?: {
    label: string;
    value: number;
  }[];
  additionalInfo?: string;
}

export default function AIGeneratorModal({ isOpen, onClose, onGenerate, isGenerating }: AIGeneratorModalProps) {
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    projectName: '',
    projectDescription: '',
    bio: '',
    clientInfo: '',
    additionalInfo: '',
  });

  const [metrics, setMetrics] = useState([{ label: '', value: 0 }]);

  const handleAddMetric = () => {
    setMetrics([...metrics, { label: '', value: 0 }]);
  };

  const handleRemoveMetric = (index: number) => {
    setMetrics(metrics.filter((_, i) => i !== index));
  };

  const handleMetricChange = (index: number, field: 'label' | 'value', value: string | number) => {
    const newMetrics = [...metrics];
    newMetrics[index] = { ...newMetrics[index], [field]: value };
    setMetrics(newMetrics);
  };

  const handleGenerate = () => {
    const validMetrics = metrics.filter(m => m.label && m.value > 0);
    onGenerate({
      ...projectInfo,
      keyMetrics: validMetrics.length > 0 ? validMetrics : undefined,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#1C1B24] rounded-lg shadow-2xl w-full max-w-xl h-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <SparkleIcon size={24} className="text-secondary" weight="fill" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">AI Video Generator</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Let AI create your presentation video</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Project Name *</label>
            <Input
              inputSize="sm"
              value={projectInfo.projectName}
              onChange={(e) => setProjectInfo({ ...projectInfo, projectName: e.target.value })}
              placeholder="e.g., E-Commerce Platform Redesign"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Project Description *</label>
            <textarea
              value={projectInfo.projectDescription}
              onChange={(e) => setProjectInfo({ ...projectInfo, projectDescription: e.target.value })}
              placeholder="Describe your project, solution, features, and benefits..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#24222D] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary min-h-[120px]"
              rows={5}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your Bio/About *</label>
            <textarea
              value={projectInfo.bio}
              onChange={(e) => setProjectInfo({ ...projectInfo, bio: e.target.value })}
              placeholder="Introduce yourself or your team..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#24222D] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Client Information *</label>
            <textarea
              value={projectInfo.clientInfo}
              onChange={(e) => setProjectInfo({ ...projectInfo, clientInfo: e.target.value })}
              placeholder="Client name, industry, testimonial, or case study details..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#24222D] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary"
              rows={3}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Key Metrics (Optional)</label>
              <button
                onClick={handleAddMetric}
                className="text-sm text-secondary hover:underline"
              >
                + Add Metric
              </button>
            </div>
            <div className="space-y-2">
              {metrics.map((metric, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    inputSize="sm"
                    value={metric.label}
                    onChange={(e) => handleMetricChange(index, 'label', e.target.value)}
                    placeholder="e.g., Revenue Growth"
                    className="flex-1"
                  />
                  <Input
                    inputSize="sm"
                    type="number"
                    value={metric.value}
                    onChange={(e) => handleMetricChange(index, 'value', +e.target.value)}
                    placeholder="Value"
                    className="w-32"
                  />
                  {metrics.length > 1 && (
                    <button
                      onClick={() => handleRemoveMetric(index)}
                      className="px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                    >
                      <XIcon size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Additional Information (Optional)</label>
            <textarea
              value={projectInfo.additionalInfo}
              onChange={(e) => setProjectInfo({ ...projectInfo, additionalInfo: e.target.value })}
              placeholder="Any other details you'd like to include..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#24222D] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary"
              rows={3}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800">
          <Button variant="secondary" onClick={onClose} disabled={isGenerating}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleGenerate}
            disabled={!projectInfo.projectName || !projectInfo.projectDescription || !projectInfo.bio || !projectInfo.clientInfo || isGenerating}
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <SparkleIcon size={16} weight="fill" />
                Generate Images
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
