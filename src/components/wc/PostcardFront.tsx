import { CarrierData } from "./types";

export function PostcardFront({ carrier }: { carrier: CarrierData }) {
  return (
    <div className="wc-postcard wc-front">
      <div className="wc-front-inner">
        <div className="wc-front-top">
          <div className="wc-logo wc-front-logo">With<span>Coverage</span></div>
          <div className="wc-front-badge">★ Top 15% Safety</div>
        </div>

        <div className="wc-front-middle">
          <div className="wc-front-eyebrow">Congratulations, {carrier.carrierName.split(" ").slice(0, 3).join(" ")}</div>
          <div className="wc-front-headline">
            Your safety record puts you in the <span className="highlight">top 15%</span> of carriers your size.
          </div>
          <div className="wc-front-sub">
            In honor of your fleet&apos;s performance, <strong>dinner&apos;s on us:</strong>
          </div>
        </div>

        <div className="wc-front-bottom">
          <div className="wc-front-offer-row">
            <div className="wc-front-gift-teaser">
              <div className="wc-gift-emoji">🍴</div>
              <div className="wc-gift-teaser-text">
                <strong>$50 gift card</strong> to Maldaner&apos;s
              </div>
            </div>
            <div className="wc-front-url">
              <div className="url-text">withcoverage.com/<span className="dot-num">{carrier.dotNumber}</span></div>
              <div className="arrow">→</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
