// lib/firebaseClient.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// 🔧 네트워크/방화벽 환경에서 WebChannel 문제가 있을 때 안정화
initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export const db = getFirestore(app);

// 디버그 로그
if (typeof window !== "undefined") {
  console.log("[ENV projectId] =", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
  console.log("[Firebase] projectId =", app.options.projectId);
}
