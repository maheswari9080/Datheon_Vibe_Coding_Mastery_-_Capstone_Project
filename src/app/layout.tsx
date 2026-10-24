import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "CreatorFlow AI — AI Content Planning & Campaign Management Platform",
  description:
    "Empowering creators, freelancers, and growth teams to ideate, plan, generate with AI, and execute multi-platform content campaigns seamlessly.",
  keywords: [
    "AI content generator",
    "creator workflow",
    "campaign management",
    "content calendar",
    "SaaS",
    "CreatorFlow AI",
  ],
  authors: [{ name: "CreatorFlow AI Team" }],
  openGraph: {
    title: "CreatorFlow AI — Plan & Generate Content 10x Faster",
    description:
      "All-in-one workspace for content planning, AI draft creation, campaign management, and cross-channel publishing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased transition-colors duration-200">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
