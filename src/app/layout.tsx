import { ReactNode } from "react";
import { Nunito } from "next/font/google";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "./provider";
import "./globals.css";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Blog App",
  description: "description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={nunito.variable}>
        <ThemeProvider>
          <main className="min-h-screen">
            <Navbar />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
