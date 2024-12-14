"use client";

import Link from 'next/link';
import styles from './page.module.scss';
import { useState } from 'react';
import SidebarMiniSet from '../SidebarMiniSet/page';

export default function SidebarFullSet() {
    const [isCollapsing, setIsCollapsing] = useState(false);
    const [showMini, setShowMini] = useState(false);

    const handleToggle = () => {
        setIsCollapsing(true);
        setTimeout(() => {
            setShowMini(true);
        }, 300);
    };

    if (showMini) {
        return <SidebarMiniSet />;
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
                <span className={styles.title}>Настройки</span>
                <ul>
                    <li className={styles.calendar}>
                        <Link href="/authorised/settings/user" className={styles.link}>
                            <img src="/images/user_set.svg" alt="user" />
                            Пользователь
                        </Link>
                    </li>
                    <li className={styles.workSpace}>
                        <Link href="/authorised/settings/security" className={styles.link}>
                            <img src="/images/safety_set.svg" alt="safety" />
                            Безопасность
                        </Link>
                    </li>
                    <li className={styles.tasks}>
                        <Link href="/authorised/settings/privacy" className={styles.link}>
                            <img src="/images/privicy_set.svg" alt="privacy" />
                            Приватность
                        </Link>
                    </li>
                    <li className={styles.focus}>
                        <Link href="/authorised/settings/notifications" className={styles.link}>
                            <img src="/images/feeds_set.svg" alt="feed" />
                            Уведомления
                        </Link>
                    </li>
                    <li className={styles.focus}>
                        <Link href="/authorised/settings/design" className={styles.link}>
                            <img src="/images/color_set.svg" alt="color" />
                            Оформление
                        </Link>
                    </li>
                    <li className={styles.focus}>
                        <Link href="/authorised/settings/subscription" className={styles.link}>
                            <img src="/images/sub_set.svg" alt="subscription" />
                            Подписка
                        </Link>
                    </li>
                    <li className={styles.focus}>
                        <Link href="/authorised/settings/feedback" className={styles.link}>
                            <img src="/images/feedback_set.svg" alt="feedback" />
                            Обратная связь
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className={styles.supportZone}>
                <div className={styles.donateBlock}>
                    <div className={styles.circle}>
                        <div className={styles.donate}><img src="/images/donate.svg" alt="donate" /></div>
                    </div>
                    <Link href="/donate" className={styles.link}>
                        Поддержать
                    </Link>
                </div>
                <div className={styles.helpBlock}>
                    <div className={styles.circle}>
                        <div className={styles.help}><img src="/images/help.svg" alt="help" /></div>
                    </div>
                    <Link href="/help" className={styles.link}>
                        Помощь
                    </Link>
                </div>
                <div className={styles.line}></div>
                <div className={styles.profileBlock}>
                    <div className={styles.profile}>
                        <div className={styles.circle}>A</div>
                    </div>
                    <Link href="/profile" className={styles.link}>
                        Профиль
                    </Link>
                </div>
            </div>
        </div>
    );
}
