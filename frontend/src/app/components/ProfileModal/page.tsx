'use client';

import React from 'react';
import Link from 'next/link';
import styles from './page.module.scss';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    userName: string;
}

export default function ProfileModal({ isOpen, onClose, userName }: ProfileModalProps) {
    const router = useRouter();
    
    const handleLogout = async () => {
        try {
            // Удаляем токен из localStorage
            localStorage.removeItem('access_token');
            
            // Очищаем куки если они используются
            document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            
            // Перенаправляем на страницу входа
            router.push('/auth/signIn');
            
            onClose();
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    };

    const handleAddAccount = () => {
        router.push('/auth/signIn');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.profileHeader}>
                    <div className={styles.avatar}>
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.profileInfo}>
                        <h3>{userName}</h3>
                        <span className={styles.email}>example@email.com</span>
                    </div>
                </div>
                
                <div className={styles.menuItems}>
                    <Link href="/settings/user" className={styles.menuItem}>
                        <img src="/images/settings.svg" alt="Settings" />
                        <span>Настройки</span>
                    </Link>
                    
                    <button className={styles.menuItem}>
                        <img src="/images/inv_friend.svg" alt="Invite" />
                        <span>Пригласить друга</span>
                    </button>
                    
                    <button className={styles.menuItem} onClick={handleAddAccount}>
                        <img src="/images/add_acc.svg" alt="Add account" />
                        <span>Добавить аккаунт</span>
                    </button>
                    
                    <div className={styles.divider}></div>
                    
                    <button className={styles.menuItem} onClick={handleLogout}>
                        <img src="/images/log_out.svg" alt="Logout" />
                        <span>Выйти</span>
                    </button>
                </div>
            </div>
        </div>
    );
} 