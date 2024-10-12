"use client"

import Link from 'next/link';
import styles from './Header.module.scss';
// import { AlignJustify, X } from 'lucide-react';
import React, { useState} from 'react';


export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>Articly</div>
            <nav className={styles.nav}>
                <a href="#about" className={styles.navLink}>О нас</a>
                <a href="#features" className={styles.navLink}>Функционал</a>
                <a href="#pricing" className={styles.navLink}>Стоимость</a>
                <a href="#feedback" className={styles.navLink}>Обратная связь</a>
                <a href="#support" className={styles.navLink}>Поддержка</a>
            </nav>
            <Link href="/auth/signIn" className={styles.signInButton}>Войти</Link>
        </header>
    )
}