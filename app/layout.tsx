import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./app.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "비드인사이트 | 놓치지 않는 입찰 기회",
  description: "나라장터 입찰공고 통합검색과 맞춤 마감 알림 서비스",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "비드인사이트 | 놓치지 않는 입찰 기회",
    description: "나라장터 입찰공고 통합검색과 맞춤 마감 알림 서비스",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "비드인사이트 | 놓치지 않는 입찰 기회",
    description: "나라장터 입찰공고 통합검색과 맞춤 마감 알림 서비스",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
