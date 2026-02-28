import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Outbound Solutions - GTM that gets results';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #000 0%, #111 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Accent glow */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(74, 222, 128, 0.15) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          {/* Logo / Brand */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: '#fff',
              letterSpacing: '-0.02em',
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                background: '#fff',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M4 4l8 8m0 0l8-8m-8 8v12" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            outboundsolutions.com
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              lineHeight: 1.1,
              marginBottom: 32,
            }}
          >
            GTM that gets results
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 24,
              color: '#888',
              textAlign: 'center',
              maxWidth: 700,
            }}
          >
            Targeted outbound campaigns for B2B sales teams
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #4ade80, #22d3ee, #4ade80)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
