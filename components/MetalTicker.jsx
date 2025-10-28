"use client";

import { useEffect, useMemo, useState } from "react";
import { db } from "@/lib/firebaseClient";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

export default function MetalTicker() {
  const [metals, setMetals] = useState(null);
  const [status, setStatus] = useState("INIT");
  const [error, setError] = useState("");

  // 🔧 디버그 패널/JSON 보기 토글
  const SHOW_DEBUG = false;

  useEffect(() => {
    const ref = doc(db, "metalprices", "latest"); // ← 소문자 metalprices

    // 1) 단발 조회
    getDoc(ref)
      .then((snap) => {
        if (!snap.exists()) {
          setStatus("GETDOC_DOC_MISSING");
        } else {
          setStatus("GETDOC_OK");
          setMetals(snap.data());
        }
      })
      .catch((e) => {
        setStatus("GETDOC_ERROR");
        setError(e?.message || String(e));
      });

    // 2) 실시간 구독
    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          setStatus((prev) => (prev.startsWith("GETDOC") ? `SNAP_OK / ${prev}` : "SNAP_OK"));
          setMetals(snap.data());
        } else {
          setStatus((prev) => (prev.startsWith("GETDOC") ? `SNAP_DOC_MISSING / ${prev}` : "SNAP_DOC_MISSING"));
        }
      },
      (e) => {
        setStatus("SNAP_ERROR");
        setError(e?.message || String(e));
      }
    );
    return () => unsub();
  }, []);

  // 숫자 안전 변환 + 포맷
  const toNum = (x) => (typeof x === "number" ? x : Number(String(x ?? "").replace(/[, ]/g, "")));
  const fmt = (n) => (Number.isFinite(n) ? n.toLocaleString("ko-KR") : "-");

  // 업데이트 시각 포맷 (Firestore Timestamp/number/string 모두 지원)
  const updatedAtLabel = useMemo(() => {
    const src = metals?.updatedAt ?? Date.now(); // 문서에 없으면 현재시각
    let ms = null;
    if (src?.toMillis) ms = src.toMillis();              // Firestore Timestamp
    else if (typeof src === "number") ms = src;
    else if (typeof src === "string") ms = Date.parse(src);
    if (!Number.isFinite(ms)) ms = Date.now();
    const d = new Date(ms);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${mi} 기준`;
  }, [metals]);

  // 표시 아이템
  const items = useMemo(() => {
    if (!metals) return [];
    return [
      { name: "24K 금", value: toNum(metals.gold24),    diff: toNum(metals.gold24Diff) },
      { name: "18K 금", value: toNum(metals.gold18),    diff: toNum(metals.gold18Diff) },
      { name: "백금",   value: toNum(metals.platinum),  diff: toNum(metals.platinumDiff) },
      { name: "은",     value: toNum(metals.silver),    diff: toNum(metals.silverDiff) },
    ].filter((x) => Number.isFinite(x.value));
  }, [metals]);

  const sign  = (n) => (n > 0 ? "▲" : n < 0 ? "▼" : "—");
  const color = (n) => (n > 0 ? "text-pink-400" : n < 0 ? "text-sky-400" : "text-gray-400");
  const projectId = db?.app?.options?.projectId || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "unknown";

  return (
    <div className="sticky top-0 z-50 w-full bg-black/70 backdrop-blur border-b border-white/10 text-white text-[13px]">
      {/* 디버그 패널 (필요 시 SHOW_DEBUG=true) */}
      {SHOW_DEBUG && (
        <div className="px-3 py-1 text-[11px] opacity-90">
          <b>proj:</b> {projectId} &nbsp;|&nbsp; <b>status:</b> {status}
          {error && <span className="text-red-300"> — {error}</span>}
        </div>
      )}
      {SHOW_DEBUG && (
        <pre className="px-3 py-1 text-[10px] text-white/80 overflow-x-auto max-h-28">
          {metals ? JSON.stringify(metals, null, 2) : "(no data)"}
        </pre>
      )}

      {/* 업데이트 시각 라벨 */}
      <div className="px-3 py-1 text-[11px] text-white/70">{updatedAtLabel}</div>

      {items.length ? (
        <div className="relative overflow-hidden py-1 group">
          <div className="ticker-track group-hover:[animation-play-state:paused]">
            <div className="ticker-row">{items.map(renderItem)}</div>
            <div className="ticker-row" aria-hidden>{items.map(renderItem)}</div>
          </div>
        </div>
      ) : (
        <div className="py-2 text-center">💰 시세 불러오는 중...</div>
      )}

      <style jsx>{`
        @keyframes tickerScroll { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
        .ticker-track { display:flex; width:200%; animation: tickerScroll 28s linear infinite; }
        .ticker-row   { display:flex; gap:2.5rem; padding:0 1rem; width:50%; white-space:nowrap; align-items:center; }
        @media (max-width: 520px) { .ticker-row { gap: 1.25rem; } }
        @media (prefers-reduced-motion: reduce) { .ticker-track { animation: none; } }
      `}</style>
    </div>
  );

  function renderItem(m, i) {
    return (
      <div key={`${m.name}-${i}`} className="inline-flex items-center gap-2 font-medium">
        <span className="text-yellow-400">{m.name}</span>
        <span className="text-white">{fmt(m.value)}원</span>
        <span className={color(m.diff)}>
          {sign(m.diff)}
          {fmt(Math.abs(Number(m.diff) || 0))}
        </span>
      </div>
    );
  }
}
