"use client";

import Link from 'next/link';
import styles from './page.module.scss';
import { useState } from 'react';
import SidebarFull from '../SidebarFull/page';

export default function SidebarMiniSet() {
    const [isExpanding, setIsExpanding] = useState(false);
    const [showFull, setShowFull] = useState(false);

    const handleToggle = () => {
        setIsExpanding(true);
        setTimeout(() => {
            setShowFull(true);
        }, 300);
    };

    if (showFull) {
        return <SidebarFull />;
    }

    return (
        <div className={`${styles.sidebar} ${isExpanding ? styles.expanding : ''}`}>
            <div
                className={styles.sidebarFull}
                onClick={handleToggle}
                role="button"
                tabIndex={0}
            >
                <img src="/images/sidebar_lines.svg" alt="Toggle sidebar" />
            </div>
            <div className={styles.logo}>A</div>
            <nav className={styles.navigation}>
                <ul>
                    <li className={styles.calendar}>
                        <Link href="/Calendar/calendarPageDay"><img src="/images/calendar.svg" alt="calendar" /></Link>
                    </li>
                    <li className={styles.workSpace}>
                        <Link href="/WorkSpace"><img src="/images/work_space.svg" alt="work space" /></Link></li>
                    <li className={styles.tasks}>
                        <Link href="/tasks"><img src="/images/tasks.svg" alt="tasks" /></Link>
                    </li>
                    <li className={styles.focus}>
                        <Link href="/focusPage"><img src="/images/focus.svg" alt="focus" /></Link>
                    </li>
                </ul>
            </nav>
            <div className={styles.supportZone}>
                <div className={styles.circle}>
                    <div className={styles.donate}><img src="/images/donate.svg" alt="donate" /></div>
                </div>
                <div className={styles.circle}>
                    <div className={styles.help}><img src="/images/help.svg" alt="help" /></div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.profile}>
                    <div className={styles.circle}>A</div>
                </div>
            </div>
        </div>
    );
}
