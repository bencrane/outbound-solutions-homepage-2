<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Lumos AI - Direct Mail Postcard Mockup</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    background: #1a1a1a;
    font-family: 'DM Sans', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    gap: 60px;
    min-height: 100vh;
  }

  .label {
    color: #666;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 8px;
    font-weight: 500;
  }

  .sublabel {
    color: #555;
    font-size: 12px;
    font-style: italic;
    margin-bottom: 16px;
  }

  /* Postcard dimensions: 6x9 ratio */
  .postcard {
    width: 720px;
    height: 480px;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  }

  /* ========== FRONT ========== */
  .front {
    background: linear-gradient(135deg, #0a0f1a 0%, #0d1929 40%, #0a1628 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 44px 48px;
    position: relative;
  }

  .front::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .front::after {
    content: '';
    position: absolute;
    bottom: -50px;
    left: -50px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .front-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    z-index: 1;
  }

  .lumos-logo {
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.5px;
  }

  .lumos-logo span {
    color: #3b82f6;
  }

  .badge {
    background: rgba(16, 185, 129, 0.12);
    border: 1px solid rgba(16, 185, 129, 0.25);
    color: #10b981;
    font-size: 11px;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 100px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .front-center {
    position: relative;
    z-index: 1;
  }

  .headline {
    font-family: 'Instrument Serif', serif;
    font-size: 42px;
    color: #fff;
    line-height: 1.15;
    margin-bottom: 16px;
    max-width: 520px;
  }

  .headline em {
    color: #f59e0b;
    font-style: italic;
  }

  .money-figure {
    display: inline-flex;
    align-items: baseline;
    gap: 4px;
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05));
    border: 1px solid rgba(245, 158, 11, 0.2);
    padding: 6px 16px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .money-figure .dollar {
    font-size: 24px;
    color: #f59e0b;
    font-weight: 700;
  }

  .money-figure .amount {
    font-family: 'Instrument Serif', serif;
    font-size: 38px;
    color: #f59e0b;
    letter-spacing: 3px;
  }

  .money-figure .per {
    font-size: 14px;
    color: #f59e0b;
    opacity: 0.7;
  }

  .subtext {
    color: #94a3b8;
    font-size: 15px;
    line-height: 1.5;
    max-width: 440px;
  }

  .front-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
    z-index: 1;
  }

  .cta-box {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .cta-url {
    background: #3b82f6;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    padding: 12px 24px;
    border-radius: 8px;
    letter-spacing: 0.3px;
  }

  .cta-arrow {
    color: #3b82f6;
    font-size: 20px;
  }

  .prize-callout {
    text-align: right;
  }

  .prize-callout .win {
    color: #10b981;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 2px;
  }

  .prize-callout .amount-text {
    color: #fff;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -1px;
  }

  .prize-callout .everyone {
    color: #64748b;
    font-size: 11px;
    margin-top: 2px;
  }

  /* ========== BACK ========== */
  .back {
    background: #fafaf9;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
  }

  .back-left {
    padding: 36px 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px dashed #d4d4d4;
  }

  .back-right {
    padding: 36px 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .back-logo {
    font-size: 16px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 20px;
  }

  .back-logo span {
    color: #3b82f6;
  }

  .back-headline {
    font-family: 'Instrument Serif', serif;
    font-size: 22px;
    color: #0f172a;
    line-height: 1.3;
    margin-bottom: 16px;
  }

  .back-body {
    color: #475569;
    font-size: 13px;
    line-height: 1.65;
    margin-bottom: 20px;
  }

  .stats-row {
    display: flex;
    gap: 24px;
    margin-bottom: 20px;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
  }

  .stat-value {
    font-size: 22px;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.5px;
  }

  .stat-label {
    font-size: 10px;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-top: 2px;
  }

  .back-cta {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .back-cta-btn {
    background: #0f172a;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 6px;
  }

  .back-cta-text {
    color: #94a3b8;
    font-size: 11px;
  }

  /* Right side - address area */
  .postage-area {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 24px;
  }

  .stamp {
    width: 64px;
    height: 72px;
    border: 2px solid #d4d4d4;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    line-height: 1.3;
  }

  .recipient-block {
    margin-top: auto;
    padding-top: 40px;
  }

  .recipient-name {
    font-size: 15px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 4px;
  }

  .recipient-title {
    font-size: 12px;
    color: #64748b;
    margin-bottom: 12px;
  }

  .recipient-company {
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 2px;
  }

  .recipient-address {
    font-size: 12px;
    color: #64748b;
    line-height: 1.5;
  }

  .personalization-tag {
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.25);
    color: #b45309;
    font-size: 10px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 4px;
    display: inline-block;
    margin-bottom: 16px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .fine-print {
    font-size: 9px;
    color: #94a3b8;
    line-height: 1.5;
    margin-top: auto;
    padding-top: 12px;
  }

  .divider {
    width: 40px;
    height: 2px;
    background: #e2e8f0;
    margin: 12px 0;
  }

  .section-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
</head>
<body>

<!-- FRONT -->
<div class="section-wrap">
  <div class="label">Postcard Front (6×9)</div>
  <div class="sublabel">The hook — gamified, feels like recognition, not a sales pitch.</div>
  <div class="postcard front">
    <div class="front-top">
      <div class="lumos-logo">lumos<span>.ai</span></div>
      <div class="badge">★ Top Performer</div>
    </div>

    <div class="front-center">
      <div class="headline">Late payments are costing<br>you <em>how much?</em></div>
      <div class="money-figure">
        <span class="dollar">$</span>
        <span class="amount">■■,■■■</span>
        <span class="per">/yr</span>
      </div>
      <div class="subtext">
        We analyzed your public filings and industry benchmarks.<br>
        Guess your number — closest estimate wins up to $500.
      </div>
    </div>

    <div class="front-bottom">
      <div class="cta-box">
        <div class="cta-url">lumos.ai/reveal</div>
        <span class="cta-arrow">→</span>
      </div>
      <div class="prize-callout">
        <div class="win">Win up to</div>
        <div class="amount-text">$500</div>
        <div class="everyone">Everyone wins something</div>
      </div>
    </div>
  </div>
</div>

<!-- BACK -->
<div class="section-wrap">
  <div class="label">Postcard Back (6×9)</div>
  <div class="sublabel">Personalized data + CTA. Clean, not salesy.</div>
  <div class="postcard back">
    <div class="back-left">
      <div>
        <div class="back-logo">lumos<span>.ai</span></div>
        <div class="personalization-tag">Personalized for your company</div>
        <div class="back-headline">Your collections data suggests you're leaving money on the table.</div>
        <div class="back-body">
          We reviewed public financial signals and compared your payment cycle 
          against 2,400+ companies of similar size in your industry. Based on your 
          revenue profile and sector benchmarks, we've estimated what late payments 
          may be costing your business annually.
        </div>
      </div>

      <div>
        <div class="stats-row">
          <div class="stat-item">
            <div class="stat-value">$14.2M</div>
            <div class="stat-label">Est. Annual Revenue</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">52 days</div>
            <div class="stat-label">Industry Avg DSO</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">IL</div>
            <div class="stat-label">Home State</div>
          </div>
        </div>

        <div class="back-cta">
          <div class="back-cta-btn">lumos.ai/reveal</div>
          <div class="back-cta-text">Guess your number →<br>Everyone wins a gift.</div>
        </div>

        <div class="fine-print">
          No purchase necessary. Estimated data based on public records and industry benchmarks. 
          All participants receive a minimum $10 digital gift card upon submission. 
          See lumos.ai/reveal/rules for full terms.
        </div>
      </div>
    </div>

    <div class="back-right">
      <div class="postage-area">
        <div class="stamp">First<br>Class<br>Postage</div>
      </div>

      <div class="recipient-block">
        <div class="recipient-name">Sarah Mitchell</div>
        <div class="recipient-title">VP of Finance</div>
        <div class="divider"></div>
        <div class="recipient-company">Midwest Logistics Group</div>
        <div class="recipient-address">
          3847 Commerce Drive<br>
          Springfield, IL 62704
        </div>
      </div>
    </div>
  </div>
</div>

</body>
</html>