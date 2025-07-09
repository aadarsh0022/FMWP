// "use client";
import { type Metadata } from "next";
import "./globals.css";
import { Providers } from "./context/providers";

export const metadata: Metadata = {
  title: "FMWP",
  description: "Finance Management Web Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body>
          {/* <header className="flex justify-end items-center p-4 gap-4 h-16">
            </header> */}
          {children}
        </body>
      </html>
    </Providers>
  );
}
