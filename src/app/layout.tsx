import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI itu",
  description: "Advanced AI and Agent Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
