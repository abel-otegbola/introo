import type { Metadata } from "next";
import { Figtree, Questrial } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const questrial = Questrial({
  variable: "--font-questrial",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Introo",
  description: "Build your pitch video",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} ${questrial.variable} antialiased 2xl:text-[18px] md:text-[15px] text-[13px] leading-[100%] tracking-[0%]`}
      >
        {children}
      </body>
    </html>
  );
}
