import { Text, Button, Stack, Divider, Section, Card } from "@/components/ui";
import { SignalsTable } from "@/components/SignalsTable";
import { SignalCards } from "@/components/SignalCards";
import { PipelineAnimation } from "@/components/PipelineAnimation";
import { ChannelsSection } from "@/components/ChannelsSection";
import { FitCarousel } from "@/components/FitCarousel";
import { tokens } from "@/lib/tokens";

function Header() {
  return (
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
      <Stack direction="horizontal" gap={0}>
        <Text variant="label" color="primary" as="span" style={{ fontWeight: 700, fontSize: "13px" }}>
          OUTBOUND
        </Text>
        <Text variant="label" color="muted" as="span" style={{ fontSize: "13px" }}>
          SOLUTIONS
        </Text>
      </Stack>
      <div />
    </header>
  );
}

function HeroMetrics() {
  return (
    <div
      className="card-hover"
      style={{
        background: tokens.colors.bg.secondary,
        border: `1px solid ${tokens.colors.border.subtle}`,
        borderRadius: tokens.radii.lg,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: `${tokens.spacing[4]} ${tokens.spacing[5]}`,
          borderBottom: `1px solid ${tokens.colors.border.subtle}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="horizontal" gap={2} align="center">
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: tokens.colors.accent.success, boxShadow: `0 0 8px ${tokens.colors.accent.success}` }} />
          <Text variant="label" color="muted" style={{ fontSize: "11px" }}>CLIENT DASHBOARD</Text>
        </Stack>
        <Text variant="caption" color="muted" style={{ fontSize: "12px" }}>Last 90 days</Text>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ padding: `${tokens.spacing[8]} ${tokens.spacing[6]}`, borderBottom: `1px solid ${tokens.colors.border.subtle}`, borderRight: `1px solid ${tokens.colors.border.subtle}` }}>
          <Text variant="label" color="muted" style={{ fontSize: "11px", marginBottom: tokens.spacing[2] }}>REVENUE ATTRIBUTED</Text>
          <Text variant="display" as="div" style={{ fontSize: "36px", lineHeight: 1.1 }}>$184k</Text>
          <Text variant="caption" style={{ color: tokens.colors.accent.success, fontSize: "12px", marginTop: tokens.spacing[2] }}>+$62k this month</Text>
        </div>
        <div style={{ padding: `${tokens.spacing[8]} ${tokens.spacing[6]}`, borderBottom: `1px solid ${tokens.colors.border.subtle}` }}>
          <Text variant="label" color="muted" style={{ fontSize: "11px", marginBottom: tokens.spacing[2] }}>PIPELINE</Text>
          <Text variant="display" as="div" style={{ fontSize: "36px", lineHeight: 1.1 }}>$412k</Text>
          <Text variant="caption" color="muted" style={{ fontSize: "12px", marginTop: tokens.spacing[2] }}>18 deals open</Text>
        </div>
        <div style={{ padding: `${tokens.spacing[8]} ${tokens.spacing[6]}`, borderRight: `1px solid ${tokens.colors.border.subtle}` }}>
          <Text variant="label" color="muted" style={{ fontSize: "11px", marginBottom: tokens.spacing[2] }}>COST PER MEETING</Text>
          <Text variant="display" as="div" style={{ fontSize: "36px", lineHeight: 1.1 }}>$127</Text>
          <Text variant="caption" style={{ color: tokens.colors.accent.success, fontSize: "12px", marginTop: tokens.spacing[2] }}>&darr; from $203</Text>
        </div>
        <div style={{ padding: `${tokens.spacing[8]} ${tokens.spacing[6]}` }}>
          <Text variant="label" color="muted" style={{ fontSize: "11px", marginBottom: tokens.spacing[2] }}>MEETINGS ATTENDED</Text>
          <Text variant="display" as="div" style={{ fontSize: "36px", lineHeight: 1.1 }}>38</Text>
          <Text variant="caption" style={{ color: tokens.colors.accent.success, fontSize: "12px", marginTop: tokens.spacing[2] }}>14 this month</Text>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <Stack gap={3} style={{ marginBottom: tokens.spacing[8] }}>
      <Stack direction="horizontal" gap={4} align="center">
        <Divider orientation="horizontal" length="48px" color="default" />
        <Text variant="label" color="muted">{label}</Text>
      </Stack>
      <Text variant="headline" as="h2" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
        {title}
      </Text>
    </Stack>
  );
}

function HeroSection() {
  return (
    <Section
      contained
      padding={0}
      border={false}
      className="hero-section"
      style={{
        paddingTop: "180px",
        paddingBottom: "140px",
      }}
    >
      <div
        className="hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: tokens.spacing[12],
          alignItems: "center",
        }}
      >
        <Stack gap={8}>
          <Text variant="display" as="h1" style={{ fontSize: "clamp(48px, 6vw, 72px)" }}>
            GTM that{" "}<span style={{ color: tokens.colors.accent.success, whiteSpace: "nowrap" }}>gets results.</span>
          </Text>

          <Text variant="body" color="secondary" style={{ maxWidth: "480px", fontSize: "15px" }}>
            We build the data pipelines, signal detection, and sending infrastructure
            that turn outbound into a predictable revenue channel for your business.
          </Text>
          <div style={{ paddingTop: tokens.spacing[4] }}>
            <a href="mailto:team@outboundsolutions.com"><Button variant="primary" size="lg">REQUEST ACCESS</Button></a>
          </div>
        </Stack>

        <div className="hero-animation">
          <PipelineAnimation />
        </div>
      </div>
    </Section>
  );
}

/* Hidden for now
function ProblemSection() {
  return (
    <Section contained>
      <SectionHeader label="THE PROBLEM" title="Outbound is broken." />
      <Card>
        <Text
          variant="headline"
          as="p"
          style={{
            fontSize: "clamp(20px, 3vw, 28px)",
            lineHeight: 1.6,
          }}
        >
          <span style={{ color: tokens.colors.fg.primary }}>
            Most outbound is dead before a single message is sent. The list is wrong.
          </span>{" "}
          <span style={{ color: tokens.colors.fg.muted }}>
            Not because your team failed — because identifying who to reach and when to reach them is an engineering problem, and most companies try to solve it with headcount.
          </span>{" "}
          <span style={{ color: tokens.colors.fg.primary }}>
            We build the infrastructure that solves it at the system level.
          </span>
        </Text>
      </Card>
    </Section>
  );
}
*/

function RequirementsSection() {
  return (
    <Section contained>
      <Stack gap={3} style={{ marginBottom: tokens.spacing[8] }}>
        <Stack direction="horizontal" gap={4} align="center">
          <Divider orientation="horizontal" length="48px" color="default" />
          <Text variant="label" color="muted">THE FIT</Text>
        </Stack>
        <Text variant="headline" as="h2" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
          We work with <span style={{ color: tokens.colors.accent.success }}>growth-stage companies.</span>
        </Text>
        <Text variant="body" color="secondary" style={{ fontSize: "15px", marginTop: tokens.spacing[2] }}>
          If this sounds like your business, we should talk.
        </Text>
      </Stack>
      <FitCarousel />
    </Section>
  );
}

function InsightSection() {
  const enrichedCustomers = [
    {
      name: "Meridian Logistics",
      domain: "meridianlogistics.com",
      attributes: [
        { label: "Buyer Title", value: "VP of Operations" },
        { label: "Headcount", value: "127 employees" },
        { label: "Tech Stack", value: "Salesforce, NetSuite" },
        { label: "Recent Signal", value: "UCC-1 filed — $180K equipment" },
      ],
    },
    {
      name: "Apex Industrial",
      domain: "apexindustrial.io",
      attributes: [
        { label: "Buyer Title", value: "Director of Procurement" },
        { label: "Headcount", value: "89 employees" },
        { label: "Tech Stack", value: "HubSpot, QuickBooks" },
        { label: "Recent Signal", value: "Commercial build permit filed" },
      ],
    },
    {
      name: "Northline Supply",
      domain: "northlinesupply.com",
      attributes: [
        { label: "Buyer Title", value: "COO" },
        { label: "Headcount", value: "203 employees" },
        { label: "Tech Stack", value: "Dynamics 365" },
        { label: "Recent Signal", value: "New VP Ops hired 3 weeks ago" },
      ],
    },
  ];

  return (
    <Section contained>
      <Stack gap={3} style={{ marginBottom: tokens.spacing[8] }}>
        <Stack direction="horizontal" gap={4} align="center">
          <Divider orientation="horizontal" length="48px" color="default" />
          <Text variant="label" color="muted">THE INSIGHT</Text>
        </Stack>
        <Text variant="headline" as="h2" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
          We start with your <span style={{ color: tokens.colors.accent.success }}>best-fit customers.</span>
        </Text>
      </Stack>
      <Text variant="body" color="secondary" style={{ maxWidth: "600px", fontSize: "15px", marginBottom: tokens.spacing[8], marginTop: `-${tokens.spacing[4]}` }}>
        Most outbound starts with a purchased list. We start with your actual customers — enriched to reveal what made them buy.
      </Text>

      <div
        className="insight-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: tokens.spacing[4],
        }}
      >
        {enrichedCustomers.map((customer) => (
          <Card key={customer.name} padding="md">
            <Stack gap={4}>
              <div>
                <Text variant="title" as="div" style={{ fontSize: "15px", marginBottom: "2px" }}>
                  {customer.name}
                </Text>
                <Text variant="caption" color="muted" style={{ fontSize: "12px", fontFamily: tokens.typography.fonts.mono }}>
                  {customer.domain}
                </Text>
              </div>
              <div
                style={{
                  borderTop: `1px solid ${tokens.colors.border.subtle}`,
                  paddingTop: tokens.spacing[3],
                }}
              >
                <Stack gap={2}>
                  {customer.attributes.map((attr) => (
                    <div key={attr.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <Text variant="caption" color="muted" style={{ fontSize: "11px" }}>
                        {attr.label}
                      </Text>
                      <Text variant="body" style={{ fontSize: "12px", textAlign: "right" }}>
                        {attr.value}
                      </Text>
                    </div>
                  ))}
                </Stack>
              </div>
            </Stack>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function MethodSection() {
  const stages = [
    {
      num: "01",
      title: "Enrich Your Customer Data",
      description: "We take your existing customers and enrich every record — job titles, tenure, company size, industry, location. Your actual buyers become the foundation.",
    },
    {
      num: "02",
      title: "Analyze for Patterns",
      description: "AI analyzes your enriched customer list to find what your best buyers have in common — titles, industries, company profiles, and the outliers that matter.",
    },
    {
      num: "03",
      title: "Pull the Full Universe",
      description: "We pull every company that matches your criteria — even weird outlier industries. Data is cheap. We cast a wide net and filter down.",
    },
    {
      num: "04",
      title: "Score Every Company",
      description: "Each company is AI-scored against your actual customers as ground truth. If a real customer would fail the filter, the filter is wrong.",
    },
    {
      num: "05",
      title: "Build Your TAM",
      description: "You get a clean list of companies that genuinely fit — scored, ranked, and ready. Not 100% coverage with garbage. 80% coverage with quality.",
    },
  ];

  return (
    <Section contained>
      <Stack gap={3} style={{ marginBottom: tokens.spacing[8] }}>
        <Stack direction="horizontal" gap={4} align="center">
          <Divider orientation="horizontal" length="48px" color="default" />
          <Text variant="label" color="muted">THE METHOD</Text>
        </Stack>
        <Text variant="headline" as="h2" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
          We map your <span style={{ color: tokens.colors.accent.success }}>total addressable market.</span>
        </Text>
      </Stack>
      <Text variant="body" color="secondary" style={{ maxWidth: "600px", fontSize: "15px", marginBottom: tokens.spacing[8], marginTop: `-${tokens.spacing[4]}` }}>
        Your actual customers tell us who else to reach. We enrich, analyze, and build your TAM from the ground up.
      </Text>

      <div style={{ position: "relative" }}>
        {/* Connecting line */}
        <div
          style={{
            position: "absolute",
            left: "19px",
            top: "40px",
            bottom: "40px",
            width: "2px",
            background: `linear-gradient(to bottom, ${tokens.colors.border.subtle}, ${tokens.colors.accent.primary}40, ${tokens.colors.border.subtle})`,
          }}
        />

        <Stack gap={4}>
          {stages.map((stage, i) => (
            <div
              key={stage.num}
              style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr",
                gap: tokens.spacing[5],
                alignItems: "flex-start",
              }}
            >
              {/* Number node */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: tokens.colors.bg.elevated,
                  border: `1px solid ${tokens.colors.border.default}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: i === stages.length - 1 ? tokens.colors.accent.primary : tokens.colors.fg.muted,
                  fontFamily: tokens.typography.fonts.mono,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {stage.num}
              </div>

              {/* Content */}
              <Card padding="md" style={{ flex: 1 }}>
                <Stack gap={2}>
                  <Text variant="title" as="h3" style={{ fontSize: "17px" }}>{stage.title}</Text>
                  <Text variant="body" color="secondary" style={{ fontSize: "14px", lineHeight: 1.6 }}>{stage.description}</Text>
                </Stack>
              </Card>
            </div>
          ))}
        </Stack>
      </div>
    </Section>
  );
}

