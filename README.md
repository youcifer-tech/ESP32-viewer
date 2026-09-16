# 🌐 Electronics 3D Viewer | ESP32 Showcase

An interactive, high-performance 3D hardware explorer built to bridge the gap between embedded systems and modern web development. This project allows users to inspect the internal architecture of an ESP-WROOM-32 microcontroller in a fully interactive, 360-degree Holodeck environment.

Built as part of my Electrical and Computer Engineering (ECE) portfolio.

Website preview
https://esp32-viewer-taupe.vercel.app/

## ✨ Features

- **Interactive 3D Rendering**: Ultra-smooth 60fps WebGL rendering of complex PCB and chip geometries using React Three Fiber.
- **Component Raycasting**: Click on individual physical components (Processor, Antenna, LEDs, Pins) to isolate them and view their technical specifications.
- **Dynamic 3D-to-2D Tracking**: Features a custom math engine that projects 3D world coordinates onto a 2D SVG overlay, creating a dynamic callout line that stays glued to the hardware as you rotate the camera.
- **Holodeck Environment**: A custom-built, 360-degree fading grid environment that perfectly frames the hardware.
- **Responsive "Bottom-Sheet" Mobile UI**: The glassmorphism dashboard automatically transforms into a touch-friendly bottom sheet when viewed on mobile devices.

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Styling**: Tailwind CSS v4 (Glassmorphism & Responsive Design)
- **Deployment**: Vercel

*If you found this project interesting, feel free to star ⭐ the repository!*
