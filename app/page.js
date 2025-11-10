"use client";

import MetalTicker from "../components/MetalTicker";   // 상대경로 버전
import NoticeBar from "../components/NoticeBar";
import { Recycle, TrendingUp, Users, MapPin } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 상단 고정 반투명 다크 금시세 + 공지 */}
      <MetalTicker />
      <NoticeBar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-primary/5 to-secondary/10 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="text-primary" size={24} />
            <span className="text-muted-foreground font-semibold">대전 지역 서비스</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            자원의 재탄생,<br />
            <span className="text-primary">Reborn</span>과 함께하세요
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            사용하지 않는 가전제품과 가구에 새로운 생명을 불어넣습니다.<br />
            환경을 생각하는 지속 가능한 소비 문화를 만들어갑니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservation" className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              수거 예약하기
            </Link>
            <Link href="/products" className="bg-secondary text-secondary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              중고제품 둘러보기
            </Link>
          </div>
        </div>
      </section>

      {/* 서비스 섹션 */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">Reborn의 서비스</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">편리하고 친환경적인 중고제품 순환 플랫폼</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[Recycle, TrendingUp, Users].map((Icon, i) => {
              const texts = [
                { title: "중고제품 수거", desc: "사용하지 않는 가전제품과 가구를 편리하게 수거해드립니다." },
                { title: "재판매 서비스", desc: "수거한 제품을 검수하고 재생하여 합리적인 가격에 판매합니다." },
                { title: "이용객 편의성", desc: "복잡한 절차 없이 온라인으로 모든 과정을 진행할 수 있습니다." },
              ];
              return (
                <div key={i} className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="text-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-card-foreground">{texts[i].title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{texts[i].desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 이용 방법 섹션 */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">이용 방법</h2>
          <p className="text-center text-muted-foreground mb-12">간단한 4단계로 완성되는 자원 재탄생 프로세스</p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: "01", title: "예약 신청", description: "온라인으로 간편하게 수거 또는 구매 예약" },
              { number: "02", title: "방문 수거", description: "약속된 시간에 전문 팀이 방문하여 수거" },
              { number: "03", title: "검수 및 재생", description: "제품 상태 확인 및 필요시 수리 진행" },
              { number: "04", title: "판매 및 배송", description: "온라인 플랫폼을 통한 재판매 및 배송" },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 text-center h-full border border-border">
                  <div className="text-5xl font-bold text-primary/20 mb-4">{step.number}</div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < 3 && <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/30" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 하단 CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">지금 바로 시작하세요</h2>
          <p className="text-lg text-white/90 mb-8">
            대전 지역 최고의 중고제품 순환 플랫폼, Reborn과 함께<br />
            환경도 지키고 경제적인 혜택도 누리세요
          </p>
          <Link href="/reservation" className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors">
            무료 상담 신청하기
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-4">
            <span className="font-bold text-2xl">Reborn</span>
            <span className="text-sm ml-2 text-background/70">자원 재탄생 플랫폼</span>
          </div>
          <p className="text-background/70 text-sm">대전광역시 중고제품 수거 및 판매 서비스</p>
          <p className="text-background/70 text-sm mt-2">© 2025 Reborn. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
