"use client";

import React, { useState, useRef } from 'react';

interface ThreeDTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const ThreeDTilt: React.FC<ThreeDTiltProps> = ({
  children,
  className = '',
  maxTilt = 10,
  style = {},
  onClick
}) => {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Mouse coordinates relative to card center
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize coordinates to range of [-0.5, 0.5]
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;

    // Rotate X is driven by Y deviation, Rotate Y is driven by X deviation
    const rotateX = normY * -maxTilt;
    const rotateY = normX * maxTilt;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px) scale3d(1.025, 1.025, 1.025)`,
      boxShadow: `
        ${-normX * 15}px ${-normY * 15}px 30px rgba(9, 9, 11, 0.12),
        0 15px 35px rgba(9, 9, 11, 0.08)
      `,
      transition: 'transform 0.08s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.08s ease'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)',
      boxShadow: 'none',
      transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease'
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`${className}`}
      style={{
        transformStyle: 'preserve-3d',
        ...style,
        ...tiltStyle
      }}
    >
      {children}
    </div>
  );
};
