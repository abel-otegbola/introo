export const animationTypes = [
  { value: 'fade', label: 'Fade' },
  { value: 'slideLeft', label: 'Slide Left' },
  { value: 'slideRight', label: 'Slide Right' },
  { value: 'slideUp', label: 'Slide Up' },
  { value: 'slideDown', label: 'Slide Down' },
  { value: 'zoomIn', label: 'Zoom In' },
  { value: 'zoomOut', label: 'Zoom Out' },
  { value: 'bounce', label: 'Bounce' },
  { value: 'rotate', label: 'Rotate' },
  { value: 'scaleUp', label: 'Scale Up' },
  { value: 'scaleDown', label: 'Scale Down' },
  { value: 'flip', label: 'Flip' },
  { value: 'swing', label: 'Swing' },
] as const;

export type AnimationType = typeof animationTypes[number]['value'];
