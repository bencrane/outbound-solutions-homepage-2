import { CarrierData } from "./types";
import { Barcode } from "./Barcode";

export function Envelope({ carrier }: { carrier: CarrierData }) {
  const { address } = carrier;

  return (
    <div className="wc-envelope">
      <div className="wc-env-return">
        <div className="env-brand">WithCoverage, Inc.</div>
        15 W 26th St, Floor 4<br/>
        New York, NY 10010
      </div>

      <div className="wc-env-postage">Presort<br/>Std</div>

      <div className="wc-env-teaser">
        Coverage review enclosed for<br/>
        <em>DOT #{carrier.dotNumber}</em>
      </div>

      <div className="wc-env-window">
        <div className="recipient-name">{carrier.carrierName}</div>
        <div className="recipient-detail">
          {address.street}<br/>
          {address.city}, {address.state} {address.zip}
        </div>
        <div className="recipient-dot">DOT #{carrier.dotNumber} &nbsp;·&nbsp; MC #{carrier.mcNumber}</div>
      </div>

      <Barcode className="wc-env-barcode" />
    </div>
  );
}

export function Letter({ carrier }: { carrier: CarrierData }) {
  const { address } = carrier;

  return (
    <div className="wc-letter">
      <div className="wc-letter-header">
        <div className="wc-logo wc-letter-logo">With<span>Coverage</span></div>
        <div className="wc-letter-header-right">
          WithCoverage, Inc.<br/>
          15 W 26th St, Floor 4<br/>
          New York, NY 10010<br/>
          withcoverage.com
        </div>
      </div>

      <div className="wc-letter-recipient">
        <div className="to-label">Prepared For</div>
        <div className="to-company">{carrier.carrierName}</div>
        <div className="to-address">
          {address.street}<br/>
          {address.city}, {address.state} {address.zip}
        </div>
        <div className="to-dot">DOT #{carrier.dotNumber} &nbsp;·&nbsp; MC #{carrier.mcNumber}</div>
      </div>

      <div className="wc-letter-subject">
        <div className="subject-label">Re</div>
        Commercial Coverage Review — DOT #{carrier.dotNumber}
      </div>

      <div className="wc-letter-body">
        <p>We reviewed your public carrier record filed with the Federal Motor Carrier Safety Administration and compared your fleet profile against <strong>2,400+ carriers of similar size</strong> in the Midwest region.</p>
        <p>Based on your authority type, fleet size, and safety record — we&apos;ve calculated an <strong>estimated annual savings</strong> specific to your fleet. Here&apos;s what we can share:</p>
      </div>

      <div className="wc-letter-data-box">
        <div className="wc-ldb-header">Your Fleet Profile — FMCSA Public Record</div>
        <div className="wc-ldb-grid">
          <div className="wc-ldb-stat">
            <div className="wc-ldb-stat-val">{carrier.powerUnits}</div>
            <div className="wc-ldb-stat-label">Power Units</div>
          </div>
          <div className="wc-ldb-stat">
            <div className="wc-ldb-stat-val">{carrier.drivers}</div>
            <div className="wc-ldb-stat-label">Drivers</div>
          </div>
          <div className="wc-ldb-stat">
            <div className="wc-ldb-stat-val">{carrier.authorityAge}</div>
            <div className="wc-ldb-stat-label">Authority Age</div>
          </div>
          <div className="wc-ldb-stat">
            <div className="wc-ldb-stat-val">{carrier.homeState}</div>
            <div className="wc-ldb-stat-label">Home State</div>
          </div>
        </div>
        <div className="wc-ldb-divider" />

        <div className="wc-ldb-savings">
          <div className="wc-ldb-savings-label">Your Estimated Annual Savings</div>
          <div className="wc-ldb-hidden-amount">
            <span className="wc-ldb-dollar">$</span>
            <span className="wc-ldb-blur">18,400</span>
            <span className="wc-ldb-suffix">/yr</span>
          </div>
        </div>

        <div className="wc-ldb-cta">
          <div className="wc-ldb-cta-label">Reveal your savings, and see if you qualify for a free growth consultation:</div>
          <div className="wc-ldb-cta-url">{carrier.personalizedUrl}</div>
        </div>
      </div>

      <div className="wc-letter-signature">The WithCoverage Team</div>
      <div className="wc-letter-sig-title">AI-Powered Risk Management &nbsp;·&nbsp; Backed by Sequoia, 8VC &amp; Khosla</div>

      <div className="wc-letter-footer">
        WithCoverage, Inc. &nbsp;·&nbsp; 15 W 26th St, Floor 4, New York, NY 10010 &nbsp;·&nbsp; withcoverage.com<br/>
        This letter references publicly available data from the FMCSA Safety and Fitness Electronic Records (SAFER) system.<br/>
        Gift card offer valid for fleet operators who complete a coverage review by [date]. One per company. No purchase necessary.
      </div>
    </div>
  );
}
