'use client';

import { Data } from "@/app/account/create-video/page";
import Dropdown from "../dropdown/dropdown";
import Input from "../input/input";
import { animationTypes } from "@/constants/animations";
import { useOutsideClick } from "@/customHooks/useOutsideClick";
import { updateElementAnimation, updateElementProperty } from "@/helpers/elementHelpers";
import { TextAlignCenterIcon, TextAlignLeftIcon, TextAlignRightIcon } from "@phosphor-icons/react";
import { Sketch } from '@uiw/react-color';
import { useState } from 'react';

export default function RightSidebar({ data, setData, selectedElementId, setSelectedElementId }: { data: Data, setData: (data: Data) => void, selectedElementId: number | null, setSelectedElementId: (id: number | null) => void }) {
  const selectedElement = data.elements.find(el => el.id === selectedElementId);
  const rightbarRef = useOutsideClick(setSelectedElementId, null);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);

  const handleAnimationChange = (elementId: number, newAnimation: string) => {
    setData(updateElementAnimation(data, elementId, newAnimation));
  };

  const handleElementPropertyChange = (elementId: number, property: string, value: string | number | { x: number; y: number }) => {
    setData(updateElementProperty(data, elementId, property, value));
  };

  return (
    <div ref={rightbarRef} className="w-64 h-full bg-white dark:bg-[#1C1B24] text-[13px] border-l border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-3 my-6">

          {
            selectedElementId === null ?
          <>

            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 px-2 mt-6">
              Project Info
            </h3>
            <div className="p-2 border border-gray-500/[0.1] rounded-[12px] p-2">
              <textarea className='leading-[130%] h-[80px] w-full focus:outline-none p-1' value={data.info} onChange={(e) => setData({ ...data, info: e.target.value })} placeholder='Describe your team, client information and relevant projects.'/>
            </div>

            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 px-2 mt-6">
              Layout
            </h3>

            <Dropdown 
              size="sm"value={data.layout} onChange={(value) => setData({ ...data, layout: value })} options={[
              { id: "0.5625", title: "Video" },
              { id: "1", title: "Square" },
              { id: "1.777789", title: "Vertical" },
            ]} />

            
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 px-2 mt-6">
              Duration (in seconds)
            </h3>

            <Input inputSize={"sm"} value={data.duration} type="number" min={0} max={300} step={5} onChange={(e) => setData({ ...data, duration: (+e.target.value < 1 ? 1 : +e.target.value) })} />

          </>
          : ""
          }

          {/* Elements Section */}
          {data.elements.length > 0 && (
            <>

              {/* Selected Element Properties */}
              {selectedElement && (
                <div className="mt-6">
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                    {selectedElement.title.substring(0, 20)}...
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Animation</label>
                      <Dropdown 
                        size="sm"
                        value={selectedElement.animation} 
                        onChange={(value: string) => handleAnimationChange(selectedElement.id, value)} 
                        options={animationTypes.map(anim => ({ id: anim.value, title: anim.label }))} 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">

                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Duration</label>
                        <div className="flex items-center">
                          <Input 
                            inputSize={"sm"}
                            value={selectedElement.duration} 
                            type="number" 
                            min={0.5} 
                            max={data.duration} 
                            className="rounded-r-none"
                            step={0.5}
                            onChange={(e) => handleElementPropertyChange(selectedElement.id, 'duration', +e.target.value)} 
                          />
                          <span className="w-20 h-[30px] text-[9px] flex items-center justify-center rounded-r-[12px] border border-gray-500/[0.1]">Seconds</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Start Time</label>
                        <div className="flex items-center">
                        <Input 
                          inputSize={"sm"}
                          value={selectedElement.start || 0} 
                          type="number" 
                          min={0} 
                          max={data.duration - selectedElement.duration} 
                          className="rounded-r-none"
                          step={0.5}
                          onChange={(e) => handleElementPropertyChange(selectedElement.id, 'start', +e.target.value)} 
                        />
                        <span className="w-20 h-[30px] text-[9px] flex items-center justify-center rounded-r-[12px] border border-gray-500/[0.1]">Seconds</span>
                        </div>
                      </div>

                    </div>

                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Zoom (%)</label>
                      <Input 
                        inputSize={"sm"}
                        value={selectedElement.zoom} 
                        type="number" 
                        min={10} 
                        max={200} 
                        onChange={(e) => handleElementPropertyChange(selectedElement.id, 'zoom', e.target.value)} 
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Position X</label>
                        <Input 
                          inputSize={"sm"}
                          value={selectedElement.position?.x || 0} 
                          type="number" 
                          onChange={(e) => handleElementPropertyChange(selectedElement.id, 'position', { 
                            x: +e.target.value, 
                            y: selectedElement.position?.y || 0 
                          })} 
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Position Y</label>
                        <Input 
                          inputSize={"sm"}
                          value={selectedElement.position?.y || 0} 
                          type="number" 
                          onChange={(e) => handleElementPropertyChange(selectedElement.id, 'position', { 
                            x: selectedElement.position?.x || 0, 
                            y: +e.target.value 
                          })} 
                        />
                      </div>                      
                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Rotation</label>
                        <Input 
                          inputSize={"sm"}
                          value={selectedElement.rotation || 0} 
                          type="number" 
                          min={-360} 
                          max={360} 
                          onChange={(e) => handleElementPropertyChange(selectedElement.id, 'rotation', +e.target.value)} 
                        />
                    </div>
                    </div>

                    {/* Text-specific properties */}
                    {selectedElement.type === 'text' && (
                      <>
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Text Content</label>
                          <textarea
                            value={selectedElement.text || ''}
                            onChange={(e) => handleElementPropertyChange(selectedElement.id, 'text', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#1C1B24] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary"
                            rows={3}
                          />
                        </div>
                    <div className="grid grid-cols-2 gap-2">

                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Font</label>
                        <div className="flex items-center">
                          <Dropdown 
                            size="sm"
                            value={selectedElement.fontWeight || 'bold'} 
                            onChange={(value: string) => handleElementPropertyChange(selectedElement.id, 'fontWeight', value)} 
                            options={[
                              { id: 'normal', title: 'Normal' },
                              { id: 'bold', title: 'Bold' },
                              { id: '600', title: 'Semi Bold' },
                              { id: '300', title: 'Light' },
                            ]} 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Size</label>
                        <div className="flex items-center">
                        <Input 
                          inputSize={"sm"}
                          value={selectedElement.fontSize || 48} 
                          type="number" 
                          min={8} 
                          max={200} 
                          className="rounded-r-none"
                          onChange={(e) => handleElementPropertyChange(selectedElement.id, 'fontSize', +e.target.value)} 
                        />
                        <span className="w-12 h-[30px] text-[12px] flex items-center justify-center rounded-r-[12px] border border-gray-500/[0.1]">px</span>
                        </div>
                      </div>

                    </div>


                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Font Weight</label>
                          <div className="flex items-center">
                            <Dropdown 
                              size="sm"
                              value={selectedElement.fontWeight || 'bold'} 
                              onChange={(value: string) => handleElementPropertyChange(selectedElement.id, 'fontWeight', value)} 
                              options={[
                                { id: 'normal', title: 'Normal' },
                                { id: 'bold', title: 'Bold' },
                                { id: '600', title: 'Semi Bold' },
                                { id: '300', title: 'Light' },
                              ]} 
                            />
                          </div>
                        </div>
                         <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Text Align</label>
                          <div className="grid grid-cols-3 items-center pt-[2px]">
                            <button className="flex items-center justify-center p-[6px] rounded-l-[12px] border border-gray-500/[0.1]" style={{ backgroundColor: selectedElement.textAlign === "left" ? "rgba(130, 99, 244, 0.2)" : "transparent" }} onClick={() => handleElementPropertyChange(selectedElement.id, 'textAlign', "left")}><TextAlignLeftIcon /></button>
                            <button className="flex items-center justify-center p-[6px] border border-gray-500/[0.1]" style={{ backgroundColor: selectedElement.textAlign === "center" ? "rgba(130, 99, 244, 0.2)" : "transparent" }} onClick={() => handleElementPropertyChange(selectedElement.id, 'textAlign', "center")}><TextAlignCenterIcon /></button>
                            <button className="flex items-center justify-center p-[6px] rounded-r-[12px] border border-gray-500/[0.1]" style={{ backgroundColor: selectedElement.textAlign === "right" ? "rgba(130, 99, 244, 0.2)" : "transparent" }} onClick={() => handleElementPropertyChange(selectedElement.id, 'textAlign', "right")}><TextAlignRightIcon /></button>
                          </div>
                        </div>
                      </div>

                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Text Color</label>
                          <div className="relative">
                            <button
                              onClick={() => setShowTextColorPicker(!showTextColorPicker)}
                              className="w-full h-8 rounded border border-gray-300 dark:border-gray-600 flex items-center gap-2 px-1"
                            >
                              <div 
                                className="w-6 h-6 rounded border border-gray-300"
                                style={{ backgroundColor: selectedElement.color || '#000000' }}
                              />
                              <span className="text-xs">{selectedElement.color || '#000000'}</span>
                            </button>
                            {showTextColorPicker && (
                              <div className="absolute z-50 bottom-full mt-2">
                                <div className="fixed inset-0" onClick={() => setShowTextColorPicker(false)} />
                                <Sketch
                                  color={selectedElement.color || '#000000'}
                                  onChange={(color) => handleElementPropertyChange(selectedElement.id, 'color', color.hex)}
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Background Color</label>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <button
                                onClick={() => setShowBgColorPicker(!showBgColorPicker)}
                                className="w-full h-8 rounded border border-gray-300 dark:border-gray-600 flex items-center gap-2 px-1"
                              >
                                <div 
                                  className="w-6 h-6 rounded border border-gray-300"
                                  style={{ backgroundColor: selectedElement.backgroundColor === 'transparent' ? '#ffffff' : selectedElement.backgroundColor || '#ffffff' }}
                                />
                                <span className="text-xs truncate">{selectedElement.backgroundColor || '#ffffff'}</span>
                              </button>
                              {showBgColorPicker && (
                                <div className="absolute z-50 bottom-full mt-2">
                                  <div className="fixed inset-0" onClick={() => setShowBgColorPicker(false)} />
                                  <Sketch
                                    color={selectedElement.backgroundColor === 'transparent' ? '#ffffff' : selectedElement.backgroundColor || '#ffffff'}
                                    onChange={(color) => handleElementPropertyChange(selectedElement.id, 'backgroundColor', color.hex)}
                                  />
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => handleElementPropertyChange(selectedElement.id, 'backgroundColor', 'transparent')}
                              className={`px-3 text-[10px] rounded border whitespace-nowrap ${
                                selectedElement.backgroundColor === 'transparent' 
                                  ? 'bg-secondary text-white border-secondary' 
                                  : 'border-gray-300 dark:border-gray-600'
                              }`}
                            >
                              None
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
          
        </div>
      </div>
    </div>
  );
}
