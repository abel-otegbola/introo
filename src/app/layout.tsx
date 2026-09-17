import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AuthProvider from "@/contexts/AuthContext";
import Footer from "@/components/sections/footer";

const mona_sans = Mona_Sans({subsets:['latin'],variable:'--font-sans'})

export const metadata: Metadata = {
  title: "Introo",
  description: "Build your presentation video",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'system';
                const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                document.documentElement.classList.toggle('dark', isDark);
              })()
            `,
          }}
        />
      </head>
      <body
        className={`${mona_sans.variable} bg-white dark:bg[#101010] antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
