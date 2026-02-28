import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Outbound Solutions | GTM that gets results",
  description: "Targeted outbound campaigns for B2B sales teams.",
  metadataBase: new URL("https://outboundsolutions.com"),
  openGraph: {
    title: "Outbound Solutions | GTM that gets results",
    description: "Targeted outbound campaigns for B2B sales teams.",
    url: "https://outboundsolutions.com",
    siteName: "Outbound Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Outbound Solutions | GTM that gets results",
    description: "Targeted outbound campaigns for B2B sales teams.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${instrumentSerif.variable} ${ibmPlexMono.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
