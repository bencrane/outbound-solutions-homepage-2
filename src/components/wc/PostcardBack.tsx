import { CarrierData } from "./types";
import { Barcode } from "./Barcode";

export function PostcardBack({ carrier }: { carrier: CarrierData }) {
  const { address } = carrier;

  return (
    <div className="wc-postcard wc-back">
      <div className="wc-back-left">
        <div>
          <div className="wc-logo wc-back-logo">With<span>Coverage</span></div>

          <div className="wc-back-carrier-box">
            <div className="wc-back-carrier-label">Your Fleet</div>
            <div className="wc-back-carrier-name">{carrier.carrierName}</div>
            <div className="wc-back-carrier-details">
              DOT #{carrier.dotNumber} &nbsp;·&nbsp; MC #{carrier.mcNumber}<br/>
              {carrier.powerUnits} Power Units &nbsp;·&nbsp; {carrier.drivers} Drivers &nbsp;·&nbsp; {address.city}, {address.state}
            </div>
          </div>

          <div className="wc-back-body">
            We reviewed public FMCSA data for <strong>2,400+ carriers with 15–30 power units</strong> in the Midwest. Your fleet&apos;s safety record and compliance history rank in the <strong>top 15%</strong>.<br/><br/>
            Carriers with your profile often qualify for <strong>preferred commercial coverage rates</strong> — but most never find out. We think that&apos;s worth celebrating.
          </div>

          <div className="wc-back-gift-box">
            <div className="wc-back-gift-icon">🎁</div>
            <div className="wc-back-gift-content">
              <div className="wc-back-gift-text">
                <strong>Claim your $50 gift card to Maldaner&apos;s.</strong><br/>
                Enter your email at the link below. No strings — just a thank you for running a safe fleet.
              </div>
              <div className="wc-back-gift-url">{carrier.personalizedUrl}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="wc-back-right">
        <div>
          <div className="wc-return-address">
            WithCoverage, Inc.<br/>
            15 W 26th St, Floor 4<br/>
            New York, NY 10010
          </div>
        </div>

        <div className="wc-mailing-address">
          <div className="name">{carrier.carrierName}</div>
          {address.street}<br/>
          {address.city}, {address.state} {address.zip}
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:'12px', alignItems:'flex-end'}}>
          <div className="wc-postage-area">Postage</div>
          <Barcode />
        </div>
      </div>
    </div>
  );
}