/* Hidden for now - keeping the old version
function HowItWorksSection() {
  const steps = [
    { num: "01", title: "Signal Detection", description: "We build custom data pipelines that monitor public and proprietary sources for buying signals specific to your vertical." },
    { num: "02", title: "Qualification", description: "Signals are scored, enriched, and filtered so only high-intent prospects enter your pipeline." },
    { num: "03", title: "Multi-Channel Outreach", description: "Email, LinkedIn, and direct mail sequences are triggered automatically based on signal type and timing." },
    { num: "04", title: "Meetings & Revenue", description: "You get booked meetings with qualified prospects. We measure everything back to pipeline and revenue." },
  ];

  return (
    <Section contained>
      <SectionHeader label="HOW WE WORK" title="Signals in, revenue out." />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: tokens.spacing[4],
        }}
      >
        {steps.map((step) => (
          <Card key={step.num} padding="md">
            <Stack gap={3}>
              <Text variant="label" color="muted" style={{ fontSize: "11px" }}>{step.num}</Text>
              <Text variant="title" as="h3">{step.title}</Text>
              <Text variant="body" color="secondary" style={{ fontSize: "14px" }}>{step.description}</Text>
            </Stack>
          </Card>
        ))}
      </div>
    </Section>
  );
}
*/

function ImpactSection() {
  return (
    <Section contained>
      <Stack gap={3} style={{ marginBottom: tokens.spacing[8] }}>
        <Stack direction="horizontal" gap={4} align="center">
          <Divider orientation="horizontal" length="48px" color="default" />
          <Text variant="label" color="muted">THE RESULTS</Text>
        </Stack>
        <Text variant="headline" as="h2" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
          We deliver <span style={{ color: tokens.colors.accent.success }}>revenue impact.</span>
        </Text>
      </Stack>
      <Stack gap={6}>
        <Text variant="body" color="secondary" style={{ maxWidth: "520px", fontSize: "15px" }}>
          Every client gets a live dashboard. Revenue attributed, meetings booked, cost per meeting, pipeline generated.
        </Text>
        <HeroMetrics />
      </Stack>
    </Section>
  );
}

