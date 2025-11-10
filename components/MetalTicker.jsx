"use client";
import { useEffect, useState, useMemo } from "react";
import { db } from "@/lib/firebaseClient";
import { doc, onSnapshot } from "firebase/firestore";

export default function MetalTicker() {
  const [metals, setMetals] = useState(null);

  useEffect(() => {
    const ref = doc(db, "metalprices", "latest");
    return onSnapshot(ref, (snap) => {
      if (snap.exists()) setMetals(snap.data());
    });
  }, []);

  const items = useMemo(() => {
    if (!metals) return [];
    const v = (x) => (typeof x === "number" ? x : Number(x ?? NaN));
    return [
      { name: "24K 금", value: v(metals.gold24), diff: v(metals.gold24Diff) },
      { name: "18K 금", value: v(metals.gold18), diff: v(metals.gold18Diff) },
      { name: "백금", value: v(metals.platinum), diff: v(metals.platinumDiff) },
      { name: "은", value: v(metals.silver), diff: v(metals.silverDiff) },
    ];
  }, [metals]);

  const sign = (n) => (n > 0 ? "▲" : n < 0 ? "▼" : "—");
  const color = (n) => (n > 0 ? "text-[var(--secondary)]" : n < 0 ? "text-blue-500" : "text-muted-foreground");

  return (
    <div className="bg-[var(--accent)] text-white text-sm py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        {items.length ? (
          items.map((m, i) => (
            <span key={i} className="mx-4 inline-flex items-center gap-2">
              <span className="font-semibold">{m.name}</span>
              <span>{m.value?.toLocaleString()}원</span>
              <span className={color(m.diff)}>{sign(m.diff)}{Math.abs(m.diff || 0)}</span>
            </span>
          ))
        ) : (
          <span>💰 시세 불러오는 중...</span>
        )}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}
