Done. Here's the summary of what was built:
New shared components in /src/components/wc/:
Component	File	Purpose
DesignLabel	DesignLabel.tsx	Section label + italic annotation above each piece
PostcardFront	PostcardFront.tsx	6×9 postcard front — navy bg, gold accent, congrats headline
PostcardBack	PostcardBack.tsx	Postcard back — carrier box, gift card callout, QR/URL, mailing side
PhoneMockup	PhoneMockup.tsx	Phone frame wrapper (status bar + URL bar + children slot)
Envelope	LetterMailer.tsx	Windowed envelope with teaser, recipient, barcode
Letter	LetterMailer.tsx	Full letter — header, recipient, fleet data box, blurred savings, gift card CTA
PostcardLandingContent	LandingPageContent.tsx	Mobile landing for postcard campaign (congrats + gift card + email)
CarrierCheckLandingContent	LandingPageContent.tsx	Mobile landing for carrier check (savings estimate + quote form)
Barcode	Barcode.tsx	Reusable USPS-style barcode strip
Shared infrastructure:
types.ts — CarrierData interface + defaultCarrier sample data
wc.css — All styles consolidated with wc- prefix namespace (no conflicts with main site)
index.ts — Clean barrel export
Refactored pages:
/wc/campaign/a23b/ — Postcard Front → Postcard Back → Mobile Landing (unchanged design, now uses shared components)
/wc/campaign/b45c/ — Envelope → Letter Insert → Mobile Landing (previously just the carrier check page, now full lifecycle view)
Both old styles.css files deleted
b45c layout updated to load all required font weights (was missing JetBrains Mono + DM Sans 600/800)
To show a different carrier, just pass a different CarrierData object instead of defaultCarrier.