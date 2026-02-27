import "@/components/wc/wc.css";
import {
  DesignLabel,
  PostcardFront,
  PostcardBack,
  PhoneMockup,
  PostcardLandingContent,
  ScaleWrap,
  defaultCarrier,
} from "@/components/wc";

export default function PostcardCampaignPage() {
  const carrier = defaultCarrier;

  return (
    <div style={{
      background: '#d6d1cb',
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      minHeight: '100vh',
      padding: '48px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 24,
      overflowX: 'hidden',
    }}>
      <div style={{
        fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: 24,
        color: '#333', textAlign: 'center', letterSpacing: '-0.5px', marginBottom: 4,
      }}>
        WithCoverage
      </div>
      <div style={{
        fontSize: 13, color: '#888', textAlign: 'center', maxWidth: 560,
        lineHeight: 1.5, marginBottom: 16,
      }}>
        Congratulatory angle. &ldquo;In honor of your safety record, dinner&apos;s on us.&rdquo; Email capture to claim gift card. Selling happens over email.
      </div>

      <DesignLabel title="Postcard Front (6×9)" annotation="Feels like recognition, not a sales pitch. Their name + a celebration." />
      <ScaleWrap nativeWidth={864}>
        <PostcardFront carrier={carrier} />
      </ScaleWrap>

      <DesignLabel title="Postcard Back" annotation="Carrier details + gift card context + QR code. Clean, not salesy." />
      <ScaleWrap nativeWidth={864}>
        <PostcardBack carrier={carrier} />
      </ScaleWrap>

      <div style={{ width: '100%', maxWidth: 864, height: 1, background: 'rgba(0,0,0,0.08)', margin: '24px 0' }} />

      <DesignLabel title="Landing Page — Mobile" annotation="Confirms their ranking. Shows local restaurant. Email = claim. No selling on this page." />
      <ScaleWrap nativeWidth={375}>
        <PhoneMockup url={carrier.personalizedUrl}>
          <PostcardLandingContent carrier={carrier} />
        </PhoneMockup>
      </ScaleWrap>
    </div>
  );
}
