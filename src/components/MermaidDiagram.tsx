"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: true,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "Inter, sans-serif",
});

interface MermaidProps {
  code: string;
}

const MermaidDiagram: React.FC<MermaidProps> = ({ code }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.removeAttribute("data-processed");
      mermaid.contentLoaded();

      const renderDiagram = async () => {
        try {
          const { svg } = await mermaid.render(`mermaid-${Math.random().toString(36).substr(2, 9)}`, code);
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        } catch (error) {
          console.error("Mermaid rendering failed:", error);
          if (ref.current) {
            ref.current.innerHTML = "<p className='text-red-500'>Error rendering diagram. Please check the Mermaid syntax.</p>";
          }
        }
      };

      renderDiagram();
    }
  }, [code]);

  return (
    <div className="my-4 bg-neutral-900 p-4 rounded-xl border border-neutral-800 overflow-x-auto">
      <div ref={ref} className="flex justify-center" />
    </div>
  );
};

export default MermaidDiagram;