function SignalsSection() {
  return (
    <Section contained id="signals">
      <Stack gap={3} style={{ marginBottom: tokens.spacing[8] }}>
        <Stack direction="horizontal" gap={4} align="center">
          <Divider orientation="horizontal" length="48px" color="default" />
          <Text variant="label" color="muted">THE ENGINE</Text>
        </Stack>
        <Text variant="headline" as="h2" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
          We detect the <span style={{ color: tokens.colors.accent.success }}>signals that matter.</span>
        </Text>
      </Stack>
      <Text variant="body" color="secondary" style={{ maxWidth: "600px", fontSize: "15px", marginBottom: tokens.spacing[8], marginTop: `-${tokens.spacing[4]}` }}>
        We monitor public data for behavioral inflection points — moments when circumstances change faster than vendor relationships.
      </Text>
      <SignalsTable />
    </Section>
  );
}

function SignalCardsSection() {
  return (
    <Section contained id="signals-v2">
      <Stack gap={3} style={{ marginBottom: tokens.spacing[8] }}>
        <Stack direction="horizontal" gap={4} align="center">
          <Divider orientation="horizontal" length="48px" color="default" />
          <Text variant="label" color="muted">THE ENGINE</Text>
        </Stack>
        <Text variant="headline" as="h2" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
          We detect the signals that matter.
        </Text>
        <Text variant="body" color="secondary" style={{ maxWidth: "640px", fontSize: "15px", marginTop: tokens.spacing[2] }}>
          We monitor public data for behavioral inflection points — moments when a company&#39;s
          circumstances change faster than their vendor relationships.
        </Text>
      </Stack>
      <SignalCards />
    </Section>
  );
}

