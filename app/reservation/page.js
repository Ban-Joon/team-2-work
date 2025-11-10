"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "@/styles/reservation/ReservationList.module.css";

export default function ReservationPage() {
  const [reservations] = useState([
    {
      id: "1",
      name: "홍길동",
      phone: "010-1234-5678",
      address: "대전시 유성구 대학로 99",
      date: "2025-10-25",
      items: "냉장고, 세탁기",
      status: "대기",
    },
    {
      id: "2",
      name: "김철수",
      phone: "010-9876-5432",
      address: "대전시 서구 둔산로 123",
      date: "2025-10-26",
      items: "TV, 소파",
      status: "확정",
    },
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>예약 서비스</h1>
      </div>

      {/* 네비게이션 버튼 */}
      <div className={styles.navigationBar}>
        <Link
          href="/reservation"
          className={`${styles.navButton} ${styles.navButtonPrimary}`}
        >
          목록 보기
        </Link>
        <Link
          href="/reservation/create"
          className={`${styles.navButton} ${styles.navButtonSuccess}`}
        >
          예약하기
        </Link>
      </div>

      {/* 예약 목록 */}
      <div>
        <h2 className={styles.subtitle}>예약 목록 ({reservations.length}건)</h2>
        {reservations.length > 0 ? (
          <div className={styles.listContainer}>
            {reservations.map((reservation) => (
              <Link
                key={reservation.id}
                href={`/reservation/${reservation.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className={styles.reservationCard}>
                  <div className={styles.cardContent}>
                    <h3 className={styles.customerName}>{reservation.name}</h3>
                    <p className={styles.cardInfo}>📞 {reservation.phone}</p>
                    <p className={styles.cardInfo}>📍 {reservation.address}</p>
                    <p className={styles.cardInfo}>📅 {reservation.date}</p>
                    <p className={styles.cardInfo}>📦 {reservation.items}</p>
                  </div>
                  <span
                    className={`${styles.statusBadge} ${
                      reservation.status === "확정"
                        ? styles.statusConfirmed
                        : styles.statusWaiting
                    }`}
                  >
                    {reservation.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className={styles.emptyMessage}>예약이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
