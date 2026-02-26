import { Text, Button, Stack, Divider, Section, Card } from "@/components/ui";
import { SignalsTable } from "@/components/SignalsTable";
import { SignalCards } from "@/components/SignalCards";
import { PipelineAnimation } from "@/components/PipelineAnimation";
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
          <Text variant="label" color="muted" style={{ fontSize: "11px" }}>ACTIVE ENGAGEMENT</Text>
        </Stack>
        <Text variant="caption" color="muted" style={{ fontSize: "12px" }}>Last 90 days</Text>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ padding: tokens.spacing[5], borderBottom: `1px solid ${tokens.colors.border.subtle}`, borderRight: `1px solid ${tokens.colors.border.subtle}` }}>
          <Text variant="label" color="muted" style={{ fontSize: "11px", marginBottom: tokens.spacing[2] }}>REVENUE ATTRIBUTED</Text>
          <Text variant="display" as="div" style={{ fontSize: "36px", lineHeight: 1.1 }}>$184k</Text>
          <Text variant="caption" style={{ color: tokens.colors.accent.success, fontSize: "12px", marginTop: tokens.spacing[1] }}>+$62k this month</Text>
        </div>
        <div style={{ padding: tokens.spacing[5], borderBottom: `1px solid ${tokens.colors.border.subtle}` }}>
          <Text variant="label" color="muted" style={{ fontSize: "11px", marginBottom: tokens.spacing[2] }}>MEETINGS ATTENDED</Text>
          <Text variant="display" as="div" style={{ fontSize: "36px", lineHeight: 1.1 }}>38</Text>
          <Text variant="caption" style={{ color: tokens.colors.accent.success, fontSize: "12px", marginTop: tokens.spacing[1] }}>14 this month</Text>
        </div>
        <div style={{ padding: tokens.spacing[5], borderRight: `1px solid ${tokens.colors.border.subtle}` }}>
          <Text variant="label" color="muted" style={{ fontSize: "11px", marginBottom: tokens.spacing[2] }}>COST PER MEETING</Text>
          <Text variant="display" as="div" style={{ fontSize: "36px", lineHeight: 1.1 }}>$127</Text>
          <Text variant="caption" style={{ color: tokens.colors.accent.success, fontSize: "12px", marginTop: tokens.spacing[1] }}>&darr; from $203</Text>
        </div>
        <div style={{ padding: tokens.spacing[5] }}>
          <Text variant="label" color="muted" style={{ fontSize: "11px", marginBottom: tokens.spacing[2] }}>PIPELINE</Text>
          <Text variant="display" as="div" style={{ fontSize: "36px", lineHeight: 1.1 }}>$412k</Text>
          <Text variant="caption" color="muted" style={{ fontSize: "12px", marginTop: tokens.spacing[1] }}>18 deals open</Text>
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
      style={{
        paddingTop: "180px",
        paddingBottom: "140px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: tokens.spacing[12],
          alignItems: "center",
        }}
      >
        <Stack gap={8}>
          <Text variant="display" as="h1" style={{ fontSize: "clamp(48px, 6vw, 72px)" }}>
            GTM that gets results.
          </Text>

          <Text variant="body" color="secondary" style={{ maxWidth: "480px", fontSize: "15px" }}>
            We build the data pipelines, signal detection, and sending infrastructure
            that turn outbound into a predictable channel.
          </Text>

          <div style={{ paddingTop: tokens.spacing[4] }}>
            <Button variant="primary" size="lg">REQUEST ACCESS</Button>
          </div>
        </Stack>

        <PipelineAnimation />
      </div>
    </Section>
  );
}

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

function WhoWeWorkWithSection() {
  const criteria = [
    { label: "$3M+", description: "Revenue" },
    { label: "5+", description: "Sales team" },
    { label: "B2B", description: "Business model" },
    { label: "$30K+", description: "ACV" },
  ];

  return (
    <Section contained>
      <SectionHeader label="WHO WE WORK WITH" title="Built for teams ready to scale." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: tokens.spacing[4] }}>
        {criteria.map((item) => (
          <Card key={item.label} padding="md">
            <Stack gap={2}>
              <Text variant="display" as="div" style={{ fontSize: "32px", lineHeight: 1.1 }}>{item.label}</Text>
              <Text variant="caption" color="muted">{item.description}</Text>
            </Stack>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function HowItWorksSection() {
  const steps = [
    { num: "01", title: "Signal Detection", description: "We build custom data pipelines that monitor public and proprietary sources for buying signals specific to your vertical." },
    { num: "02", title: "Qualification", description: "Signals are scored, enriched, and filtered so only high-intent prospects enter your pipeline." },
    { num: "03", title: "Multi-Channel Outreach", description: "Email, LinkedIn, and direct mail sequences are triggered automatically based on signal type and timing." },
    { num: "04", title: "Meetings & Revenue", description: "You get booked meetings with qualified prospects. We measure everything back to pipeline and revenue." },
  ];

  return (
    <Section contained>
      <SectionHeader label="HOW IT WORKS" title="Signals in, revenue out." />
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

function HowWeWorkSection() {
  return (
    <Section contained>
      <SectionHeader label="HOW WE WORK" title="Full visibility. No black box." />
      <Stack gap={6}>
        <Text variant="body" color="secondary" style={{ maxWidth: "560px", fontSize: "15px" }}>
          Every client gets a live dashboard tracking the metrics that matter —
          revenue attributed, meetings booked, cost per meeting, and pipeline generated.
          You see exactly what&#39;s working and what we&#39;re doing about what isn&#39;t.
        </Text>
        <HeroMetrics />
      </Stack>
    </Section>
  );
}

function SignalsSection() {
  return (
    <Section contained id="signals">
      <SectionHeader label="THE ENGINE" title="Signals that produce pipeline." />
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
          <Text variant="label" color="muted">THE ENGINE v2</Text>
        </Stack>
        <Text variant="headline" as="h2" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
          Signals that produce pipeline.
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
      <Card style={{ textAlign: "center" }} padding="lg">
        <Stack gap={6} align="center">
          <Text
            variant="headline"
            as="h2"
            style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
          >
            Your next 50 customers already exist.
          </Text>
          <Text variant="body" color="muted" style={{ maxWidth: "480px" }}>
            Let us help you reach them.
          </Text>
          <div style={{ paddingTop: tokens.spacing[4] }}>
            <Button variant="primary" size="lg">REQUEST ACCESS</Button>
          </div>
        </Stack>
      </Card>
    </Section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: `${tokens.spacing[8]} ${tokens.spacing[8]} ${tokens.spacing[10]}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
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
      <Text variant="caption" color="muted">&copy; 2026</Text>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="grid-background" style={{ minHeight: "100vh" }}>
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <HowWeWorkSection />
        <SignalsSection />
        <SignalCardsSection />
        <WhoWeWorkWithSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
