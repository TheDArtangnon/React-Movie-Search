import React from "react";

export default function LoadingBlock({ lines = 3 }: { lines?: number }) {
  return (
    <div className="loading-block">
      <SkeletonLines count={lines} />
      <style>{`
        .loading-block { display: grid; gap: 10px; }
        .skeleton-line {
          height: 14px;
          border-radius: 8px;
          background: linear-gradient(90deg, #1c2329 25%, #2a333b 37%, #1c2329 63%);
          background-size: 400% 100%;
          animation: shimmer 1.2s infinite;
        }
        @keyframes shimmer {
          0% { background-position: 0% 0; }
          100% { background-position: -135% 0; }
        }
      `}</style>
    </div>
  );
}

export function SkeletonLines({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div className="skeleton-line" key={i} />
      ))}
    </>
  );
}
