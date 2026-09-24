import type { Metadata, Viewport } from "next";
import { Barlow, Instrument_Serif } from "next/font/google";
import { Shell } from "@/components/Chrome";
import { posthogSnippet } from "@/lib/posthog";
import "./globals.css";

// Barlow (the look reference's face) carries the UI. Instrument Serif italic is the accent, kept for a single
// word in the hero and a few headline moments, to give the consultancy a warmer, editorial voice.
const ui = Barlow({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-ui", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Expert Health & Safety Consultancy | Green Hat Consulting", template: "%s | Green Hat Consulting" },
  description: "We deliver a range of Health and Safety solutions in many industries across Wales and the Southwest with expertise in the construction sector.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  icons: { icon: "/brand/favicon.png" },
};

export const viewport: Viewport = { themeColor: "#1B2032" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${ui.variable} ${serif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: posthogSnippet }} />
        <noscript><style>{"[data-rise],[data-clip],.hero-line-inner,.hero-in{visibility:visible!important;opacity:1!important}"}</style></noscript>
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
