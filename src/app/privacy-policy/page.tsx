import { Text, Stack, Section } from "@/components/ui";
import { tokens } from "@/lib/tokens";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </Text>
          <Text variant="caption" color="muted">Last updated: February 26, 2026</Text>

          <Stack gap={6} style={{ maxWidth: "720px" }}>
            <LegalSection title="1. Introduction">
              Rare Structure (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates outboundsolutions.com. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </LegalSection>

            <LegalSection title="2. Information We Collect">
              We may collect information you provide directly, such as your name, email address, company name, and job title when you request access or contact us. We also collect usage data automatically, including IP address, browser type, pages visited, and time spent on the site through standard analytics tools.
            </LegalSection>

            <LegalSection title="3. Client Data">
              In the course of delivering our services, we process business data on behalf of our clients, including company records, contact information, and publicly available signals data. This data is processed solely to deliver contracted services and is not used for any other purpose.
            </LegalSection>

            <LegalSection title="4. How We Use Your Information">
              We use collected information to provide and improve our services, respond to inquiries, send relevant communications about our services, analyze site usage to improve the user experience, and comply with legal obligations.
            </LegalSection>

            <LegalSection title="5. Data Sharing">
              We do not sell personal information. We may share data with service providers who assist in delivering our services (e.g., hosting, analytics), and when required by law or to protect our rights. All service providers are bound by confidentiality obligations.
            </LegalSection>

            <LegalSection title="6. Data Security">
              We implement industry-standard security measures to protect your data, including encryption in transit and at rest, access controls, and regular security assessments. However, no method of transmission over the Internet is 100% secure.
            </LegalSection>

            <LegalSection title="7. Data Retention">
              We retain personal data only as long as necessary to fulfill the purposes for which it was collected, or as required by law. Client data is retained for the duration of the engagement and deleted or returned upon termination per our Terms of Service.
            </LegalSection>

            <LegalSection title="8. Your Rights">
              Depending on your jurisdiction, you may have the right to access, correct, delete, or port your personal data, opt out of marketing communications, and request information about our data practices. To exercise these rights, contact us at team@outboundsolutions.com.
            </LegalSection>

            <LegalSection title="9. Cookies">
              We use essential cookies to ensure the site functions properly and analytics cookies to understand how visitors interact with the site. You can control cookie preferences through your browser settings.
            </LegalSection>

            <LegalSection title="10. Third-Party Links">
              Our site may contain links to third-party websites. We are not responsible for the privacy practices of those sites.
            </LegalSection>

            <LegalSection title="11. Children&rsquo;s Privacy">
              Our services are not directed to individuals under 18. We do not knowingly collect personal information from children.
            </LegalSection>

            <LegalSection title="12. Changes to This Policy">
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page with a revised &ldquo;Last updated&rdquo; date.
            </LegalSection>

            <LegalSection title="13. Contact">
              For questions about this Privacy Policy, contact us at team@outboundsolutions.com.
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
