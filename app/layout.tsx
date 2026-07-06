import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aman Kumar | Backend Engineer",
  description: "Production-grade backend systems mapped with dynamic frontend execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased overflow-x-hidden`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
