"use client";

import Link from 'next/link';
import styles from './page.module.scss';
import { useState } from 'react';
import SidebarMini from '../SidebarMini/page';

export default function SidebarFull() {
    const [showMini, setShowMini] = useState(false);

    const handleToggle = () => {
        setShowMini(true);
    };

    if (showMini) {
        return <SidebarMini />;
    }

    return (
        <div className={styles.sidebar}>
            <div 
                className={styles.sidebarFull} 
                onClick={handleToggle}
                role="button"
                tabIndex={0}
            >
                <img src="/images/sidebar_lines.svg" alt="Toggle sidebar" />
            </div>
            <div className={styles.logo}>Articly</div>
            <nav className={styles.navigation}>
                <span className={styles.title}>Рабочая зона</span>
                <ul>
                    <li className={styles.calendar}>
                        <img src="/images/calendar.svg" alt="calendar" />
                        <Link href="/calendar">Календарь</Link>
                    </li>
                    <li className={styles.workSpace}>
                        <img src="/images/work_space.svg" alt="work space" />
                        <Link href="/work_space">Пространство</Link>
                    </li>
                    <li className={styles.tasks}>
                        <img src="/images/tasks.svg" alt="tasks" />
                        <Link href="/tasks">Задачи</Link>
                    </li>
                    <li className={styles.focus}>
                        <img src="/images/focus.svg" alt="focus" />
                        <Link href="/focus">Фокусирование</Link>
                    </li>
                </ul>
            </nav>
            <div className={styles.supportZone}>
                <div className={styles.donateBlock}>
                    <div className={styles.circle}>
                        <div className={styles.donate}><img src="/images/donate.svg" alt="donate" /></div>
                    </div>
                    <p>Поддержать</p>
                </div>
                <div className={styles.helpBlock}>
                    <div className={styles.circle}>
                        <div className={styles.help}><img src="/images/help.svg" alt="help" /></div>
                    </div>
                    <p>Помощь</p>
                </div>
                <div className={styles.line}></div>
                <div className={styles.profileBlock}>
                    <div className={styles.profile}>
                        <div className={styles.circle}>A</div>
                    </div>
                    <p>Профиль</p>
                </div>
            </div>
        </div>
    );
}
