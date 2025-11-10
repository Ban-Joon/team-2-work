// functions/index.js
const admin = require("firebase-admin");
const { onSchedule } = require("firebase-functions/v2/scheduler");
// node-fetch v3 (ESM) → CJS에서 동적 import 래퍼
const fetch = (...args) => import("node-fetch").then(({ default: f }) => f(...args));

admin.initializeApp();
const db = admin.firestore();

const OZ_TO_G = 31.1035;

async function fetchUsdKrw() {
  const r = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=KRW");
  const j = await r.json();
  return j?.rates?.KRW;
}

async function fetchMetalsUsdPerOz() {
  const r = await fetch("https://api.metals.live/v1/spot");
  const j = await r.json(); // e.g. [ ["gold", 2371.4], ["silver", 28.1], ["platinum", 980] ... ]
  const map = new Map(j);
  return {
    gold: Number(map.get("gold")),
    silver: Number(map.get("silver")),
    platinum: Number(map.get("platinum")),
  };
}

function computeKrwPrices({ usdKrw, goldUsdOz, silverUsdOz, platinumUsdOz }) {
  const perGram = (usdOz) => (usdOz * usdKrw) / OZ_TO_G;
  const round10 = (v) => Math.round(v / 10) * 10;
  const unitG = 3.75;

  const gold24 = round10(perGram(goldUsdOz) * unitG);
  const gold18 = round10(gold24 * (18 / 24));
  const platinum = round10(perGram(platinumUsdOz) * unitG);
  const silver = Math.round(perGram(silverUsdOz) * 1);

  return { gold24, gold18, platinum, silver };
}

function withDiffs(next, prev = {}) {
  return {
    gold24: next.gold24,
    gold24Diff: (next.gold24 ?? 0) - (prev.gold24 ?? 0),
    gold18: next.gold18,
    gold18Diff: (next.gold18 ?? 0) - (prev.gold18 ?? 0),
    platinum: next.platinum,
    platinumDiff: (next.platinum ?? 0) - (prev.platinum ?? 0),
    silver: next.silver,
    silverDiff: (next.silver ?? 0) - (prev.silver ?? 0),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
}

exports.updateMetalsDaily = onSchedule(
  { schedule: "0 0 * * *", timeZone: "Asia/Seoul" },
  async () => {
    const ref = db.doc("metalPrices/latest");
    const prevSnap = await ref.get();
    const prev = prevSnap.exists ? prevSnap.data() : {};

    const usdKrw = await fetchUsdKrw();
    const { gold, silver, platinum } = await fetchMetalsUsdPerOz();

    const calc = computeKrwPrices({
      usdKrw,
      goldUsdOz: gold,
      silverUsdOz: silver,
      platinumUsdOz: platinum,
    });

    const payload = withDiffs(calc, prev);
    await ref.set(payload, { merge: true });
    console.log("updated", payload);
  }
);
