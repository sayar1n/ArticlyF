"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import React from "react";

export default function Footer() {
    const footerItemsColumn1 = [
        { href: "/pricing", text: "Стоимость" },
        { href: "/downloads", text: "Скачать" },
        { href: "/blog", text: "Блог" },
        { href: "/forum", text: "Форум" },
    ];

    const footerItemsColumn2 = [
        { href: "/careers", text: "Карьера" },
        { href: "/company", text: "Компания" },
        { href: "/security", text: "Безопасность" },
        { href: "/privacy", text: "Конфиденциальность" },
    ];

    const footerItemsColumn3 = [
        { href: "/terms", text: "Условия" },
        { href: "/changelog", text: "Обновления" },
        { href: "/twitter", text: "Telegram" },
        { href: "/github", text: "GitHub" },
    ];

    return (
        <footer>
            <div className={styles.footer}>
                <div className={styles.leftSection}>
                    <div className={styles.logo}>пока пусто</div>
                </div>
                <div className={styles.rightSection}>
                    <div className={styles.linksGrid}>
                        <div className={styles.column}>
                            {footerItemsColumn1.map((item) => (
                                <Link key={item.href} href={item.href}>{item.text}</Link>
                            ))}
                        </div>
                        <div className={styles.column}>
                            {footerItemsColumn2.map((item) => (
                                <Link key={item.href} href={item.href}>{item.text}</Link>
                            ))}
                        </div>
                        <div className={styles.column}>
                            {footerItemsColumn3.map((item) => (
                                <Link key={item.href} href={item.href}>{item.text}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}