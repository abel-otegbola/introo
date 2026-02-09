import { Data } from "@/app/account/create-video/page";

export const createImageVideoElement = (file: File) => {
  const fileType = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : null;
  
  if (!fileType) {
    return null;
  }

  return {
    id: Date.now(),
    title: file.name,
    file: URL.createObjectURL(file),
    type: fileType,
    duration: 5,
    animation: 'fade',
    transition: 'slide',
    delay: 0,
    zoom: '100',
    start: 0,
    position: {
      x: 0,
      y: 0
    }
  };
};

export const createTextElement = (existingTextCount: number) => {
  return {
    id: Date.now(),
    title: 'Text ' + (existingTextCount + 1),
    file: null,
    type: 'text',
    duration: 5,
    animation: 'fade',
    transition: 'slide',
    delay: 0,
    zoom: '100',
    start: 0,
    position: {
      x: 50,
      y: 50,
    },
    text: 'Your Text Here',
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000000',
    backgroundColor: 'transparent',
    textAlign: 'center',
  };
};

export const deleteElement = (data: Data, elementId: number): Data => {
  return {
    ...data,
    elements: data.elements.filter(element => element.id !== elementId)
  };
};

export const updateElementProperty = (
  data: Data,
  elementId: number,
  property: string,
  value: string | number
): Data => {
  return {
    ...data,
    elements: data.elements.map(el => 
      el.id === elementId ? { ...el, [property]: value } : el
    )
  };
};

export const updateElementAnimation = (
  data: Data,
  elementId: number,
  animation: string
): Data => {
  return updateElementProperty(data, elementId, 'animation', animation);
};

export const cutElementAtPosition = (
  data: Data,
  element: typeof data.elements[0],
  clickTime: number,
  idCounter: { current: number }
): Data | null => {
  const elementStart = element.start || 0;
  const elementEnd = elementStart + element.duration;
  
  if (clickTime <= elementStart || clickTime >= elementEnd) return null;
  
  const cutPosition = clickTime - elementStart;
  
  idCounter.current += 1;
  const firstId = idCounter.current;
  idCounter.current += 1;
  const secondId = idCounter.current;
  
  const firstPart = {
    ...element,
    id: firstId,
    title: element.title + ' (1)',
    duration: cutPosition,
  };
  
  const secondPart = {
    ...element,
    id: secondId,
    title: element.title + ' (2)',
    duration: element.duration - cutPosition,
    start: elementStart + cutPosition,
  };
  
  return {
    ...data,
    elements: data.elements
      .map(el => el.id === element.id ? null : el)
      .filter(el => el !== null)
      .concat([firstPart, secondPart]) as typeof data.elements
  };
};
