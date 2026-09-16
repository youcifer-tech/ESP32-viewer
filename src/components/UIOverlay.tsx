import React from 'react';
import { ComponentInfo } from '../data/components';

interface UIOverlayProps {
  selectedComponent: ComponentInfo | null;
}

export function UIOverlay({ selectedComponent }: UIOverlayProps) {
  return (
    <div className="w-full h-full relative pointer-events-none">
      
      {/* MAIN ESP32 DESCRIPTION CARD */}
      <div className={`absolute bottom-4 left-4 right-4 md:bottom-auto md:right-auto md:top-12 md:left-12 md:w-[350px] pointer-events-auto transition-all duration-500 ease-out
        ${selectedComponent ? 'opacity-0 translate-y-8 md:opacity-100 md:translate-y-0' : 'opacity-100 translate-y-0'}`}>
        
        <div className="relative bg-zinc-900/70 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-8 overflow-hidden shadow-2xl">
          {/* Decorative background glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
          
          <div className="relative z-10 mb-2 md:mb-6">
            <h2 className="text-[10px] md:text-xs font-bold tracking-widest text-blue-400 uppercase mb-1 md:mb-2">
              Hardware Showcase
            </h2>
            <h1 className="text-xl md:text-3xl font-bold text-white tracking-tight">
              ESP-WROOM-32
            </h1>
          </div>

          <div className="relative z-10 flex flex-col h-full">
            <p className="hidden md:block text-gray-300 leading-relaxed text-sm mb-6">
              A powerful, generic Wi-Fi+BT+BLE MCU module that targets a wide variety of applications. Features a dual-core Tensilica LX6 microprocessor running at 160 or 240 MHz.
            </p>
            <div className="hidden md:flex gap-4 mb-6">
               <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex-1 text-center">
                 <div className="text-white font-mono text-lg">240</div>
                 <div className="text-gray-500 text-xs uppercase tracking-wider">MHz CPU</div>
               </div>
               <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex-1 text-center">
                 <div className="text-white font-mono text-lg">520</div>
                 <div className="text-gray-500 text-xs uppercase tracking-wider">KB SRAM</div>
               </div>
            </div>
            
            <div className="hidden md:flex mt-4 pt-4 border-t border-white/10 text-sm font-medium text-gray-300 justify-between items-center">
              <span>Developed by <span className="text-white font-semibold">Youssef</span></span>
            </div>

            <div className="mt-2 md:mt-4 text-[10px] md:text-xs text-gray-400 flex items-center bg-black/30 rounded-xl p-3 md:p-3 border border-white/5">
              <svg className="w-4 h-4 mr-3 text-blue-400 animate-pulse flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
              Tap any component on the board to inspect
            </div>
          </div>
        </div>
      </div>

      {/* COMPONENT DETAILS CARD */}
      <div 
        className={`absolute bottom-4 left-4 right-4 md:bottom-auto md:left-auto md:top-12 md:right-12 md:w-[350px] transition-all duration-500 ease-out pointer-events-auto
          ${selectedComponent ? 'opacity-100 translate-y-0 md:translate-x-0' : 'opacity-0 translate-y-8 md:translate-y-0 md:translate-x-12'}`}
      >
        <div 
          id="ui-card"
          className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-8 shadow-2xl max-h-[70vh] md:max-h-[85vh] overflow-y-auto"
        >
          {/* Decorative background glow */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-teal-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 pointer-events-none"></div>
          
          {selectedComponent && (
            <>
              {/* Header */}
              <div className="relative z-10 mb-4 md:mb-6">
                <h2 className="text-[10px] md:text-xs font-bold tracking-widest text-teal-400 uppercase mb-1 md:mb-2">
                  Component Selected
                </h2>
                <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  {selectedComponent.title}
                </h1>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <p className="text-gray-300 leading-relaxed text-[13px] md:text-sm mb-4 md:mb-6">
                  {selectedComponent.description}
                </p>
                
                {selectedComponent.specs && selectedComponent.specs.length > 0 && (
                  <div>
                    <h3 className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 md:mb-3">
                      Specifications
                    </h3>
                    <ul className="space-y-1.5 md:space-y-2">
                      {selectedComponent.specs.map((spec, index) => (
                        <li key={index} className="text-[12px] md:text-sm text-gray-300 flex items-start">
                          <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-teal-400 rounded-full flex-shrink-0"></span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
}
