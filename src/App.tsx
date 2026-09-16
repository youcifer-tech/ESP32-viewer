import { useState, useRef } from 'react';
import { ModelCanvas } from './components/ModelCanvas';
import { UIOverlay } from './components/UIOverlay';
import { ComponentInfo } from './data/components';
import * as THREE from 'three';

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<ComponentInfo | null>(null);
  const [clickedPoint, setClickedPoint] = useState<THREE.Vector3 | null>(null);
  
  const lineRef = useRef<SVGLineElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  return (
    <div className="relative w-screen h-screen bg-zinc-800 overflow-hidden font-sans text-white">
      
      {/* 3D Canvas Layer */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isStarted ? 'opacity-100' : 'opacity-0'}`}>
        <ModelCanvas 
          onSelectComponent={setSelectedComponent} 
          setClickedPoint={setClickedPoint}
          clickedPoint={clickedPoint}
          lineRef={lineRef}
          dotRef={dotRef}
        />
      </div>

      {/* UI Overlay Layer */}
      <div className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 delay-500 ${isStarted ? 'opacity-100' : 'opacity-0'}`}>
        <UIOverlay selectedComponent={selectedComponent} />
      </div>

      {/* SVG Overlay for the connection line */}
      <svg className={`absolute inset-0 z-20 pointer-events-none w-full h-full transition-opacity duration-1000 ${isStarted ? 'opacity-100' : 'opacity-0'}`}>
        <line 
          ref={lineRef}
          stroke="#60a5fa"
          strokeWidth="2"
          strokeDasharray="5 5"
          style={{ opacity: selectedComponent ? 0.6 : 0, transition: 'opacity 0.3s ease-in-out' }}
        />
        <circle 
          ref={dotRef}
          r="6"
          fill="#3b82f6"
          stroke="#ffffff"
          strokeWidth="2"
          style={{ opacity: selectedComponent ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}
        />
      </svg>

      {/* Intro Screen */}
      <div 
        className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-zinc-800 transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${isStarted ? '-translate-y-full' : 'translate-y-0'}`}
      >
        {/* Minimalist Grid Background for Intro */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        ></div>
        
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <div className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Hardware Showcase
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 animate-fade-in" style={{animationDelay: '0.4s'}}>
            ESP32 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Viewer</span>
          </h1>
          
          <p className="max-w-md text-gray-400 font-light leading-relaxed mb-12 animate-fade-in text-sm md:text-base" style={{animationDelay: '0.6s'}}>
            Explore the architecture of the ESP-WROOM-32 microcontroller in an interactive, fully 3D environment.
          </p>
          
          <button 
            onClick={() => setIsStarted(true)}
            className="group relative px-8 py-4 bg-white text-black font-semibold tracking-wide rounded-full overflow-hidden animate-fade-in hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]" 
            style={{animationDelay: '0.8s'}}
          >
            <span className="relative z-10 flex items-center text-sm uppercase">
              View ESP32
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
          </button>

          {/* Developer Credits */}
          <div className="mt-16 animate-fade-in flex flex-col items-center" style={{animationDelay: '1.0s'}}>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Developed by Youssef</p>
            <a 
              href="https://github.com/youcifer-tech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300 group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              github.com/youcifer-tech
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
