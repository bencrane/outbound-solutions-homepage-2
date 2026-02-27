import { LumosCompanyData } from "./types";

export function LandingPageContent({ company: c }: { company: LumosCompanyData }) {
  const dsoDiff = parseInt(c.avgDSO) - parseInt(c.industryAvgDSO);

  return (
    <div style={{ padding: '0 20px 36px', fontFamily: "'DM Sans', -apple-system, sans-serif", background: '#0f1419', minHeight: '100%' }}>
      {/* Nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, marginBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#34d399' }}>lunos</div>
        <div style={{ fontSize: 10, color: '#7d8590' }}>AR Intelligence</div>
      </div>

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{
          display: 'inline-block', background: 'rgba(52,211,153,0.15)',
          border: '1px solid rgba(52,211,153,0.25)', color: '#34d399',
          fontSize: 10, fontWeight: 700, textTransform: 'uppercase' as const,
          letterSpacing: 1.5, padding: '5px 12px', borderRadius: 100, marginBottom: 16,
        }}>
          Your AR Analysis
        </div>
        <div style={{ fontWeight: 900, fontSize: 20, lineHeight: 1.2, marginBottom: 10, letterSpacing: -0.5, color: '#e6edf3' }}>
          Late payments cost <span style={{ color: '#34d399' }}>{c.company.split(' ').slice(0, 2).join(' ')}</span>
        </div>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 900, fontSize: 36, color: '#f87171', letterSpacing: -1, marginBottom: 8 }}>
          {c.annualCost}/yr
        </div>
        <div style={{ color: '#7d8590', fontSize: 12, lineHeight: 1.5 }}>
          Based on public data for freight companies your size
        </div>
      </div>

      {/* Data cards */}
      <div style={{
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12, padding: 16, marginBottom: 16,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {[
            { val: c.avgDSO, label: 'Your Est. DSO', color: '#f87171' },
            { val: c.industryAvgDSO, label: 'Industry Avg', color: '#34d399' },
            { val: `${dsoDiff} days`, label: 'Gap', color: '#fbbf24' },
            { val: `${c.invoiceVolume}/month`, label: 'Invoices', color: '#e6edf3' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center', padding: '12px 8px', background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 20, color: s.color, whiteSpace: 'nowrap' }}>{s.val}</div>
              <div style={{ fontSize: 9, color: '#7d8590', textTransform: 'uppercase' as const, letterSpacing: 0.5, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Savings estimate */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(52,211,153,0.12) 0%, rgba(6,182,212,0.08) 100%)',
        border: '1px solid rgba(52,211,153,0.2)', borderRadius: 12, padding: 20, textAlign: 'center', marginBottom: 16,
      }}>
        <div style={{ color: '#34d399', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 1.5, marginBottom: 8 }}>
          Estimated Annual Savings
        </div>
        <div style={{ fontWeight: 900, fontSize: 28, color: '#34d399', letterSpacing: -1 }}>
          $48,000 – $96,000
        </div>
        <div style={{ fontSize: 11, color: '#7d8590', marginTop: 6 }}>
          by reducing DSO to industry average
        </div>
      </div>

      {/* CTA */}
      <div style={{
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12, padding: 20, textAlign: 'center', marginBottom: 16,
      }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, color: '#e6edf3' }}>See your personalized savings</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input placeholder="Work email" style={{
            padding: '12px 14px', background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8,
            color: '#e6edf3', fontFamily: "'DM Sans', sans-serif", fontSize: 13, outline: 'none',
          }} />
          <button style={{
            padding: '14px 20px', background: 'linear-gradient(135deg, #34d399, #06b6d4)', color: '#0f1419',
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 800,
            border: 'none', borderRadius: 8, cursor: 'pointer',
          }}>
            Get My Analysis →
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ fontSize: 10, color: '#484f58', textAlign: 'center', lineHeight: 1.5 }}>
        Lunos uses AI to handle AR follow-ups, payment reminders, and collections — 24/7, in your tone.
      </div>
    </div>
  );
}
