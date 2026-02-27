import { ReactNode } from "react";

interface PhoneMockupProps {
  url: string;
  children: ReactNode;
}

export function PhoneMockup({ url, children }: PhoneMockupProps) {
  return (
    <div style={{
      width: 375,
      background: '#0f1419',
      borderRadius: 40,
      padding: '12px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
    }}>
      {/* Inner frame */}
      <div style={{
        background: '#0f1419',
        borderRadius: 32,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
      }}>
        {/* Status bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 24px 8px',
          fontSize: 12,
          fontWeight: 600,
          color: '#e6edf3',
          fontFamily: "'DM Sans', -apple-system, sans-serif",
        }}>
          <div>9:41</div>
          <div style={{ fontSize: 11 }}>●●●● WiFi 🔋</div>
        </div>

        {/* URL bar */}
        <div style={{
          margin: '0 12px 8px',
          padding: '8px 12px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 12,
          color: '#7d8590',
          fontFamily: "'DM Sans', -apple-system, sans-serif",
        }}>
          <span>🔒</span>
          <span style={{ color: '#34d399' }}>{url}</span>
        </div>

        {/* Content */}
        <div style={{ minHeight: 600 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
