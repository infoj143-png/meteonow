'use client';

import { useEffect, useRef } from 'react';

export default function AdContainer({
  type = 'native',
  slot = 'banner',
  label = 'Publicité partenaire',
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (type === 'social') {
      const scriptUrl =
        'https://pl31231573.profitableratecpmnetwork.com/1d/65/21/1d652170314718feab71b0e9ae14d325.js';

      // Avoid injecting duplicate scripts if already present on the page or in container
      if (document.querySelector(`script[src="${scriptUrl}"]`)) return;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = scriptUrl;
      script.async = true;

      container.appendChild(script);

      return () => {
        if (container.contains(script)) {
          container.removeChild(script);
        }
      };
    }

    if (type === 'monetag') {
      const scriptUrl = 'https://nap5k.com/tag.min.js';

      if (container.querySelector(`script[src="${scriptUrl}"]`)) return;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = scriptUrl;
      script.async = true;
      script.dataset.zone = '11746634';

      container.appendChild(script);

      return () => {
        if (container.contains(script)) {
          container.removeChild(script);
        }
      };
    }

    if (type === 'native') {
      const scriptUrl =
        'https://pl31231572.profitableratecpmnetwork.com/b0ddaac518c2ff5004e1dd95bdc9c260/invoke.js';

      // Avoid injecting duplicate script into the same container
      if (container.querySelector(`script[src="${scriptUrl}"]`)) return;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = scriptUrl;
      script.async = true;
      script.setAttribute('data-cfasync', 'false');

      container.appendChild(script);

      return () => {
        if (container.contains(script)) {
          container.removeChild(script);
        }
      };
    }
  }, [type]);

  if (type === 'monetag') {
    return (
      <div className="my-8 w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 md:p-6 text-center relative overflow-hidden group shadow-lg">
          <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-widest mb-3 px-1">
            <span>Espace Sponsorisé</span>
            <span>{label}</span>
          </div>

          {/* Monetag Inline Banner Container */}
          <div
            ref={containerRef}
            className="min-h-[100px] sm:min-h-[130px] rounded-xl bg-slate-950/80 border border-dashed border-slate-800 flex flex-col items-center justify-center p-4 transition-colors group-hover:border-slate-700"
          >
            <div id="monetag-banner-container" className="w-full h-full flex justify-center items-center">
              <span className="text-xs font-semibold text-slate-400 mb-1">
                Monetag Banner — {slot.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'social') {
    return <div ref={containerRef} className="adsterra-social-container my-4" />;
  }

  const containerId = `container-b0ddaac518c2ff5004e1dd95bdc9c260`;

  return (
    <div className="my-8 w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 md:p-6 text-center relative overflow-hidden group shadow-lg">
        <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-widest mb-3 px-1">
          <span>Espace Sponsorisé</span>
          <span>{label}</span>
        </div>

        {/* Adsterra Native Banner Container */}
        <div
          ref={containerRef}
          className="min-h-[100px] sm:min-h-[130px] rounded-xl bg-slate-950/80 border border-dashed border-slate-800 flex flex-col items-center justify-center p-4 transition-colors group-hover:border-slate-700"
        >
          <div id={containerId} className="w-full h-full flex justify-center items-center">
            <span className="text-xs font-semibold text-slate-400 mb-1">
              Adsterra Native Banner
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
