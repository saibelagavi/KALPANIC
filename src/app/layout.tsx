import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Kalpanic — Stop Explaining. Start Captivating.",
    template: "%s | Kalpanic",
  },
  description:
    "Transform boring briefs into extraordinary visual playbooks. The world's first aesthetics-first content tool for educators, founders, and product teams.",
  keywords: [
    "playbook",
    "presentation",
    "visual",
    "educator",
    "founder",
    "product manager",
    "design",
  ],
  openGraph: {
    title: "Kalpanic — Stop Explaining. Start Captivating.",
    description:
      "Transform boring content into extraordinary visual playbooks.",
    type: "website",
    url: "https://kalpanic.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalpanic",
    description:
      "Transform boring content into extraordinary visual playbooks.",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://kalpanic.com"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="imperium" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
