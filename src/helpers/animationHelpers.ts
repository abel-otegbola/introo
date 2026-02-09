import { interpolate, spring } from 'remotion';

interface AnimationParams {
  elementFrame: number;
  durationFrames: number;
  fps: number;
  animationType: string;
}

export const getAnimationStyle = ({ elementFrame, durationFrames, fps, animationType }: AnimationParams) => {
  const animDuration = Math.min(0.5 * fps, durationFrames / 4);
  const style: {
    opacity?: number;
    transform?: string;
  } = {};

  switch (animationType) {
    case 'fade':
      if (elementFrame < animDuration) {
        style.opacity = interpolate(elementFrame, [0, animDuration], [0, 1]);
      } else if (elementFrame > durationFrames - animDuration) {
        style.opacity = interpolate(elementFrame, [durationFrames - animDuration, durationFrames], [1, 0]);
      } else {
        style.opacity = 1;
      }
      break;

    case 'slideLeft':
      if (elementFrame < animDuration) {
        const translateX = interpolate(elementFrame, [0, animDuration], [100, 0]);
        style.transform = `translateX(${translateX}%)`;
        style.opacity = interpolate(elementFrame, [0, animDuration / 2], [0, 1]);
      } else if (elementFrame > durationFrames - animDuration) {
        const translateX = interpolate(elementFrame, [durationFrames - animDuration, durationFrames], [0, -100]);
        style.transform = `translateX(${translateX}%)`;
        style.opacity = interpolate(elementFrame, [durationFrames - animDuration / 2, durationFrames], [1, 0]);
      }
      break;

    case 'slideRight':
      if (elementFrame < animDuration) {
        const translateX = interpolate(elementFrame, [0, animDuration], [-100, 0]);
        style.transform = `translateX(${translateX}%)`;
        style.opacity = interpolate(elementFrame, [0, animDuration / 2], [0, 1]);
      } else if (elementFrame > durationFrames - animDuration) {
        const translateX = interpolate(elementFrame, [durationFrames - animDuration, durationFrames], [0, 100]);
        style.transform = `translateX(${translateX}%)`;
        style.opacity = interpolate(elementFrame, [durationFrames - animDuration / 2, durationFrames], [1, 0]);
      }
      break;

    case 'slideUp':
      if (elementFrame < animDuration) {
        const translateY = interpolate(elementFrame, [0, animDuration], [100, 0]);
        style.transform = `translateY(${translateY}%)`;
        style.opacity = interpolate(elementFrame, [0, animDuration / 2], [0, 1]);
      } else if (elementFrame > durationFrames - animDuration) {
        const translateY = interpolate(elementFrame, [durationFrames - animDuration, durationFrames], [0, -100]);
        style.transform = `translateY(${translateY}%)`;
        style.opacity = interpolate(elementFrame, [durationFrames - animDuration / 2, durationFrames], [1, 0]);
      }
      break;

    case 'slideDown':
      if (elementFrame < animDuration) {
        const translateY = interpolate(elementFrame, [0, animDuration], [-100, 0]);
        style.transform = `translateY(${translateY}%)`;
        style.opacity = interpolate(elementFrame, [0, animDuration / 2], [0, 1]);
      } else if (elementFrame > durationFrames - animDuration) {
        const translateY = interpolate(elementFrame, [durationFrames - animDuration, durationFrames], [0, 100]);
        style.transform = `translateY(${translateY}%)`;
        style.opacity = interpolate(elementFrame, [durationFrames - animDuration / 2, durationFrames], [1, 0]);
      }
      break;

    case 'zoomIn':
      if (elementFrame < animDuration) {
        const scale = interpolate(elementFrame, [0, animDuration], [0, 1]);
        style.transform = `scale(${scale})`;
        style.opacity = interpolate(elementFrame, [0, animDuration / 2], [0, 1]);
      } else if (elementFrame > durationFrames - animDuration) {
        const scale = interpolate(elementFrame, [durationFrames - animDuration, durationFrames], [1, 0]);
        style.transform = `scale(${scale})`;
        style.opacity = interpolate(elementFrame, [durationFrames - animDuration / 2, durationFrames], [1, 0]);
      }
      break;

    case 'zoomOut':
      if (elementFrame < animDuration) {
        const scale = interpolate(elementFrame, [0, animDuration], [2, 1]);
        style.transform = `scale(${scale})`;
        style.opacity = interpolate(elementFrame, [0, animDuration / 2], [0, 1]);
      } else if (elementFrame > durationFrames - animDuration) {
        const scale = interpolate(elementFrame, [durationFrames - animDuration, durationFrames], [1, 2]);
        style.transform = `scale(${scale})`;
        style.opacity = interpolate(elementFrame, [durationFrames - animDuration / 2, durationFrames], [1, 0]);
      }
      break;

    case 'bounce':
      if (elementFrame < animDuration * 1.5) {
        const bounceScale = spring({
          frame: elementFrame,
          fps,
          config: {
            damping: 10,
            stiffness: 100,
            mass: 0.5,
          },
        });
        style.transform = `scale(${bounceScale})`;
        style.opacity = interpolate(elementFrame, [0, animDuration / 2], [0, 1]);
      } else if (elementFrame > durationFrames - animDuration) {
        style.opacity = interpolate(elementFrame, [durationFrames - animDuration, durationFrames], [1, 0]);
      }
      break;

    case 'rotate':
      if (elementFrame < animDuration) {
        const rotate = interpolate(elementFrame, [0, animDuration], [-180, 0]);
        const scale = interpolate(elementFrame, [0, animDuration], [0, 1]);
        style.transform = `rotate(${rotate}deg) scale(${scale})`;
        style.opacity = interpolate(elementFrame, [0, animDuration / 2], [0, 1]);
      } else if (elementFrame > durationFrames - animDuration) {
        const rotate = interpolate(elementFrame, [durationFrames - animDuration, durationFrames], [0, 180]);
        const scale = interpolate(elementFrame, [durationFrames - animDuration, durationFrames], [1, 0]);
        style.transform = `rotate(${rotate}deg) scale(${scale})`;
        style.opacity = interpolate(elementFrame, [durationFrames - animDuration / 2, durationFrames], [1, 0]);
      }
      break;

    case 'scaleUp':
      if (elementFrame < animDuration) {
        const scale = interpolate(elementFrame, [0, animDuration], [0.5, 1]);
        style.transform = `scale(${scale})`;
        style.opacity = interpolate(elementFrame, [0, animDuration / 2], [0, 1]);
      } else if (elementFrame > durationFrames - animDuration) {
        style.opacity = interpolate(elementFrame, [durationFrames - animDuration, durationFrames], [1, 0]);
      }
      break;

    case 'scaleDown':
      if (elementFrame < animDuration) {
        const scale = interpolate(elementFrame, [0, animDuration], [1.5, 1]);
        style.transform = `scale(${scale})`;
        style.opacity = interpolate(elementFrame, [0, animDuration / 2], [0, 1]);
      } else if (elementFrame > durationFrames - animDuration) {
        style.opacity = interpolate(elementFrame, [durationFrames - animDuration, durationFrames], [1, 0]);
      }
      break;

    case 'flip':
      if (elementFrame < animDuration) {
        const rotateY = interpolate(elementFrame, [0, animDuration], [90, 0]);
        style.transform = `perspective(1000px) rotateY(${rotateY}deg)`;
        style.opacity = interpolate(elementFrame, [0, animDuration / 2], [0, 1]);
      } else if (elementFrame > durationFrames - animDuration) {
        const rotateY = interpolate(elementFrame, [durationFrames - animDuration, durationFrames], [0, -90]);
        style.transform = `perspective(1000px) rotateY(${rotateY}deg)`;
        style.opacity = interpolate(elementFrame, [durationFrames - animDuration / 2, durationFrames], [1, 0]);
      }
      break;

    case 'swing':
      if (elementFrame < animDuration * 2) {
        const progress = elementFrame / (animDuration * 2);
        const swingRotate = Math.sin(progress * Math.PI * 4) * 15 * (1 - progress);
        style.transform = `rotate(${swingRotate}deg)`;
        style.opacity = interpolate(elementFrame, [0, animDuration / 2], [0, 1]);
      } else if (elementFrame > durationFrames - animDuration) {
        style.opacity = interpolate(elementFrame, [durationFrames - animDuration, durationFrames], [1, 0]);
      }
      break;

    default:
      // No animation
      style.opacity = 1;
      break;
  }

  return style;
};
