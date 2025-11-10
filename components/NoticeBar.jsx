"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseClient";
import { collection, onSnapshot, orderBy, query, limit } from "firebase/firestore";

export default function NoticeBar() {
  const [text, setText] = useState("📢 오늘은 정상 운영합니다. (휴무 공지 없음)");

  useEffect(() => {
    const q = query(
      collection(db, "announcements"),
      orderBy("createdAt", "desc"),
      limit(1)
    );
    const unsub = onSnapshot(q, (snap) => {
      const latest = snap.docs[0]?.data();
      if (latest?.text) setText(String(latest.text));
    });
    return () => unsub();
  }, []);

  return (
    <div className="w-full bg-emerald-900/70 text-emerald-50 text-sm py-2 px-3 border-b border-emerald-400/20">
      <div className="max-w-7xl mx-auto truncate">{text}</div>
    </div>
  );
}
