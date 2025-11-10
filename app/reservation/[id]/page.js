"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import styles from "@/styles/reservation/ReservationDetail.module.css";

export default function ReservationDetailPage() {
  const params = useParams();
  const reservationId = params.id;

  // 임시 예약 데이터 (나중에 API로 대체)
  const allReservations = [
    {
      id: "1",
      name: "홍길동",
      phone: "010-1234-5678",
      address: "대전시 유성구 대학로 99",
      date: "2025-10-25",
      time: "14:00",
      items: "냉장고, 세탁기",
      status: "대기",
      note: "큰 냉장고라 엘리베이터 필요합니다",
      createdAt: "2025-10-22",
      updatedAt: "2025-10-22",
    },
    {
      id: "2",
      name: "김철수",
      phone: "010-9876-5432",
      address: "대전시 서구 둔산로 123",
      date: "2025-10-26",
      time: "10:00",
      items: "TV, 소파",
      status: "확정",
      note: "소파는 분리 가능합니다",
      createdAt: "2025-10-21",
      updatedAt: "2025-10-22",
    },
  ];

  const [reservation, setReservation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    // ID에 맞는 예약 찾기
    const found = allReservations.find((r) => r.id === reservationId);
    if (found) {
      setReservation(found);
      setEditData({ ...found });
    }
  }, [reservationId]);

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setReservation(editData);
    setIsEditing(false);
    alert("예약이 수정되었습니다!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...reservation });
  };

  const handleDelete = () => {
    if (confirm("이 예약을 삭제하시겠습니까?")) {
      alert("예약이 삭제되었습니다!");
      // 실제 구현에서는 API 호출 후 목록으로 이동
    }
  };

  if (!reservation) {
    return (
      <div className={styles.container}>
        <p className={styles.loadingText}>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>예약 상세정보</h1>
        <Link href="/reservation" className={styles.backButton}>
          ← 목록으로 돌아가기
        </Link>
      </div>

      {!isEditing ? (
        // 조회 모드
        <div className={styles.detailCard}>
          <div className={styles.detailHeader}>
            <h2 className={styles.detailTitle}>{reservation.name}</h2>
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

          <div className={styles.detailContent}>
            <div className={styles.detailRow}>
              <span className={styles.label}>예약번호</span>
              <span className={styles.value}>#{reservation.id}</span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.label}>고객명</span>
              <span className={styles.value}>{reservation.name}</span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.label}>전화번호</span>
              <span className={styles.value}>{reservation.phone}</span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.label}>주소</span>
              <span className={styles.value}>{reservation.address}</span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.label}>수거 날짜</span>
              <span className={styles.value}>{reservation.date}</span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.label}>수거 시간</span>
              <span className={styles.value}>{reservation.time}</span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.label}>수거 품목</span>
              <span className={styles.value}>{reservation.items}</span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.label}>메모</span>
              <span className={styles.value}>{reservation.note || "없음"}</span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.label}>작성일</span>
              <span className={styles.value}>{reservation.createdAt}</span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.label}>수정일</span>
              <span className={styles.value}>{reservation.updatedAt}</span>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button
              onClick={() => setIsEditing(true)}
              className={styles.editButton}
            >
              수정하기
            </button>
            <button onClick={handleDelete} className={styles.deleteButton}>
              삭제하기
            </button>
          </div>
        </div>
      ) : (
        // 수정 모드
        <div className={styles.editCard}>
          <h2 className={styles.editTitle}>예약 수정</h2>

          <div className={styles.formGroup}>
            <label className={styles.label}>고객명</label>
            <input
              type="text"
              value={editData.name}
              onChange={(e) => handleEditChange("name", e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>전화번호</label>
            <input
              type="tel"
              value={editData.phone}
              onChange={(e) => handleEditChange("phone", e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>주소</label>
            <input
              type="text"
              value={editData.address}
              onChange={(e) => handleEditChange("address", e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>수거 날짜</label>
            <input
              type="date"
              value={editData.date}
              onChange={(e) => handleEditChange("date", e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>수거 시간</label>
            <input
              type="time"
              value={editData.time}
              onChange={(e) => handleEditChange("time", e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>수거 품목</label>
            <textarea
              value={editData.items}
              onChange={(e) => handleEditChange("items", e.target.value)}
              className={styles.textarea}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>상태</label>
            <select
              value={editData.status}
              onChange={(e) => handleEditChange("status", e.target.value)}
              className={styles.selectInput}
            >
              <option value="대기">대기</option>
              <option value="확정">확정</option>
              <option value="완료">완료</option>
              <option value="취소">취소</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>메모</label>
            <textarea
              value={editData.note}
              onChange={(e) => handleEditChange("note", e.target.value)}
              className={styles.textarea}
              placeholder="특별한 사항이 있으면 입력해주세요"
            />
          </div>

          <div className={styles.buttonGroup}>
            <button onClick={handleSave} className={styles.saveButton}>
              저장하기
            </button>
            <button onClick={handleCancel} className={styles.cancelButton}>
              취소하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
