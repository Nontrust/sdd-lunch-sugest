import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "점심 추천",
  description: "오늘 점심 뭐 먹지? 카테고리별 랜덤 메뉴 추천",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="flex gap-6 px-6 py-4 border-b border-gray-200">
          <Link href="/" className="text-sm font-semibold text-gray-400 hover:text-gray-900 transition-colors">
            추천
          </Link>
          <Link href="/manage" className="text-sm font-semibold text-gray-400 hover:text-gray-900 transition-colors">
            관리
          </Link>
        </nav>
        <main className="max-w-xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
