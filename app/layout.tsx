import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import {cn} from '@/lib/utils'
/* const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
}); */

const FontSans = Plus_Jakarta_Sans({
  variable: "--font-sans-jakarta",
  subsets: ["latin"],
  weight:["200","500","800"]
});

export const metadata: Metadata = {
  title: "MediTalk",
  description: "A HealthCare Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn('min-h-screen bg-black  font-mono antialiased',FontSans.variable)}
      >
        <ThemeProvider >
            {children}
        </ThemeProvider>
      
      </body>
    </html>
  );
}
