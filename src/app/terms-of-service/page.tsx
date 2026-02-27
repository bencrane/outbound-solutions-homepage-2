import { Text, Stack, Section } from "@/components/ui";
import { tokens } from "@/lib/tokens";

export default function TermsOfService() {
  return (
    <div className="grid-background" style={{ minHeight: "100vh" }}>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `${tokens.spacing[5]} ${tokens.spacing[8]}`,
          background: tokens.colors.bg.primaryTranslucent,
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${tokens.colors.border.subtle}`,
        }}
      >
        <a href="/" style={{ textDecoration: "none" }}>
          <Stack direction="horizontal" gap={0}>
            <Text variant="label" color="primary" as="span" style={{ fontWeight: 700, fontSize: "13px" }}>
              OUTBOUND
            </Text>
            <Text variant="label" color="muted" as="span" style={{ fontSize: "13px" }}>
              SOLUTIONS
            </Text>
          </Stack>
        </a>
      </header>

      <Section contained padding={0} border={false} style={{ paddingTop: "140px", paddingBottom: "80px" }}>
        <Stack gap={8}>
          <Text variant="display" as="h1" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
            Terms of Service
          </Text>
          <Text variant="caption" color="muted">Last updated: February 26, 2026</Text>

          <Stack gap={6} style={{ maxWidth: "720px" }}>
            <LegalSection title="1. Agreement to Terms">
              By accessing or using the services provided by Rare Structure (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) through outboundsolutions.com (the &ldquo;Site&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Site or our services.
            </LegalSection>

            <LegalSection title="2. Description of Services">
              Outbound Solutions provides data pipeline, signal detection, and multi-channel outbound infrastructure services for B2B companies. Services include but are not limited to customer data enrichment, total addressable market analysis, signal monitoring, and automated outreach via email, direct mail, and social channels.
            </LegalSection>

            <LegalSection title="3. Eligibility">
              Our services are intended for businesses and their authorized representatives. By using our services, you represent that you have the authority to bind the entity on whose behalf you are acting.
            </LegalSection>

            <LegalSection title="4. Client Obligations">
              You agree to provide accurate information, comply with all applicable laws including CAN-SPAM, GDPR, and CCPA where applicable, and use our services only for lawful business purposes. You are responsible for ensuring that your outbound campaigns comply with applicable regulations.
            </LegalSection>

            <LegalSection title="5. Intellectual Property">
              All content, software, methodologies, and proprietary processes used in delivering our services remain the exclusive property of Rare Structure. You may not copy, modify, distribute, or reverse-engineer any part of our platform or deliverables without written consent.
            </LegalSection>

            <LegalSection title="6. Data Handling">
              We process data on your behalf to deliver our services. Our handling of personal data is governed by our Privacy Policy. You retain ownership of your customer data. We do not sell client data to third parties.
            </LegalSection>

            <LegalSection title="7. Confidentiality">
              Both parties agree to keep confidential any proprietary information shared during the engagement. This obligation survives termination of the agreement.
            </LegalSection>

            <LegalSection title="8. Limitation of Liability">
              To the maximum extent permitted by law, Rare Structure shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability shall not exceed the fees paid by you in the twelve months preceding the claim.
            </LegalSection>

            <LegalSection title="9. Termination">
              Either party may terminate the engagement with 30 days written notice. Upon termination, we will return or destroy your data as requested. Sections regarding confidentiality, intellectual property, and limitation of liability survive termination.
            </LegalSection>

            <LegalSection title="10. Governing Law">
              These terms are governed by the laws of the State of Delaware, without regard to conflict of law principles.
            </LegalSection>

            <LegalSection title="11. Changes to Terms">
              We may update these terms from time to time. Continued use of our services after changes constitutes acceptance of the revised terms.
            </LegalSection>

            <LegalSection title="12. Contact">
              For questions about these terms, contact us at team@outboundsolutions.com.
            </LegalSection>
          </Stack>
        </Stack>
      </Section>
    </div>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Stack gap={2}>
      <Text variant="title" as="h2" style={{ fontSize: "16px" }}>{title}</Text>
      <Text variant="body" color="secondary" style={{ fontSize: "14px", lineHeight: 1.7 }}>{children}</Text>
    </Stack>
  );
}
