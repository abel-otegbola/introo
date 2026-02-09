# Video Generation & Export Guide

## 🎬 Overview
Your video maker now includes complete video export functionality! Generate professional videos from your presentations using Remotion's powerful rendering engine.

## ✨ Features

### 1. Export Configuration
- **Multiple Formats**: MP4, WebM, GIF
- **Quality Settings**: Low, Medium, High, Ultra
- **Frame Rates**: 30 FPS, 60 FPS
- **Resolutions**:
  - 1080p (1920x1080) - Full HD
  - 720p (1280x720) - HD
  - 4K (3840x2160) - Ultra HD
  - Portrait (720x1280, 1080x1920) - Mobile/Social

### 2. AI-Powered Video Generation
- Create complete video scripts with Gemini AI
- Styled SVG text graphics
- Automatic image/video integration
- Professional animations and timing
- Data visualizations (charts)

### 3. Export Methods
- **Project Export**: Download project data for rendering
- **Remotion Studio**: Visual preview and customization
- **Command Line**: Direct video rendering
- **Cloud Rendering**: Remotion Lambda (for production)

## 🚀 Quick Start

### Method 1: Using the UI (Recommended for Beginners)

1. **Create Your Video**
   - Upload images/videos
   - Click "AI Generate" or add elements manually
   - Customize timing, positions, animations

2. **Export Project**
   - Click "Export" button (top right)
   - Configure settings (format, quality, resolution

, FPS)
   - Click "Export Video"
   - Project JSON file downloads automatically

3. **Render with Remotion Studio**
   ```bash
   npm run remotion:studio
   ```
   - Opens visual interface
   - Import your project data
   - Preview and render

### Method 2: Command Line (Power Users)

1. **Export your project** (saves JSON with video data)

2. **Render directly**:
   ```bash
   npm run remotion:render
   ```

3. **Custom render command**:
   ```bash
   npx remotion render <composition> <output-name> --props='<json-file>'
   ```

### Method 3: Remotion Cloud (Production)

For professional deployments:

```bash
# Install Remotion Lambda
npm install @remotion/lambda

# Deploy and render
npx remotion lambda deploy
npx remotion lambda render <composition> <output>
```

## 📋 Export Settings Explained

### Format
- **MP4** (Recommended): Best compatibility, H.264 codec
- **WebM**: Smaller file size, web-optimized, VP8 codec
- **GIF**: Animated GIF, larger files, no audio

### Quality
- **Low (CRF 28)**: Smaller files, faster rendering, visible compression
- **Medium (CRF 23)**: Good balance, suitable for web
- **High (CRF 18)**: Excellent quality, larger files
- **Ultra (CRF 15)**: Near-lossless, best quality, very large files

### Resolution
Choose based on platform:
- **1080p**: YouTube, presentations, general use
- **720p**: Faster rendering, smaller files, web
- **4K**: Professional presentations, high-end displays
- **Portrait**: Instagram Stories, TikTok, mobile

### Frame Rate
- **30 FPS**: Standard, smooth, smaller files
- **60 FPS**: Ultra-smooth, gaming/sports, larger files

## 🎨 Complete Workflow Example

### 1. Create Video with AI
```
1. Upload 3 product screenshots
2. Click "AI Generate"
3. Fill in:
   - Project Name: "TaskMaster Pro Launch"
   - Description: Full project description
   - Bio: Team introduction
   - Client: Testimonial
   - Metrics: Growth stats
4. Generate (AI creates 12-15 elements)
```

### 2. Customize
```
- Drag elements to reposition
- Adjust timing on timeline
- Change animations
- Add more elements manually
- Preview with player controls
```

### 3. Export
```
1. Click "Export"
2. Select:
   - Format: MP4
   - Quality: High
   - Resolution: 1080p
   - FPS: 30
3. Click "Export Video"
4. Project data downloads
```

### 4. Render
```bash
# Option A: Visual Studio
npm run remotion:studio

# Option B: Direct render
npm run remotion:render

# Option C: Custom settings
npx remotion render src/components/createVideo/VideoComposition.tsx VideoComposition out/my-video.mp4 --codec h264 --crf 18
```

## 🛠️ Advanced Rendering

### Custom Remotion Commands

