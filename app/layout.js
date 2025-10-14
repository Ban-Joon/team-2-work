import { Analytics } from "@vercel/analytics/next";
import Navigation from "@/components/navigation";
import "./globals.css";
import { Suspense } from "react";

export const metadata = {
  title: "Reborn - 자원 재탄생 플랫폼",
  description: "대전 지역 중고 가전 및 가구 수거 및 판매 서비스",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">
        <Suspense fallback={<div>Loading...</div>}>
          <Navigation />
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
