import "@/components/wc/wc.css";
import {
  DesignLabel,
  Envelope,
  Letter,
  PhoneMockup,
  CarrierCheckLandingContent,
  ScaleWrap,
  defaultCarrier,
} from "@/components/wc";

export default function LetterCampaignPage() {
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
        Savings hidden on the letter. &ldquo;Guess your savings&rdquo; mechanic drives to landing page. $100 gift card for booking a review.
      </div>

      <DesignLabel title="Envelope — Front" annotation="Official look. Teaser line visible on envelope face." />
      <ScaleWrap nativeWidth={890}>
        <Envelope carrier={carrier} />
      </ScaleWrap>

      <DesignLabel title="Letter Insert" annotation="Fleet data shown. Savings blurred/hidden. Gift card incentive to guess + book." />
      <ScaleWrap nativeWidth={680}>
        <Letter carrier={carrier} />
      </ScaleWrap>

      <div style={{ width: '100%', maxWidth: 864, height: 1, background: 'rgba(0,0,0,0.08)', margin: '24px 0' }} />

      <DesignLabel title="Landing Page — Mobile" annotation="Carrier check page. Shows fleet data, savings estimate, and quote CTA." />
      <ScaleWrap nativeWidth={375}>
        <PhoneMockup url={carrier.personalizedUrl}>
          <CarrierCheckLandingContent carrier={carrier} />
        </PhoneMockup>
      </ScaleWrap>
    </div>
  );
}