```bash
# Render specific composition
npx remotion render <entry-file> <composition-id> <output>

# With quality settings
npx remotion render src/components/createVideo/VideoComposition.tsx VideoComposition video.mp4 --crf 18

# Custom resolution
npx remotion render <composition> output.mp4 --width 1920 --height 1080

# Different codec
npx remotion render <composition> output.webm --codec vp8

# With props (your video data)
npx remotion render <composition> output.mp4 --props='{"data": {...}}'

# High quality GIF
npx remotion render <composition> output.gif --codec gif
```

### Batch Rendering

Create multiple videos:
```bash
# Script example
for file in projects/*.json; do
  npx remotion render <composition> "out/$(basename $file .json).mp4" --props="$(cat $file)"
done
```

## 💡 Pro Tips

### 1. Optimize Rendering Speed
```bash
# Use more CPU cores
npx remotion render <comp> output.mp4 --concurrency 8

# Lower quality for previews
npx remotion render <comp> preview.mp4 --crf 28

# Skip audio for faster render
npx remotion render <comp> output.mp4 --muted
```

### 2. File Size Optimization
- Use WebM instead of MP4 (smaller)
- Lower CRF value = better quality but larger file
- 720p is 50% smaller than 1080p
- 30 FPS vs 60 FPS = half the file size

### 3. Cloud Rendering (Production)
For large-scale rendering:

```bash
# Setup
npm install @remotion/lambda
npx remotion lambda setup

# Render
npx remotion lambda render <composition-id> \
  --region us-east-1 \
  --props='<json-data>'
```

**Benefits**:
- Fast parallel rendering
- No local resources used
- Scalable for multiple videos
- Pay-per-render pricing

## 🎯 Common Use Cases

### Product Demo Videos
```
Settings:
- Format: MP4
- Quality: High
- Resolution: 1080p
- FPS: 30
- Duration: 30-60 seconds
```

### Social Media Content
```
Instagram/TikTok:
- Format: MP4
- Quality: Medium
- Resolution: 1080x1920 (Portrait)
- FPS: 30
- Duration: 15-30 seconds

YouTube:
- Format: MP4
- Quality: High/Ultra
- Resolution: 1080p or 4K
- FPS: 30 or 60
```

### Presentations
```
Settings:
- Format: MP4
- Quality: High
- Resolution: 1080p
- FPS: 30
- Duration: 2-5 minutes
```

### Animated GIFs
```
Settings:
- Format: GIF
- Quality: Medium
- Resolution: 720p
- FPS: 30
- Duration: 5-10 seconds (keep short)
```

## 🔧 Troubleshooting

### "Rendering failed"
- Check Node.js version (14+ required)
- Ensure FFmpeg is installed
- Verify project data is valid JSON
- Try lower quality settings

### "Out of memory"
- Close other applications
- Use lower resolution
- Reduce concurrency: `--concurrency 2`
- Render shorter segments

### "Slow rendering"
- Use lower quality for previews
- Reduce resolution to 720p
- Lower FPS to 30
- Check CPU/RAM usage

### "File too large"
- Use WebM format
- Lower quality (increase CRF)
- Reduce resolution
- Use 30 FPS instead of 60

## 📦 Export File Structure

Your exported JSON contains:
```json
{
  "data": {
    "title": "Video title",
    "duration": 30,
    "layout": "0.5625",
    "elements": [
      {
        "id": 123,
        "type": "svg",
        "svgContent": "<svg>...</svg>",
        "position": { "x": 50, "y": 100 },
        "animation": "fade",
        "duration": 5,
        "start": 0
      }
    ]
  },
  "settings": {
    "format": "mp4",
    "quality": "high",
    "fps": 30,
    "width": 1920,
    "height": 1080
  },
  "timestamp": "2026-02-09T..."
}
```

## 🌟 Best Practices

1. **Preview First**: Use Remotion Studio to preview
2. **Test Settings**: Start with medium quality, adjust as needed
3. **Save Projects**: Keep JSON files for future renders
4. **Organize Files**: Create folders for projects and outputs
5. **Version Control**: Save different versions of your videos
6. **Optimize Elements**: Remove unused elements before export
7. **Check Timing**: Ensure no elements exceed video duration
8. **Hardware**: More CPU cores = faster rendering

## 📚 Resources

- [Remotion Docs](https://remotion.dev)
- [Remotion Lambda](https://remotion.dev/lambda)
- [FFmpeg Installation](https://ffmpeg.org/download.html)
- [Video Codecs Guide](https://remotion.dev/docs/encoding)

## 🎬 Ready to Render?

```bash
# Quick start
npm run remotion:studio

# Or direct render
npm run remotion:render
```

---

**Happy Video Making! 🎥✨**
