import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FMWP",
  description: "Finance management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex justify-center items-center h-screen">
        {children}
      </body>
    </html>
  );
}
