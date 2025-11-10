import Link from "next/link";
import SimpleReservationForm from "@/components/reservation/SimpleReservationForm";
import styles from "@/styles/reservation/ReservationList.module.css";

export default function CreateReservationPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>새 예약 만들기</h1>
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

      <SimpleReservationForm />
    </div>
  );
}
