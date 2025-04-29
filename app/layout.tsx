import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "@/styles/index.css";
import Provider from "@/contexts/context";
import AuthProvider from "@/contexts/AuthContext";
import ApiProvider from "@/contexts/ApiContext";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://call-of-dragons-1up.vercel.app";

export const metadata: Metadata = {
  title: "Call of Dragons",
  description: "Call of Dragons: Epic Fantasy Strategy Game with Real-Time Battles",
  icons: {
    icon: [{ rel: "icon", url: "/assets/images/favicon.jpg" }], //recomened sizes 1200x630, 1080 × 566, 600 × 315 | aspect ratio 1.91:1
    apple: "/assets/images/favicon.jpg",
  },
  openGraph: {
    title: "Call of Dragons",
    description: "Call of Dragons: Epic Fantasy Strategy Game with Real-Time Battles",
    url: `${siteUrl}`,
    siteName: "Call of Dragons",
    images: [`${siteUrl}/assets/images/og-image.jpg`], //recomened sizes 1200x630, 1080 × 566, 600 × 315 | aspect ratio 1.91:1
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Call of Dragons",
    description: "Call of Dragons: Epic Fantasy Strategy Game with Real-Time Battles",
    images: [`${siteUrl}/assets/images/og-image.jpg`], //recomened sizes 1200x630, 1080 × 566, 600 × 315 | aspect ratio 1.91:1
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ApiProvider>
            <Provider>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                {children}
              </ThemeProvider>
              <Toaster />
            </Provider>
          </ApiProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
