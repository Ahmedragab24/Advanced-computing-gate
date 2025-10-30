import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/Providers/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";
import { GlobalErrorHandler } from "@/components/ErrorBoundary/GlobalErrorHandler";

const cairo = Cairo({
  subsets: ["latin"],
  variable: "--font-Cairo",
});

export const metadata: Metadata = {
  title: "ComputingGate",
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
    images: [
      {
        url: "/Logo/Transparent BG- En + Ar @3x@3x@3x.png",
        width: 1200,
        height: 630,
        alt: "computinggate",
      },
    ],
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
  icons: {
    icon: "/Logo/Transparent - Logo Only@3x.png",
  },
  alternates: {
    canonical: "https://computinggate.com",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <NextIntlClientProvider locale={locale}>
        <body className={`${cairo.variable} font-sans antialiased`}>
          <GlobalErrorHandler />
          <ErrorBoundary>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </ErrorBoundary>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
