import { LumosCompanyData } from "./types";

export function LandingPageContent2({ company: c }: { company: LumosCompanyData }) {
  return (
    <div style={{ padding: '0 20px 36px', fontFamily: "'DM Sans', -apple-system, sans-serif", background: '#0a0f1a', minHeight: '100%' }}>
      {/* Nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, marginBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>lumos<span style={{ color: '#3b82f6' }}>.ai</span></div>
        <div style={{
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          color: '#10b981',
          fontSize: 9,
          fontWeight: 600,
          padding: '4px 10px',
          borderRadius: 100,
          textTransform: 'uppercase' as const,
        }}>
          ★ Top Performer
        </div>
      </div>

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, color: '#fff', lineHeight: 1.2, marginBottom: 12 }}>
          Late payments are costing you <em style={{ color: '#f59e0b', fontStyle: 'italic' }}>how much?</em>
        </div>
        <div style={{
          display: 'inline-flex',
          alignItems: 'baseline',
          gap: 4,
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05))',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          padding: '8px 16px',
          borderRadius: 8,
          marginBottom: 12,
        }}>
          <span style={{ fontSize: 20, color: '#f59e0b', fontWeight: 700 }}>$</span>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, color: '#f59e0b', letterSpacing: 2 }}>■■,■■■</span>
          <span style={{ fontSize: 12, color: '#f59e0b', opacity: 0.7 }}>/yr</span>
        </div>
        <div style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.5 }}>
          Guess your number to reveal it
        </div>
      </div>

      {/* Company card */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
      }}>
        <div style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 8 }}>Your Company</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 12 }}>{c.company}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { val: c.revenue, label: 'Revenue' },
            { val: c.industryAvgDSO, label: 'Ind. DSO' },
            { val: c.state, label: 'State' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center', padding: '10px 6px', background: 'rgba(255,255,255,0.02)', borderRadius: 6 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{s.val}</div>
              <div style={{ fontSize: 8, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: 0.5, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Prize callout */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(59, 130, 246, 0.08) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        borderRadius: 12,
        padding: 20,
        textAlign: 'center',
        marginBottom: 16,
      }}>
        <div style={{ color: '#10b981', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 1.5, marginBottom: 6 }}>
          Closest guess wins
        </div>
        <div style={{ fontWeight: 900, fontSize: 32, color: '#fff', letterSpacing: -1 }}>$500</div>
        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
          Everyone wins at least $10
        </div>
      </div>

      {/* Form */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
      }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16, color: '#fff', textAlign: 'center' }}>
          Enter your guess
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: 16 }}>$</span>
            <input placeholder="Your guess (e.g. 127000)" style={{
              width: '100%',
              padding: '14px 14px 14px 28px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              color: '#fff',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              outline: 'none',
              boxSizing: 'border-box',
            }} />
          </div>
          <input placeholder="Work email" style={{
            padding: '14px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            color: '#fff',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            outline: 'none',
          }} />
          <button style={{
            padding: '16px 20px',
            background: '#3b82f6',
            color: '#fff',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            fontWeight: 700,
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
          }}>
            Reveal My Number →
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ fontSize: 9, color: '#64748b', textAlign: 'center', lineHeight: 1.5 }}>
        No purchase necessary. All participants receive a minimum $10 gift card.
      </div>
    </div>
  );
}
