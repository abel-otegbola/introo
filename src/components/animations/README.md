# ScatterText Animation Component

A beautiful React component that creates scatter-and-assemble text animations similar to polygon reveal effects.

## Usage

```tsx
import { ScatterText } from '@/components/animations/ScatterText';

// Basic usage
<ScatterText text="HELLO WORLD" />

// Custom styling
<ScatterText 
  text="AMAZING"
  fontSize={64}
  color="#8263F4"
  fontWeight="bold"
  duration={1.2}
  staggerDelay={0.05}
  width={800}
  height={200}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | required | The text to animate |
| `fontSize` | `number` | `48` | Font size in pixels |
| `color` | `string` | `#8263F4` | Text color (hex/rgb) |
| `fontWeight` | `string` | `bold` | Font weight |
| `duration` | `number` | `0.8` | Animation duration in seconds |
| `staggerDelay` | `number` | `0.03` | Delay between each letter (seconds) |
| `width` | `number` | `600` | SVG width |
| `height` | `number` | `120` | SVG height |

## Features

- **Letter-by-letter animation** - Each character animates independently
- **Random scatter positions** - Letters start from random positions
- **Rotation effects** - Letters spin into place
- **Scale animation** - Letters grow from small to full size
- **Staggered timing** - Creates a beautiful cascading effect
- **Gradient support** - Built-in gradient and glow effects
- **Customizable** - Full control over colors, timing, and sizing

## Animation Details

Each letter:
1. Starts with random position offset (±300px)
2. Rotates from random angle (±540°)
3. Scales from 0-30% to 100% size
4. Fades in from opacity 0 to 1
5. Animates sequentially with configurable delay

Perfect for hero text, titles, and eye-catching headings!
