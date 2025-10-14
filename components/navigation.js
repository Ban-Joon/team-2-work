"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const menuItems = [
    { name: "게시판", href: "/board" },
    { name: "재활용 방법", href: "/recycling" },
    { name: "중고제품 상품페이지", href: "/products" },
    { name: "예약페이지", href: "/reservation" },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div>
              <Image
                src="/logo.jpg" // public/logo.png
                alt="Reborn Logo" // 대체 텍스트 (접근성)
                width={88} // 아이콘 실제 크기(px)
                height={88}
                className="object-contain" // 이미지 비율 유지
              />
            </div>

            {/* <div className="flex flex-col">
              <span className="font-bold text-xl text-foreground">Reborn</span>
              <span className="text-xs text-muted-foreground">
                자원 재탄생 플랫폼
              </span>
            </div> */}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-semibold"
              >
                {item.name}
              </Link>
            ))}

            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-border  font-semibold">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors"
                >
                  로그아웃
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg text-foreground hover:text-primary transition-colors"
                  >
                    로그인
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-4 pt-4 border-t border-border space-y-2">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors font-medium"
                >
                  로그아웃
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block w-full px-4 py-2 rounded-lg text-center text-foreground hover:text-primary transition-colors font-medium border border-border"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    로그인
                  </Link>
                  <Link
                    href="/signup"
                    className="block w-full px-4 py-2 rounded-lg text-center bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
