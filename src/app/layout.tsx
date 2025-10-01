import type { Metadata } from "next";
import { Cairo_Play } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PageLoader } from "@/components/loading/PageLoader";

const cairo_play = Cairo_Play({
  subsets: ["latin"],
  variable: "--font-Cairo_Play",
});

export const metadata: Metadata = {
  title: "ComputingGate - Advanced Technology Solutions",
  description:
    "Professional software development, cloud computing, digital transformation, and technical support services for enterprises.",
  keywords:
    "software development, cloud computing, digital transformation, technical support, IT solutions",
  authors: [{ name: "ComputingGate" }],
  creator: "ComputingGate",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://computinggate.com",
    title: "ComputingGate - Advanced Technology Solutions",
    description:
      "Professional software development, cloud computing, digital transformation, and technical support services for enterprises.",
    siteName: "ComputingGate",
  },
  twitter: {
    card: "summary_large_image",
    title: "ComputingGate - Advanced Technology Solutions",
    description:
      "Professional software development, cloud computing, digital transformation, and technical support services for enterprises.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cairo_play.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PageLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
