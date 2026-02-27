"use client";

import { useRef, useState, useEffect, ReactNode } from "react";

interface ScaleWrapProps {
  children: ReactNode;
  nativeWidth: number;
  nativeHeight?: number;
}

export function ScaleWrap({ children, nativeWidth, nativeHeight }: ScaleWrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function measure() {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const s = Math.min(containerWidth / nativeWidth, 1);
      setScale(s);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [nativeWidth]);

  const scaledHeight = nativeHeight ? nativeHeight * scale : undefined;

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: nativeWidth,
        margin: "0 auto",
        height: scaledHeight,
        overflow: "hidden",
      }}
    >
      <div style={{
        transform: scale < 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
        width: nativeWidth,
      }}>
        {children}
      </div>
    </div>
  );
}
