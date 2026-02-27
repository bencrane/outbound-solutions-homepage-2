import "@/components/wc/wc.css";
import { DesignLabel, ScaleWrap } from "@/components/wc";
import { PostcardFront, PostcardBack, PhoneMockup, LandingPageContent, defaultCompany } from "@/components/lunos";

export default function PostcardCampaignPage() {
  const company = defaultCompany;
  const personalizedUrl = `lunos.ai/review/${company.company.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;

  return (
    <div style={{
      background: '#f5f0eb',
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      minHeight: '100vh',
      padding: '48px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 24,
      overflowX: 'hidden',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      <div style={{
        fontFamily: "'DM Serif Display', serif", fontWeight: 900, fontSize: 24,
        color: '#1a1a1a', textAlign: 'center', letterSpacing: '-0.5px', marginBottom: 4,
      }}>
        LUNOS
      </div>
      <DesignLabel title="Postcard Front (6×9)" annotation="Personalized DSO data. Shows annual cost of slow collections. CTA to personalized savings page." />
      <ScaleWrap nativeWidth={660}>
        <PostcardFront company={company} />
      </ScaleWrap>

      <DesignLabel title="Postcard Back" annotation="Explains the problem + Lunos solution. Address block with QR code." />
      <ScaleWrap nativeWidth={660}>
        <PostcardBack company={company} />
      </ScaleWrap>

      <div style={{ width: '100%', maxWidth: 700, height: 1, background: 'rgba(0,0,0,0.08)', margin: '24px 0' }} />

      <DesignLabel title="Landing Page — Mobile" annotation="Shows AR analysis with DSO gap. Savings estimate + email capture. No hard sell on this page." />
      <ScaleWrap nativeWidth={375}>
        <PhoneMockup url={personalizedUrl}>
          <LandingPageContent company={company} />
        </PhoneMockup>
      </ScaleWrap>

    </div>
  );
}
