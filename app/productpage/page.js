"use client";

import { useState } from "react";
import Head from "next/head";
import styles from "./ProductPage.module.css";

export default function ProductPage() {
  const products = [
    {
      id: 1,
      title: "클라쎄550리터 중고양문형냉장고",
      description: "삼성, 깔끔한 화이트 색상, 550L",
      price: "₩300,000",
      image: "https://via.placeholder.com/400x300?text=Monitor",
    },
    {
      id: 2,
      title: "삼성615리터",
      description: "삼성, 에너지효율 1등급, 메탈실버, 외관 깨끗",
      price: "₩400,000",
      image: "https://via.placeholder.com/400x300?text=Styler",
    },
    {
      id: 3,
      title: "대우243리터 중고냉장고",
      description: "원룸, 사무실 사이즈, 에너지효율 1등급, 화이트 색상",
      price: "₩150,000",
      image: "https://via.placeholder.com/400x300?text=Sofa",
    },
    {
      id: 4,
      title: "미디어12키로 중고드럼세탁기",
      description: "전기효율 1등급, 사용감 적은 A급, 다크메탈컬러",
      price: "₩200,000",
      image: "https://via.placeholder.com/400x300?text=iPhone",
    },
    {
      id: 5,
      title: "대우6키로 중고세탁기 ",
      description: "소형세탁기, 가성비 제품, 통분해 세척완료",
      price: "₩150,000",
      image: "https://via.placeholder.com/400x300?text=Monitor",
    },
    {
      id: 6,
      title: "삼성 4도어냉장고 645리터 세미빌트인 냉장고",
      description: "4도어, 빌트인, 사용감 적은 A급",
      price: "₩600,000",
      image: "https://via.placeholder.com/400x300?text=Styler",
    },
    {
      id: 7,
      title: "대우 15키로 공기방울 세탁기",
      description: "올 분해 세척완료",
      price: "₩200,000",
      image: "https://via.placeholder.com/400x300?text=Sofa",
    },
    {
      id: 8,
      title: "클라쎄550리터 중고양문형냉장고",
      description: "양문형 냉장고, 메탈실버색상, 모던한 디자인",
      price: "₩350,000",
      image: "https://via.placeholder.com/400x300?text=iPhone",
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  return (
    <>
      <Head>
        <title>중고제품 상품페이지 | Reborn</title>
      </Head>

      <header>
        <h1>Reborn 중고제품 목록</h1>
        <p>대전 지역 친환경 중고제품 순환 플랫폼</p>
      </header>

      <main>
        <div className={styles.productContainer}>
          {products.map((p) => (
            <div
              key={p.id}
              className={styles.productCard}
              onClick={() => openModal(p)}
            >
              <img src={p.image} alt={p.title} />
              <div className={styles.info}>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className={styles.price}>{p.price}</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedProduct && (
        <div className={styles.modal} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={styles.close} onClick={closeModal}>
              &times;
            </span>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              style={{
                width: "100%",
                borderRadius: "12px",
                marginBottom: "1rem",
              }}
            />
            <h2>{selectedProduct.title}</h2>
            <p>{selectedProduct.description}</p>
            <p className={styles.price}>{selectedProduct.price}</p>
          </div>
        </div>
      )}

      <footer>© 2025 Reborn. All rights reserved.</footer>
    </>
  );
}
