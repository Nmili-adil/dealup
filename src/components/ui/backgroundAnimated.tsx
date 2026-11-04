"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

interface DealupAnimatedBackgroundProps {
  children?: ReactNode;
  className?: string;
}

export function DealupAnimatedBackground({
  children,
  className = "",
}: DealupAnimatedBackgroundProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(query.matches);
    const handleChange = (event: MediaQueryListEvent) => setReduceMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      <ShaderGradientCanvas
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        pointerEvents="none"
        lazyLoad={false}
        pixelDensity={1}
        fov={40}
      >
        <ShaderGradient
          type="waterPlane"
          animate={reduceMotion ? "off" : "on"}
          color1="#0B5E4E"
          color2="#128C7E"
          color3="#25D366"
          brightness={0.9}
          reflection={0.1}
          grain="off"
          lightType="3d"
          envPreset="city"
          uSpeed={0.12}
          uStrength={1.2}
          uDensity={0.9}
          uFrequency={3}
          uAmplitude={0}
          positionX={0}
          positionY={0}
          positionZ={0}
          rotationX={0}
          rotationY={0}
          rotationZ={0}
          cAzimuthAngle={180}
          cPolarAngle={90}
          cDistance={4.2}
          cameraZoom={1}
        />
      </ShaderGradientCanvas>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.55) 32%, rgba(255,255,255,0.15) 58%, rgba(255,255,255,0.35) 100%)",
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
