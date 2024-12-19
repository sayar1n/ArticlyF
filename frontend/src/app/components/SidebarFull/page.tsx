"use client";

import Link from 'next/link';
import styles from './page.module.scss';
import { useState } from 'react';
import SidebarMini from '../SidebarMini/page';
import ProfileModal from '../ProfileModal/page';

export default function SidebarFull() {
    const [isCollapsing, setIsCollapsing] = useState(false);
    const [showMini, setShowMini] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const handleToggle = () => {
        setIsCollapsing(true);
        setTimeout(() => {
            setShowMini(true);
        }, 300);
    };

    if (showMini) {
        return <SidebarMini />;
    }

    return (
        <div className={`${styles.sidebar} ${isCollapsing ? styles.collapsing : ''}`}>
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
                        <Link href="/Calendar/calendarPageDay" className={styles.link}>
                            <img src="/images/calendar.svg" alt="calendar" />
                            Календарь
                        </Link>
                    </li>
                    <li className={styles.workSpace}>
                        <Link href="/WorkSpace" className={styles.link}>
                            <img src="/images/work_space.svg" alt="work space" />
                            Пространство
                        </Link>
                    </li>
                    <li className={styles.tasks}>
                        <Link href="/Tasks" className={styles.link}>
                            <img src="/images/tasks.svg" alt="tasks" />
                            Задачи
                        </Link>
                    </li>
                    <li className={styles.focus}>
                        <Link href="/focusPage" className={styles.link}>
                            <img src="/images/focus.svg" alt="focus" />
                            Фокусирование
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className={styles.supportZone}>
                <div className={styles.settingsBlock}>
                    <Link href="/settings/user" className={styles.link}>
                        <div className={styles.circle}>
                            <div className={styles.donate}><img src="/images/settings.svg" alt="settings" /></div>
                        </div>
                        Настройки
                    </Link>
                </div>
                <div className={styles.donateBlock}>
                    <Link href="/donate" className={styles.link}>
                        <div className={styles.circle}>
                            <div className={styles.donate}><img src="/images/donate.svg" alt="donate" /></div>
                        </div>
                        Поддержать
                    </Link>
                </div>
                <div className={styles.helpBlock}>
                    <Link href="/help" className={styles.link}>
                        <div className={styles.circle}>
                            <div className={styles.help}><img src="/images/help.svg" alt="help" /></div>
                        </div>
                        Помощь
                    </Link>
                </div>
                <div className={styles.line}></div>
                <div className={styles.profileBlock} onClick={() => setIsProfileModalOpen(true)}>
                    <div className={styles.profile}>
                        <div className={styles.circle}>A</div>
                    </div>
                    Профиль
                </div>
            </div>
            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                userName="Alex"
            />
        </div>
    );
}
