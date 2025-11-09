"use client";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[rgba(255,255,255,0.9)] backdrop-blur-md border-b border-border text-foreground">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-2">
          <Image
            src="/1.jpg" // 로고 또는 배너 이미지
            alt="한마당자원 로고"
            width={36}
            height={36}
            className="rounded-full border border-border"
          />
          <span className="font-bold text-[1.2rem] text-[var(--primary)]">
            한마당자원
          </span>
        </div>
        <nav className="flex gap-6 text-[0.95rem] font-medium">
          <a href="/" className="hover:text-[var(--secondary)]">홈</a>
          <a href="/community" className="hover:text-[var(--secondary)]">커뮤니티</a>
          <a href="/about" className="hover:text-[var(--secondary)]">회사소개</a>
        </nav>
      </div>
    </header>
  );
}
