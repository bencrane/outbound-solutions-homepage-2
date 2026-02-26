import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WithCoverage — Check Your Fleet Coverage',
  description: 'Personalized fleet coverage report',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Fraunces:ital,wght@0,700;0,900;1,700&family=JetBrains+Mono:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
