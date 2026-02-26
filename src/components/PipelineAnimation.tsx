"use client";

import { tokens } from "@/lib/tokens";

export function PipelineAnimation() {
  return (
    <div
      style={{
        background: tokens.colors.bg.secondary,
        border: `1px solid ${tokens.colors.border.subtle}`,
        borderRadius: tokens.radii.lg,
        padding: tokens.spacing[8],
        minHeight: "320px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg viewBox="0 0 395 180" style={{ width: "100%", maxWidth: "395px", height: "180px" }}>
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke="#5aa882" strokeWidth="1" opacity="0.3" />
          </marker>
          <marker id="arrow-bright" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke="#5aa882" strokeWidth="1" opacity="0.8" />
          </marker>
        </defs>

        {/* === DATA SOURCES (left) === */}
        <g transform="translate(10, 20)">
          {/* Source boxes stacked - bigger */}
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(0, ${i * 50})`}>
              <rect
                x="0" y="0" width="60" height="34" rx="3"
                fill="none"
                stroke="#5aa882"
                strokeWidth="1"
                opacity={0.25}
              />
              {/* Mini database icon inside - bigger */}
              <ellipse cx="30" cy="11" rx="16" ry="5" fill="none" stroke="#5aa882" strokeWidth="0.75" opacity="0.25" />
              <path d="M14 11 L14 24 Q14 29 30 29 Q46 29 46 24 L46 11" fill="none" stroke="#5aa882" strokeWidth="0.75" opacity="0.25" />
            </g>
          ))}
        </g>

        {/* === ARROWS: Sources to Signal Detection === */}
        <g stroke="#5aa882" strokeWidth="1" markerEnd="url(#arrow)">
          <line x1="75" y1="37" x2="105" y2="60" strokeDasharray="3 2" opacity="0.2">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
            <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.5s" repeatCount="indefinite" />
          </line>
          <line x1="75" y1="79" x2="105" y2="79" strokeDasharray="3 2" opacity="0.2">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.3s" repeatCount="indefinite" begin="0.3s" />
            <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.8s" repeatCount="indefinite" />
          </line>
          <line x1="75" y1="121" x2="105" y2="98" strokeDasharray="3 2" opacity="0.2">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.1s" repeatCount="indefinite" begin="0.6s" />
            <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.6s" repeatCount="indefinite" />
          </line>
        </g>

        {/* === SIGNAL DETECTION (cylinder) - bigger === */}
        <g transform="translate(110, 30)">
          <ellipse cx="35" cy="10" rx="32" ry="10" fill="none" stroke="#5aa882" strokeWidth="1" opacity="0.25" />
          <path d="M3 10 L3 88 Q3 98 35 98 Q67 98 67 88 L67 10" fill="none" stroke="#5aa882" strokeWidth="1" opacity="0.25" />
          <ellipse cx="35" cy="88" rx="32" ry="10" fill="none" stroke="#5aa882" strokeWidth="1" opacity="0.15" />
          {/* Internal lines - processing */}
          <line x1="15" y1="35" x2="55" y2="35" stroke="#5aa882" strokeWidth="0.5" opacity="0.2" />
          <line x1="15" y1="50" x2="55" y2="50" stroke="#5aa882" strokeWidth="0.5" opacity="0.2" />
          <line x1="15" y1="65" x2="45" y2="65" stroke="#5aa882" strokeWidth="0.5" opacity="0.2" />
          {/* Pulse effect on cylinder */}
          <ellipse cx="35" cy="10" rx="32" ry="10" fill="none" stroke="#5aa882" strokeWidth="1.5" opacity="0">
            <animate attributeName="opacity" values="0;0.5;0" dur="2s" repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* === ARROW: Detection to Orchestration === */}
        <line x1="182" y1="79" x2="210" y2="79" stroke="#5aa882" strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="3 2" opacity="0.2">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.8s" repeatCount="indefinite" begin="0.5s" />
          <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.5s" repeatCount="indefinite" />
        </line>

        {/* === ORCHESTRATION (box with flows) - bigger === */}
        <g transform="translate(215, 30)">
          <rect x="0" y="0" width="80" height="98" rx="4" fill="none" stroke="#5aa882" strokeWidth="1" opacity="0.25" />
          {/* Flow lines inside */}
          <path d="M12 25 Q40 32 68 25" fill="none" stroke="#5aa882" strokeWidth="0.5" opacity="0.2" />
          <path d="M12 49 Q40 42 68 49" fill="none" stroke="#5aa882" strokeWidth="0.5" opacity="0.2" />
          <path d="M12 73 Q40 80 68 73" fill="none" stroke="#5aa882" strokeWidth="0.5" opacity="0.2" />
          {/* Dots moving through - energy pulses */}
          <circle r="3" fill="#5aa882" opacity="0">
            <animateMotion dur="2s" repeatCount="indefinite" path="M12 25 Q40 32 68 25" />
            <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle r="3" fill="#5aa882" opacity="0">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M12 49 Q40 42 68 49" begin="0.5s" />
            <animate attributeName="opacity" values="0;0.8;0" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
          </circle>
          <circle r="3" fill="#5aa882" opacity="0">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M12 73 Q40 80 68 73" begin="1s" />
            <animate attributeName="opacity" values="0;0.8;0" dur="2.2s" repeatCount="indefinite" begin="1s" />
          </circle>
        </g>

        {/* === ARROWS: Orchestration to Outputs === */}
        <g stroke="#5aa882" strokeWidth="1" markerEnd="url(#arrow)">
          <line x1="300" y1="55" x2="330" y2="40" strokeDasharray="3 2" opacity="0.2">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" begin="0.8s" />
            <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.5s" repeatCount="indefinite" />
          </line>
          <line x1="300" y1="79" x2="330" y2="79" strokeDasharray="3 2" opacity="0.2">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.2s" repeatCount="indefinite" begin="1s" />
            <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.8s" repeatCount="indefinite" />
          </line>
          <line x1="300" y1="103" x2="330" y2="118" strokeDasharray="3 2" opacity="0.2">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.9s" repeatCount="indefinite" begin="1.2s" />
            <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.6s" repeatCount="indefinite" />
          </line>
        </g>

        {/* === OUTPUTS (channels) - bigger === */}
        <g transform="translate(335, 20)">
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(0, ${i * 50})`}>
              <rect
                x="0" y="0" width="50" height="34" rx="3"
                fill="none"
                stroke="#5aa882"
                strokeWidth="1"
                opacity="0.25"
              />
              {/* Send icon - bigger */}
              <path d="M14 17 L36 17 M30 11 L36 17 L30 23" fill="none" stroke="#5aa882" strokeWidth="1" opacity="0.25" />
              {/* Pulse when active */}
              <rect
                x="0" y="0" width="50" height="34" rx="3"
                fill="none"
                stroke="#5aa882"
                strokeWidth="1.5"
                opacity="0"
              >
                <animate attributeName="opacity" values="0;0.5;0" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
              </rect>
            </g>
          ))}
        </g>

      </svg>
    </div>
  );
}
