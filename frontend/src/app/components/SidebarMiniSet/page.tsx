"use client";

import Link from 'next/link';
import styles from './page.module.scss';
import { useState } from 'react';
import SidebarFullSet from '../SidebarFullSet/page';
import ProfileModal from '../ProfileModal/page';

interface SidebarMiniSetProps {
    isProfileModalOpen: boolean;
    setIsProfileModalOpen: (isOpen: boolean) => void;
}

export default function SidebarMiniSet({ isProfileModalOpen, setIsProfileModalOpen }: SidebarMiniSetProps) {
    const [isExpanding, setIsExpanding] = useState(false);
    const [showFull, setShowFull] = useState(false);

    const handleToggle = () => {
        setIsExpanding(true);
        setTimeout(() => {
            setShowFull(true);
        }, 300);
    };

    if (showFull) {
        return <SidebarFullSet />;
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
                        <Link href="/settings/user" className={styles.link}>
                            <img src="/images/user_set.svg" alt="user" />
                        </Link>
                    </li>
                    <li className={styles.workSpace}>
                        <Link href="/settings/security" className={styles.link}>
                            <img src="/images/safety_set.svg" alt="safety" />
                        </Link>
                    </li>
                    <li className={styles.tasks}>
                        <Link href="/settings/privacy" className={styles.link}>
                            <img src="/images/privicy_set.svg" alt="privacy" />
                        </Link>
                    </li>
                    <li className={styles.focus}>
                        <Link href="/settings/notifications" className={styles.link}>
                            <img src="/images/feeds_set.svg" alt="feed" />
                        </Link>
                    </li>
                    <li className={styles.focus}>
                        <Link href="/settings/design" className={styles.link}>
                            <img src="/images/color_set.svg" alt="color" />
                        </Link>
                    </li>
                    <li className={styles.focus}>
                        <Link href="/settings/subscription" className={styles.link}>
                            <img src="/images/sub_set.svg" alt="subscription" />
                        </Link>
                    </li>
                    <li className={styles.focus}>
                        <Link href="/settings/feedback" className={styles.link}>
                            <img src="/images/feedback_set.svg" alt="feedback" />
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className={styles.supportZone}>
                <div className={styles.circle}>
                    <div className={styles.donate}><img src="/images/donate.svg" alt="donate" /></div>
                </div>
                <div className={styles.circle}>
                    <Link href="/HelpPage">
                        <img src="/images/help.svg" alt="help" />
                    </Link>
                </div>
                <div className={styles.line}></div>
                <div className={styles.profile} onClick={() => setIsProfileModalOpen(true)}>
                    <div className={styles.circle}>A</div>
                </div>
                <ProfileModal 
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                userName="Alex"
            />
            </div>
        </div>
    );
}
