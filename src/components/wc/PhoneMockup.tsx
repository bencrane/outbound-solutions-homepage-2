import { ReactNode } from "react";

interface PhoneMockupProps {
  url: string;
  children: ReactNode;
}

export function PhoneMockup({ url, children }: PhoneMockupProps) {
  return (
    <div className="wc-phone-frame">
      <div className="wc-phone-status">
        <div style={{ fontWeight: 700 }}>9:41</div>
        <div style={{ fontSize: '11px' }}>●●●● WiFi 🔋</div>
      </div>
      <div className="wc-phone-url-bar">
        <div className="lock">🔒</div>
        <div className="url">{url}</div>
      </div>
      <div className="wc-phone-content">
        {children}
      </div>
    </div>
  );
}