function CTASection() {
  return (
    <Section contained>
      <Card style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }} padding="md">
        <Stack gap={4} align="center">
          <Text
            variant="headline"
            as="h2"
            style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
          >
            We look forward to <span style={{ color: tokens.colors.accent.success }}>hearing from you.</span>
          </Text>
          <Text variant="body" color="muted" style={{ maxWidth: "480px" }}>
            Let&#39;s get results.
          </Text>
          <a href="mailto:team@outboundsolutions.com"><Button variant="primary" size="lg">REQUEST ACCESS</Button></a>
        </Stack>
      </Card>
    </Section>
  );
}

function Footer() {
  return (
    <footer
      className="section-container"
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        paddingTop: tokens.spacing[8],
        paddingBottom: tokens.spacing[10],
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <a href="/terms-of-service" style={{ textDecoration: "none", flex: 1 }}>
        <Text variant="caption" color="muted" style={{ fontSize: "12px" }}>Terms of Service</Text>
      </a>
      <Text variant="caption" color="muted" style={{ fontSize: "12px", textAlign: "center", flex: 1 }}>
        &copy; Rare Structure. All Rights Reserved 2026
      </Text>
      <a href="/privacy-policy" style={{ textDecoration: "none", flex: 1, textAlign: "right" }}>
        <Text variant="caption" color="muted" style={{ fontSize: "12px" }}>Privacy Policy</Text>
      </a>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="grid-background" style={{ minHeight: "100vh" }}>
      <Header />
      <main>
        <HeroSection />
        <InsightSection />
        <MethodSection />
        <SignalsSection />
        <ChannelsSection />
        {/* <SignalCardsSection /> */}
        <ImpactSection />
        <RequirementsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
