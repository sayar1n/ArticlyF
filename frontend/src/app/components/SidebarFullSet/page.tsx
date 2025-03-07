"use client";

import Link from 'next/link';
import styles from './page.module.scss';
import { useState } from 'react';
import SidebarMiniSet from '../SidebarMiniSet/page';
import ProfileModal from '../ProfileModal/page';


export default function SidebarFullSet() {
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
        return <SidebarMiniSet 
            isProfileModalOpen={isProfileModalOpen}
            setIsProfileModalOpen={setIsProfileModalOpen}
        />;
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
                        <Link href="/settings/user" className={styles.link}>
                            <img src="/images/user_set.svg" alt="user" />
                            Пользователь
                        </Link>
                    </li>
                    <li className={styles.workSpace}>
                        <Link href="/settings/security" className={styles.link}>
                            <img src="/images/safety_set.svg" alt="safety" />
                            Безопасность
                        </Link>
                    </li>
                    <li className={styles.tasks}>
                        <Link href="" className={styles.link}>
                            <img src="/images/privicy_set.svg" alt="privacy" />
                            Приватность
                        </Link>
                    </li>
                    <li className={styles.focus}>
                        <Link href="/settings/notifications" className={styles.link}>
                            <img src="/images/feeds_set.svg" alt="feed" />
                            Уведомления
                        </Link>
                    </li>
                    <li className={styles.focus}>
                        <Link href="/settings/design" className={styles.link}>
                            <img src="/images/color_set.svg" alt="color" />
                            Оформление
                        </Link>
                    </li>
                    <li className={styles.focus}>
                        <Link href="/settings/subscription" className={styles.link}>
                            <img src="/images/sub_set.svg" alt="subscription" />
                            Подписка
                        </Link>
                    </li>
                    <li className={styles.focus}>
                        <Link href="/settings/feedback" className={styles.link}>
                            <img src="/images/feedback_set.svg" alt="feedback" />
                            Обратная связь
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className={styles.supportZone}>
                <div className={styles.workSpaceBlock}>
                    <Link href="/Calendar/calendarPageDay" className={styles.link}>
                        <div className={styles.circle}>
                            <div className={styles.donate}><img src="/images/work_space.svg" alt="work_space" /></div>
                        </div>
                        Рабочая зона
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
                    <Link href="/HelpPage" className={styles.link}>
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
