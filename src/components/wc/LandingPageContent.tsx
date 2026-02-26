import { CarrierData } from "./types";

export function PostcardLandingContent({ carrier }: { carrier: CarrierData }) {
  return (
    <div style={{ padding: '0 24px 36px', fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
      <div className="wc-logo" style={{ fontSize: 17, color: 'var(--wc-white)', textAlign: 'center', marginBottom: 24 }}>
        With<span>Coverage</span>
      </div>

      {/* Congrats banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(197,150,62,0.1) 0%, rgba(0,212,170,0.08) 100%)',
        border: '1px solid rgba(197,150,62,0.2)',
        borderRadius: 14, padding: '24px 20px', textAlign: 'center', marginBottom: 20,
      }}>
        <div style={{ fontSize: 36, marginBottom: 10 }}>🏆</div>
        <div style={{
          fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: 20,
          color: 'var(--wc-white)', lineHeight: 1.3, marginBottom: 8, letterSpacing: '-0.3px',
        }}>
          Congrats,<br/><span style={{ color: 'var(--wc-accent)' }}>{carrier.carrierName.split(' ').slice(0, 2).join(' ')}</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--wc-light-gray)', lineHeight: 1.5 }}>
          Your fleet&apos;s safety and compliance record ranks in the <strong style={{ color: 'var(--wc-white)', fontWeight: 700 }}>top 15%</strong> of similarly-sized carriers in the Midwest.
        </div>
      </div>

      {/* Rank */}
      <div style={{
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12, padding: '28px 20px', textAlign: 'center', marginBottom: 20,
      }}>
        <div style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase' as const, letterSpacing: 2, color: 'var(--wc-accent)', marginBottom: 12 }}>
          Your Safety Ranking
        </div>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: 48, color: 'var(--wc-white)', letterSpacing: -2, lineHeight: 1 }}>
          Top 15%
        </div>
        <div style={{ fontSize: 12, color: 'var(--wc-gray)', marginTop: 12 }}>
          out of <strong style={{ color: 'var(--wc-light-gray)' }}>2,400+</strong> carriers with 15–30 units in {carrier.homeState}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
        {[
          { val: String(carrier.powerUnits), label: 'Units' },
          { val: String(carrier.drivers), label: 'Drivers' },
          { val: carrier.authorityAge, label: 'Authority' },
        ].map((s) => (
          <div key={s.label} style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 10, padding: '14px 10px', textAlign: 'center',
          }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 18, color: 'var(--wc-white)' }}>{s.val}</div>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 1, color: 'var(--wc-gray)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Gift card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(197,150,62,0.15) 0%, rgba(197,150,62,0.05) 100%)',
        border: '1px solid rgba(197,150,62,0.25)',
        borderRadius: 14, padding: '24px 20px', textAlign: 'center', marginBottom: 20,
      }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🍽️</div>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: 18, color: 'var(--wc-white)', marginBottom: 6 }}>
          Dinner&apos;s on us
        </div>
        <div style={{ fontSize: 12, color: 'var(--wc-light-gray)', lineHeight: 1.5, marginBottom: 4 }}>
          In honor of your fleet&apos;s track record, enjoy a complimentary meal at a local favorite.
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--wc-gold)', marginTop: 4 }}>
          🍴 Maldaner&apos;s — {carrier.address.city}, {carrier.address.state}
        </div>
      </div>

      {/* Email capture */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--wc-light-gray)', marginBottom: 8, textAlign: 'center' }}>
          Enter your email to claim your $50 gift card
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 300, margin: '0 auto' }}>
          <input
            placeholder="DOT #"
            style={{
              padding: '12px 14px', background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
              color: 'var(--wc-white)', fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: 'none',
            }}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="email"
              placeholder="Email"
              style={{
                flex: 1, padding: '12px 14px', background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
                color: 'var(--wc-white)', fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: 'none',
              }}
            />
            <button style={{
              padding: '12px 18px', background: 'var(--wc-accent)', color: 'var(--wc-navy)',
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 800,
              border: 'none', borderRadius: 8, cursor: 'pointer', whiteSpace: 'nowrap',
            }}>
              Claim
            </button>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 10, color: 'var(--wc-gray)', textAlign: 'center', lineHeight: 1.5, marginBottom: 20 }}>
        No purchase or commitment required. Contact team@withcoverage.com with any questions.
      </div>

      {/* Trust */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 24,
        paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        {[
          { val: '$43M+', label: 'Raised' },
          { val: '500+', label: 'Clients' },
          { val: 'Sequoia', label: 'Backed' },
        ].map((t) => (
          <div key={t.label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 14, color: 'var(--wc-white)' }}>{t.val}</div>
            <div style={{ fontSize: 9, textTransform: 'uppercase' as const, letterSpacing: 1, color: 'var(--wc-gray)' }}>{t.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CarrierCheckLandingContent({ carrier }: { carrier: CarrierData }) {
  return (
    <div style={{ padding: '0 20px 36px', fontFamily: "'DM Sans', -apple-system, sans-serif", color: 'var(--wc-white)' }}>
      {/* Nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, marginBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="wc-logo" style={{ fontSize: 17, color: 'var(--wc-white)' }}>With<span>Coverage</span></div>
        <div style={{ fontSize: 10, color: 'var(--wc-gray)' }}>(800) 555-1234</div>
      </div>

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{
          display: 'inline-block', background: 'rgba(0,212,170,0.15)',
          border: '1px solid rgba(0,212,170,0.25)', color: 'var(--wc-accent)',
          fontSize: 10, fontWeight: 700, textTransform: 'uppercase' as const,
          letterSpacing: 1.5, padding: '5px 12px', borderRadius: 100, marginBottom: 16,
        }}>
          Fleet Report
        </div>
        <div style={{ fontWeight: 900, fontSize: 22, lineHeight: 1.15, marginBottom: 10, letterSpacing: -0.5 }}>
          Your fleet could be <em style={{ fontStyle: 'normal', color: 'var(--wc-accent)' }}>saving thousands</em>
        </div>
        <div style={{ color: 'var(--wc-gray)', fontSize: 13, lineHeight: 1.5 }}>
          We pulled your public FMCSA data to show how your coverage compares.
        </div>
      </div>

      {/* Carrier card */}
      <div style={{
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12, padding: 20, marginBottom: 16,
      }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{carrier.carrierName}</div>
        <div style={{ color: 'var(--wc-gray)', fontSize: 12, marginBottom: 16 }}>
          DOT #{carrier.dotNumber} · MC #{carrier.mcNumber}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[
            { val: String(carrier.powerUnits), label: 'Units' },
            { val: String(carrier.drivers), label: 'Drivers' },
            { val: carrier.authorityAge, label: 'Authority' },
            { val: carrier.homeState, label: 'State' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 18 }}>{s.val}</div>
              <div style={{ fontSize: 9, color: 'var(--wc-gray)', textTransform: 'uppercase' as const, letterSpacing: 0.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Savings */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(0,212,170,0.12) 0%, rgba(0,212,170,0.04) 100%)',
        border: '1px solid rgba(0,212,170,0.2)', borderRadius: 12, padding: 20, textAlign: 'center', marginBottom: 16,
      }}>
        <div style={{ color: 'var(--wc-accent)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 1.5, marginBottom: 8 }}>
          Estimated Annual Savings
        </div>
        <div style={{ fontWeight: 900, fontSize: 32, color: 'var(--wc-accent)', letterSpacing: -1.5 }}>
          $14,200 – $31,500
        </div>
        <div style={{ fontSize: 11, color: 'var(--wc-gray)', marginTop: 4 }}>
          for fleets with your profile and safety record
        </div>
      </div>

      {/* CTA */}
      <div style={{
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12, padding: 20, textAlign: 'center', marginBottom: 16,
      }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Get your quote in 24 hours</div>
        <div style={{ color: 'var(--wc-gray)', fontSize: 12, marginBottom: 16 }}>No obligation. Real numbers.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input placeholder="DOT #" style={{
            padding: '12px 14px', background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8,
            color: 'var(--wc-white)', fontFamily: "'DM Sans', sans-serif", fontSize: 13, outline: 'none',
          }} />
          <input placeholder="Email" style={{
            padding: '12px 14px', background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8,
            color: 'var(--wc-white)', fontFamily: "'DM Sans', sans-serif", fontSize: 13, outline: 'none',
          }} />
          <button style={{
            padding: '14px 20px', background: 'var(--wc-accent)', color: 'var(--wc-navy)',
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 800,
            border: 'none', borderRadius: 8, cursor: 'pointer',
          }}>
            Get My Quote →
          </button>
        </div>
      </div>
    </div>
  );
}
