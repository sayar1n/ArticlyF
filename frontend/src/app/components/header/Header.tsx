"use client";

import Link from "next/link";
import styles from "./Header.module.scss";
import { AlignJustify, X } from "lucide-react";
import React, { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { href: "#about", text: "О нас" },
    { href: "#features", text: "Функционал" },
    { href: "#pricing", text: "Стоимость" },
    { href: "#feedback", text: "Обратная связь" },
    { href: "#support", text: "Поддержка" },
  ];

  return (
    <header>
      <div className={styles.header}>
        <div className={styles.logo}>Articly</div>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.text}
            </a>
          ))}
        </nav>
        <div className={styles.headerButtons}>
          <button className={styles.hamburgerIcon} onClick={toggleMenu}>
            {isOpen ? <X color="white" /> : <AlignJustify color="white" />}
          </button>
          <Link href="/auth/signIn" className={styles.signInButton}>
            Войти
          </Link>
        </div>
      </div>
      {isOpen && (
        <nav className={styles.navOpen}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLinkOpen}>
              {item.text}
            </a>
          ))}
          <Link href="/auth/signIn" className={styles.signInButtonOpen}>
            Войти
          </Link>
        </nav>
      )}
    </header>
  );
}
