import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://scorpiowebworks.vercel.app"),
  title: "Scorpio Webworks — Software Development & Digital Experiences",
  description: "Scorpio Webworks builds modern websites, web applications, e-commerce experiences, and custom software for businesses.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Scorpio Webworks — Software Development & Digital Experiences",
    description: "Scorpio Webworks builds modern websites, web applications, e-commerce experiences, and custom software for businesses.",
    url: "/",
    siteName: "Scorpio Webworks",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Scorpio Webworks — Software Development & Digital Experiences",
    description: "Scorpio Webworks builds modern websites, web applications, e-commerce experiences, and custom software for businesses.",
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
