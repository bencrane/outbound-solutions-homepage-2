import "@/components/wc/wc.css";
import { DesignLabel, ScaleWrap } from "@/components/wc";
import { PostcardFront2, PostcardBack2, PhoneMockup, LandingPageContent2, defaultCompany } from "@/components/lumos";

export default function GamifiedCampaignPage() {
  const company = defaultCompany;

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
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />

      <div style={{
        fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 24,
        color: '#333', textAlign: 'center', letterSpacing: '-0.5px', marginBottom: 4,
      }}>
        Lumos
      </div>
      <div style={{
        fontSize: 13, color: '#888', textAlign: 'center', maxWidth: 560,
        lineHeight: 1.5, marginBottom: 16,
      }}>
        Gamified approach. Hidden cost figure creates curiosity. &ldquo;Guess your number&rdquo; mechanic with $500 prize. Everyone wins at least $10.
      </div>

      <DesignLabel title="Postcard Front (6×9)" annotation="The hook — gamified, feels like recognition, not a sales pitch." />
      <ScaleWrap nativeWidth={720}>
        <PostcardFront2 company={company} />
      </ScaleWrap>

      <DesignLabel title="Postcard Back (6×9)" annotation="Personalized data + CTA. Clean, not salesy." />
      <ScaleWrap nativeWidth={720}>
        <PostcardBack2 company={company} />
      </ScaleWrap>

      <div style={{ width: '100%', maxWidth: 720, height: 1, background: 'rgba(0,0,0,0.08)', margin: '24px 0' }} />

      <DesignLabel title="Landing Page — Mobile" annotation="Guess input + email capture. Prize incentive prominent. Reveals number after submission." />
      <ScaleWrap nativeWidth={375}>
        <PhoneMockup url="lumos.ai/reveal">
          <LandingPageContent2 company={company} />
        </PhoneMockup>
      </ScaleWrap>
    </div>
  );
}
