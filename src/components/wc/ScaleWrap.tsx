"use client";

import { useRef, useState, useEffect, ReactNode } from "react";

interface ScaleWrapProps {
  children: ReactNode;
  nativeWidth: number;
}

export function ScaleWrap({ children, nativeWidth }: ScaleWrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [innerHeight, setInnerHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    function measure() {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const s = Math.min(containerWidth / nativeWidth, 1);
      setScale(s);

      if (innerRef.current) {
        setInnerHeight(innerRef.current.scrollHeight * s);
      }
    }
    measure();
    const observer = new ResizeObserver(measure);
    if (innerRef.current) observer.observe(innerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [nativeWidth]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: nativeWidth,
        margin: "0 auto",
        height: innerHeight,
        overflow: "hidden",
      }}
    >
      <div
        ref={innerRef}
        style={{
          transform: scale < 1 ? `scale(${scale})` : undefined,
          transformOrigin: "top left",
          width: nativeWidth,
        }}
      >
        {children}
      </div>
    </div>
  );
}
