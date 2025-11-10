"use client";

import { useState } from "react";
import styles from "@/styles/reservation/ReservationForm.module.css";

export default function SimpleReservationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    items: "",
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.date ||
      !formData.items
    ) {
      setMessage({ type: "error", text: "모든 필드를 입력해주세요." });
      return;
    }

    console.log("제출된 데이터:", formData);
    setMessage({ type: "success", text: "예약이 완료되었습니다!" });

    // 2초 후 폼 초기화
    setTimeout(() => {
      setFormData({
        name: "",
        phone: "",
        address: "",
        date: "",
        items: "",
      });
      setMessage(null);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {message && (
        <div
          className={
            message.type === "success"
              ? styles.successMessage
              : styles.errorMessage
          }
        >
          {message.text}
        </div>
      )}

      <div className={styles.formGroup}>
        <label className={styles.label}>이름 *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          placeholder="고객명을 입력하세요"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>전화번호 *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={styles.input}
          placeholder="010-1234-5678"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>주소 *</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={styles.input}
          placeholder="대전시 ..."
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>수거 희망 날짜 *</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>수거 품목 *</label>
        <textarea
          name="items"
          value={formData.items}
          onChange={handleChange}
          className={styles.textarea}
          placeholder="예: 냉장고, 세탁기&#10;여러 품목은 줄바꿈으로 구분해주세요"
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        예약하기
      </button>
    </form>
  );
}
