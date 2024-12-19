'use client';

import React from 'react';
import SidebarFullSet from '../components/SidebarFullSet/page';
import styles from './layout.module.scss';

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.settingsLayout}>
            <SidebarFullSet />
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
} 