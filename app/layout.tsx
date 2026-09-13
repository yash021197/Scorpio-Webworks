import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scorpio Webworks — Software. Systems. Digital Experiences.",
  description: "Custom software, web applications, e-commerce platforms, API integrations and cloud solutions.",
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
